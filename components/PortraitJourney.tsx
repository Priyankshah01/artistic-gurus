"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { profile } from "@/lib/data";

/**
 * One photo card that travels from the hero portrait to the About portrait.
 *
 * The card is laid out at the About portrait's final size inside a sticky,
 * full-viewport stage. Scroll progress (0 → 1) runs from the top of the About
 * section until the About portrait reaches its resting spot. At 0 the card is
 * scaled and offset to sit exactly on top of the hero portrait; at 1 it is the
 * About portrait. Along the way it flips 180°: grayscale front, colour back.
 * The real hero/About images are hidden while the card is in flight.
 */
export default function PortraitJourney() {
  const journeyRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const journey = journeyRef.current;
    const card = cardRef.current;
    const section = journey?.closest<HTMLElement>(".about-section");
    const from = section?.querySelector<HTMLElement>(".hero-portrait");
    const to = section?.querySelector<HTMLElement>(".bio-portrait");
    const stage = journey?.querySelector<HTMLElement>(".portrait-sticky-stage");
    if (!journey || !card || !section || !from || !to || !stage) return;

    const motionOk = matchMedia("(prefers-reduced-motion: no-preference)");
    const touchPhone = matchMedia("(max-width: 700px) and (pointer: coarse)");

    let raf = 0;
    let lastTs = 0;
    let shown = 0; // eased progress actually drawn
    let target = 0; // progress from scroll position
    let start = 0; // scrollY where the journey begins
    let distance = 1; // scroll distance of the journey
    let sx = 0.5,
      sy = 0.5; // starting scale (hero size / about size)
    let dx = 0,
      dy = 0; // starting offset
    let r0 = 9,
      r1 = 16; // corner radius start / end
    let disposed = false;

    const clamp = (n: number) => Math.min(1, Math.max(0, n));

    const paint = () => {
      const u = shown;
      const flip = u * u * (3 - 2 * u);
      card.style.transform =
        `perspective(1200px) translate(${dx * (1 - u)}px, ${dy * (1 - u)}px) ` +
        `scale(${sx + (1 - sx) * u}, ${sy + (1 - sy) * u}) rotateY(${180 * flip}deg)`;
      card.style.borderRadius = `${r0 + (r1 - r0) * u}px`;
      card.style.willChange = u > 0 && u < 1 ? "transform" : "auto";
      section.classList.toggle("portrait-motion-active", target > 0 || u > 0);
    };

    // ease the drawn value toward the scroll value (frame-rate independent)
    const tick = (ts: number) => {
      const dt = lastTs ? Math.min(ts - lastTs, 64) : 16.67;
      lastTs = ts;
      shown += (target - shown) * (1 - Math.exp(-dt / (touchPhone.matches ? 100 : 65)));
      const settled = Math.abs(target - shown) < 1e-4;
      if (settled) shown = target;
      paint();
      raf = settled ? 0 : requestAnimationFrame(tick);
      if (settled) lastTs = 0;
    };

    const onScroll = () => {
      if (!motionOk.matches) return;
      target = clamp((window.scrollY - start) / distance);
      section.classList.toggle("portrait-motion-active", target > 0 || shown > 0);
      if (!raf && target !== shown) raf = requestAnimationFrame(tick);
    };

    const measure = () => {
      if (disposed) return;
      cancelAnimationFrame(raf);
      raf = 0;
      lastTs = 0;
      if (!motionOk.matches) {
        section.classList.remove("portrait-motion-ready", "portrait-motion-active");
        return;
      }
      section.classList.add("portrait-motion-ready");
      const s = section.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const viewH = touchPhone.matches ? stage.getBoundingClientRect().height : document.documentElement.clientHeight;
      const restTop = viewH - 20 - b.height; // where the card rests inside the sticky stage
      start = s.top + window.scrollY;
      distance = b.top + window.scrollY - start - restTop;
      if (distance <= 0 || !b.width) {
        section.classList.remove("portrait-motion-ready", "portrait-motion-active");
        return;
      }
      sx = a.width / b.width;
      sy = a.height / b.height;
      dy = a.top + window.scrollY - start - restTop - (b.height - a.height) / 2;
      dx = a.left + a.width / 2 - (b.left + b.width / 2);
      r0 = parseFloat(getComputedStyle(from).borderTopLeftRadius) / Math.min(sx, sy);
      r1 = parseFloat(getComputedStyle(to).borderTopLeftRadius);
      journey.style.height = `${distance + viewH}px`;
      card.style.width = `${b.width}px`;
      card.style.height = `${b.height}px`;
      card.style.left = `${b.left - s.left}px`;
      card.style.top = `${restTop}px`;
      shown = target = clamp((window.scrollY - start) / distance);
      paint();
    };

    const ro = new ResizeObserver(measure);
    ro.observe(from);
    ro.observe(to);
    let lastW = window.innerWidth;
    const onResize = () => {
      // ignore mobile URL-bar height jitter
      if (touchPhone.matches && window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      measure();
    };
    // the hero portrait has an intro animation; measure again once it settles
    from.addEventListener("animationend", measure);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pageshow", measure);
    motionOk.addEventListener("change", measure);
    measure();
    document.fonts?.ready.then(measure);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      from.removeEventListener("animationend", measure);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", measure);
      motionOk.removeEventListener("change", measure);
      section.classList.remove("portrait-motion-ready", "portrait-motion-active");
    };
  }, []);

  return (
    <div ref={journeyRef} className="portrait-journey" aria-hidden>
      <div className="portrait-sticky-stage">
        <div ref={cardRef} className="portrait-card">
          <div className="portrait-face portrait-face-front">
            <Image src={profile.photo} alt="" fill sizes="(max-width: 700px) 100vw, 440px" priority />
          </div>
          <div className="portrait-face portrait-face-back">
            <Image src={profile.photo} alt="" fill sizes="(max-width: 700px) 100vw, 440px" priority />
          </div>
        </div>
      </div>
    </div>
  );
}
