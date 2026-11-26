"use client";

import { useEffect, useRef } from "react";

/**
 * Full-bleed code background for the hero.
 *
 * The code is rasterised once into a texture (tiled in ~370px columns that
 * fill the whole area). A fragment shader then decides how much "ink" each
 * character cell gets:
 *   - a near-invisible resting level
 *   - four soft idle islands that breathe slowly
 *   - a drifting noise haze
 *   - a glow around the cursor, plus a short fading trail as it moves
 *   - an expanding ripple ring on click
 * Falls back to a faint static <pre> when WebGL is unavailable.
 */

const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform sampler2D uAtlas;
uniform vec2 uSize;      // canvas size in device px
uniform vec2 uCell;      // character cell in device px
uniform float uDpr;
uniform float uTime;
uniform vec3 uPointer;   // css px x, y, active
uniform float uActivity; // 0..1, how much the pointer has been moving
uniform vec3 uInk;
uniform vec4 uTrail[8];  // x, y, radius, strength
uniform vec4 uRipple[6]; // x, y, radius, strength

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uSize.y - gl_FragCoord.y);
  // Evaluate light per character cell so glyphs switch on as whole letters.
  vec2 cell = (floor(px / uCell) + 0.5) * uCell / uDpr;
  vec2 view = uSize / uDpr;

  // cursor glow (wide, short ellipse like a text-line highlight)
  float d = length((cell - uPointer.xy) / vec2(88.0, 50.0));
  float glow = uPointer.z * (1.0 - smoothstep(0.1, 1.0, d));
  for (int i = 0; i < 8; i++) {
    vec4 t = uTrail[i];
    if (t.w <= 0.0) continue;
    vec2 v = cell - t.xy;
    glow += t.w * exp(-dot(v, v) / (2.0 * t.z * t.z));
  }
  glow = min(glow, 1.0);

  // click ripples
  float ring = 0.0;
  for (int i = 0; i < 6; i++) {
    vec4 r = uRipple[i];
    if (r.w <= 0.0) continue;
    vec2 v = cell - r.xy;
    float a = atan(v.y, v.x);
    float wobble = 1.0 + 0.06 * sin(3.0 * a + uTime) + 0.04 * sin(5.0 * a - uTime * 1.4);
    float k = length(v) - r.z * wobble;
    k = k > 0.0 ? k / 16.0 : k / 46.0;
    ring = max(ring, exp(-k * k) * r.w);
  }

  // drifting haze
  vec2 q = mat2(0.82, 0.57, -0.57, 0.82) * (cell - vec2(-8.0, 4.0) * uTime);
  float cloud = noise(q / vec2(140.0, 80.0) + vec2(uTime * 0.04, 0.0)) * 0.62
              + noise(q / vec2(62.0, 36.0) + vec2(3.7, uTime * 0.06)) * 0.38;
  cloud *= 0.82 + 0.24 * noise(q / vec2(30.0, 14.0) + vec2(uTime * 0.2, 7.3));
  float haze = pow(smoothstep(0.47 - 0.2 * uActivity, 0.84, cloud), 2.6);

  // quiet idle islands
  vec2 ps = vec2(min(110.0, view.x * 0.23), 38.0);
  vec2 a1 = (cell - view * vec2(0.16, 0.22)) / ps;
  vec2 a2 = (cell - view * vec2(0.83, 0.36)) / ps;
  vec2 a3 = (cell - view * vec2(0.22, 0.77)) / ps;
  vec2 a4 = (cell - view * vec2(0.84, 0.82)) / ps;
  float b = 0.8 + 0.15 * sin(uTime * 0.18);
  float idle = max(max(exp(-dot(a1, a1)) * b, exp(-dot(a2, a2)) * (0.8 + 0.15 * sin(uTime * 0.18 + 1.6))),
                   max(exp(-dot(a3, a3)) * (0.8 + 0.15 * sin(uTime * 0.18 + 3.2)), exp(-dot(a4, a4)) * (0.8 + 0.15 * sin(uTime * 0.18 + 4.8))));

  float ink = texture2D(uAtlas, px / uSize).a;
  float level = 0.025 + 0.075 * idle + 0.08 * haze * (1.0 + 0.3 * uActivity) + 0.4 * glow * (0.9 + 0.1 * haze) + 0.12 * ring;
  float alpha = ink * clamp(level, 0.0, 1.0);
  gl_FragColor = vec4(uInk * alpha, alpha);
}
`;

type Pt = { x: number; y: number; at: number };

export default function GlyphBackground({ code, fontSize = 12 }: { code: string; fontSize?: number }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const U = Object.fromEntries(
      ["uAtlas", "uSize", "uCell", "uDpr", "uTime", "uPointer", "uActivity", "uInk", "uTrail", "uRipple"].map((n) => [
        n,
        gl.getUniformLocation(prog, n),
      ]),
    );
    gl.uniform1i(U.uAtlas, 0);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const atlas = document.createElement("canvas");
    const actx = atlas.getContext("2d")!;
    const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;

    let w = 0,
      h = 0,
      dpr = 1,
      time = 0,
      last = 0,
      raf = 0,
      visible = false,
      disposed = false;
    let pointer: { x: number; y: number } | null = null;
    let client: { x: number; y: number } | null = null;
    let trail: Pt[] = [];
    let ripples: Pt[] = [];
    const trailBuf = new Float32Array(32);
    const rippleBuf = new Float32Array(24);

    const setInk = () => {
      probe.fillStyle = getComputedStyle(host).color;
      probe.fillRect(0, 0, 1, 1);
      const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
      gl.uniform3f(U.uInk, r / 255, g / 255, b / 255);
    };

    const draw = () => {
      if (disposed || !w || !h) return;
      trail = trail.filter((t) => time - t.at < 0.45);
      trailBuf.fill(0);
      trail.forEach((t, i) => {
        const k = (time - t.at) / 0.45;
        trailBuf.set([t.x, t.y, 28, 0.18 * (1 - k) ** 2], i * 4);
      });
      ripples = ripples.filter((r) => time - r.at < 4);
      rippleBuf.fill(0);
      ripples.forEach((r, i) => {
        const age = time - r.at;
        const strength = Math.min(1, age / 0.08) * Math.exp(-age / 1.3) * Math.min(1, (4 - age) / 0.5);
        rippleBuf.set([r.x, r.y, (420 * age) / (1 + 0.4 * age), strength], i * 4);
      });
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(U.uSize, canvas.width, canvas.height);
      gl.uniform2f(U.uCell, 8 * dpr, 18 * dpr);
      gl.uniform1f(U.uDpr, dpr);
      gl.uniform1f(U.uTime, time);
      gl.uniform3f(U.uPointer, pointer?.x ?? -1e3, pointer?.y ?? -1e3, pointer ? 1 : 0);
      gl.uniform1f(U.uActivity, trail.length / 8);
      gl.uniform4fv(U.uTrail, trailBuf);
      gl.uniform4fv(U.uRipple, rippleBuf);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Lay the code out in columns and repeat it until the whole area is filled.
    const layout = () => {
      if (disposed) return;
      const r = host.getBoundingClientRect();
      w = r.width;
      h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(1.5e6 / Math.max(1, w * h)));
      canvas.width = atlas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = atlas.height = Math.max(1, Math.round(h * dpr));
      actx.setTransform(dpr, 0, 0, dpr, 0, 0);
      actx.clearRect(0, 0, w, h);
      actx.fillStyle = "#fff";
      actx.font = `400 ${fontSize}px ${getComputedStyle(host).fontFamily}`;
      actx.textBaseline = "top";

      const lineH = fontSize * 1.7;
      const rows = Math.ceil(h / lineH);
      const cols = Math.max(1, Math.floor(w / 370));
      const colW = w / cols;
      const maxW = Math.max(1, colW - 40);
      const measure = (s: string) => actx.measureText(s).width;
      // soft-wrap long lines so every column stays inside its lane
      const lines = code.split("\n").flatMap((line) => {
        const out: string[] = [];
        let rest = line;
        let cont = false;
        while (rest && measure((cont ? "  " : "") + rest) > maxW) {
          const pad = cont ? "  " : "";
          let cut = rest.length;
          while (cut > 1 && measure(pad + rest.slice(0, cut)) > maxW) cut--;
          const space = rest.lastIndexOf(" ", cut);
          if (space > cut / 2) cut = space;
          out.push(pad + rest.slice(0, cut));
          rest = rest.slice(cut).trimStart();
          cont = true;
        }
        out.push((cont && rest ? "  " : "") + rest);
        return out;
      });
      const top = w <= 700 ? 112 : 12;
      for (let c = 0; c < cols; c++) {
        actx.save();
        actx.beginPath();
        actx.rect(c * colW + 20, 0, colW - 40, h);
        actx.clip();
        for (let row = 0; row < rows; row++) {
          actx.fillText(lines[(row + c * rows) % lines.length], c * colW + 20, top + row * lineH);
        }
        actx.restore();
      }
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
      setInk();
      draw();
      host.dataset.renderer = "webgl";
    };

    const frame = (now: number) => {
      // ~30fps is plenty for a slow background and saves battery
      if (now - last >= 1000 / 30) {
        time += last ? Math.min((now - last) / 1000, 0.064) : 0;
        last = now;
        draw();
      }
      raf = requestAnimationFrame(frame);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      const run = visible && !document.hidden && !reduce.matches;
      if (run) raf = requestAnimationFrame(frame);
      else {
        trail = [];
        ripples = [];
        if (visible && !document.hidden) draw();
      }
    };

    const local = (e: { clientX: number; clientY: number }) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top, at: time };
    };
    const inside = (p: { x: number; y: number }) => p.x >= 0 && p.x <= w && p.y >= 0 && p.y <= h;
    const syncPointer = () => {
      if (!client) {
        pointer = null;
        return;
      }
      const p = local({ clientX: client.x, clientY: client.y });
      pointer = inside(p) ? p : null;
      if (reduce.matches) draw();
    };
    const onMove = (e: PointerEvent) => {
      if (!visible) return;
      client = e.pointerType === "touch" ? null : { x: e.clientX, y: e.clientY };
      syncPointer();
      if (reduce.matches) return;
      const p = local(e);
      const prev = trail[trail.length - 1];
      if (!inside(p) || (prev && Math.hypot(p.x - prev.x, p.y - prev.y) < 14)) return;
      trail = [...trail.slice(-7), p];
    };
    const onDown = (e: PointerEvent) => {
      if (!visible || reduce.matches) return;
      const p = local(e);
      if (inside(p)) ripples = [...ripples.slice(-5), p];
    };
    const onLeave = () => {
      client = null;
      pointer = null;
      if (reduce.matches) draw();
    };

    const ro = new ResizeObserver(layout);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    io.observe(host);
    const mo = new MutationObserver(() => {
      setInk();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    window.addEventListener("pointermove", onMove, { passive: true, capture: true });
    window.addEventListener("pointerdown", onDown, { passive: true, capture: true });
    window.addEventListener("scroll", syncPointer, { passive: true });
    window.addEventListener("blur", onLeave);
    document.documentElement.addEventListener("pointerleave", onLeave);
    reduce.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    layout();
    document.fonts?.ready.then(() => !disposed && layout());

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove, true);
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("scroll", syncPointer);
      window.removeEventListener("blur", onLeave);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      reduce.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [code, fontSize]);

  return (
    <div ref={hostRef} className="glyph-background" aria-hidden>
      <pre className="glyph-fallback">{code}</pre>
      <canvas ref={canvasRef} />
    </div>
  );
}
