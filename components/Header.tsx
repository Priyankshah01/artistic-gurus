"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { navLinks, profile, socials } from "@/lib/data";
import { Close, Dots, Moon, Sun, socialIcon } from "./Icons";
import { WaveIcon } from "./WaveText";

/* ------------------------------------------------------------------ theme */
function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = () => document.documentElement.dataset.theme ?? "light";
const getServerTheme = () => "light";

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Text split into letters so each one can fall away when the menu closes. */
function NavText({ children }: { children: string }) {
  return (
    <span className="nav-menu-text">
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {[...children].map((ch, i) => (
          <span key={i} className="nav-menu-piece">
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ------------------------------------------------------- wordmark spinner */
/* Every few seconds (and on hover) the name spins: a quick constant-speed
   start, then it coasts to a stop on a whole turn so it always lands upright. */
function useWordmarkSpin(textRef: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const text = textRef.current;
    const link = text?.closest("a");
    if (!text || !link) return;

    type Spin = { from: number; target: number; started: number; speed: number; fastFor: number; coastFor: number };
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let spin: Spin | null = null;
    let raf = 0;
    let timer = 0;
    let hovering = false;

    const sample = (now: number) => {
      if (!spin) return { angle: 0, speed: 0, done: true };
      const t = Math.max(0, now - spin.started);
      if (t < spin.fastFor) return { angle: spin.from + spin.speed * t, speed: spin.speed, done: false };
      const r = Math.min(1, (t - spin.fastFor) / spin.coastFor);
      const coast = (spin.speed * spin.coastFor) / 2;
      return {
        angle: spin.from + spin.speed * spin.fastFor + coast * (2 * r - r * r),
        speed: spin.speed * (1 - r),
        done: r === 1,
      };
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      spin = null;
      text.style.removeProperty("transform");
      text.style.removeProperty("will-change");
      text.dataset.spinning = "false";
    };
    const frame = (now: number) => {
      const s = sample(now);
      if (s.done) return stop();
      text.style.transform = `rotate(${s.angle}deg)`;
      raf = requestAnimationFrame(frame);
    };
    const run = (next: Spin) => {
      cancelAnimationFrame(raf);
      spin = next;
      text.style.willChange = "transform";
      text.dataset.spinning = "true";
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (motion.matches || document.hidden) return;
      const now = performance.now();
      const { angle } = sample(now);
      let rest = 360 - (((angle % 360) + 360) % 360);
      if (rest < 180) rest += 360;
      const speed = 1.05; // degrees per ms
      const fastFor = 120;
      run({ from: angle, target: angle + rest, started: now, speed, fastFor, coastFor: (2 * (rest - speed * fastFor)) / speed });
    };
    const settle = () => {
      if (!spin) return;
      const now = performance.now();
      const s = sample(now);
      if (s.done || s.speed <= 0) return stop();
      run({ from: s.angle, target: spin.target, started: now, speed: s.speed, fastFor: 0, coastFor: (2 * (spin.target - s.angle)) / s.speed });
    };
    const schedule = () => {
      clearInterval(timer);
      if (motion.matches || document.hidden) {
        hovering = false;
        return stop();
      }
      if (!hovering && document.activeElement !== link) {
        timer = window.setInterval(() => {
          if (!spin && !hovering) start();
        }, 3000);
      }
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch" || hovering) return;
      hovering = true;
      clearInterval(timer);
      start();
    };
    const onLeave = () => {
      hovering = false;
      settle();
      schedule();
    };
    const onFocus = () => {
      clearInterval(timer);
      if (!hovering && link.matches(":focus-visible")) start();
    };
    const onBlur = () => {
      if (!hovering) settle();
      schedule();
    };

    link.addEventListener("pointerenter", onEnter);
    link.addEventListener("pointerleave", onLeave);
    link.addEventListener("focus", onFocus);
    link.addEventListener("blur", onBlur);
    motion.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    schedule();
    return () => {
      clearInterval(timer);
      stop();
      link.removeEventListener("pointerenter", onEnter);
      link.removeEventListener("pointerleave", onLeave);
      link.removeEventListener("focus", onFocus);
      link.removeEventListener("blur", onBlur);
      motion.removeEventListener("change", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [textRef]);
}

/* ------------------------------------------------------------------ header */
export default function Header() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const phase = useRef<"closed" | "open" | "closing">("closed");
  const anims = useRef<Animation[]>([]);

  useWordmarkSpin(wordRef);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  // lock page scroll while the menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const cancelAnims = () => {
    anims.current.forEach((a) => a.cancel());
    anims.current = [];
  };
  useEffect(() => cancelAnims, []);

  const openMenu = () => {
    const d = dialogRef.current;
    if (!d || phase.current !== "closed") return;
    cancelAnims();
    phase.current = "open";
    d.dataset.motion = "open";
    d.showModal();
    setOpen(true);
    d.querySelector(".nav-panel")?.scrollTo(0, 0);
  };

  /* Letters fall out of the panel, then the panel shrinks back into the menu button. */
  const closeMenu = (after?: () => void) => {
    const d = dialogRef.current;
    if (!d?.open || phase.current === "closing") return;
    cancelAnims();
    phase.current = "closing";
    d.dataset.motion = "closing";
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      d.close();
      // unlock scrolling now, before any navigation scrolls the page
      document.body.style.overflow = "";
      after?.();
    };
    if (reducedMotion()) return finish();

    const pieces = [...d.querySelectorAll<HTMLElement>(".nav-menu-piece")];
    const box = d.getBoundingClientRect();
    const btn = triggerRef.current?.getBoundingClientRect();
    const n = pieces.length;
    // shuffled start offsets spread across 180ms
    const order = pieces.map((_, i) => i).sort(() => Math.random() - 0.5);
    const fallDelay = (i: number) => 220 + (order[i] / Math.max(1, n - 1)) * 180;

    const list: Animation[] = [];
    pieces.forEach((p, i) => {
      const drop = box.bottom - p.getBoundingClientRect().top + 80;
      const x = ((29 * i) % 83) - 41;
      const rot = ((37 * i) % 97) - 48;
      list.push(
        p.animate([{ transform: "none" }, { transform: `translate(${x}px, ${drop}px) rotate(${rot}deg)` }], {
          duration: 700,
          delay: fallDelay(i),
          easing: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
          fill: "forwards",
        }),
        p.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 160,
          delay: 760 + (i / Math.max(1, n - 1)) * 180,
          easing: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
          fill: "forwards",
        }),
      );
    });

    const sx = btn ? btn.width / box.width : 0.06;
    const sy = btn ? btn.height / box.height : 0.04;
    const tx = btn ? btn.right - box.right : 0;
    const ty = btn ? btn.top - box.top : -16;
    const shrink = d.animate(
      [
        { transform: "none", opacity: 1, "--nav-backdrop-opacity": 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`, opacity: 0, "--nav-backdrop-opacity": 0 },
      ],
      { duration: 460, delay: 1220, easing: "cubic-bezier(0.645, 0.045, 0.355, 1)", fill: "forwards" },
    );
    list.push(shrink);
    anims.current = list;
    shrink.onfinish = finish;
    // safety net: if frames stall (hidden or throttled page), still close
    window.setTimeout(finish, 2400);
  };

  const onClosed = () => {
    cancelAnims();
    phase.current = "closed";
    delete dialogRef.current?.dataset.motion;
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  // keep Tab inside the panel
  const trapFocus = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab") return;
    const items = e.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const d = e.currentTarget;
    const r = d.getBoundingClientRect();
    // click on the backdrop
    if (e.target === d && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) {
      closeMenu();
      return;
    }
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
    if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.protocol === "mailto:") return;
    e.preventDefault();
    closeMenu(() => {
      const url = new URL(a.href);
      const target = url.pathname === location.pathname && url.hash ? document.querySelector(url.hash) : null;
      if (target) {
        history.pushState(null, "", url.hash);
        target.scrollIntoView({ behavior: reducedMotion() ? "instant" : "smooth" });
      } else {
        location.assign(a.href);
      }
    });
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#about" aria-label={`${profile.name}, home`}>
            <span ref={wordRef} className="wordmark-text" data-spinning="false">
              {profile.shortName}
            </span>
          </a>
          <div className="header-actions">
            <button
              type="button"
              className="wave-target icon-button theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              aria-pressed={theme === "dark"}
            >
              <WaveIcon>{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}</WaveIcon>
            </button>
            <button
              ref={triggerRef}
              type="button"
              className="icon-button nav-menu-trigger wave-target"
              onClick={openMenu}
              aria-label="Navigation menu"
              aria-expanded={open}
              aria-controls="navigation-panel"
              aria-haspopup="dialog"
            >
              <WaveIcon size={24}>
                <Dots size={24} />
              </WaveIcon>
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="navigation-panel"
        className="nav-dialog"
        aria-label="Navigation menu"
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
        onClose={onClosed}
        onKeyDown={trapFocus}
        onClick={onDialogClick}
      >
        <div className="nav-panel">
          <div className="nav-panel-top">
            <button type="button" className="nav-panel-close" onClick={() => closeMenu()} aria-label="Close navigation menu">
              <NavText>close</NavText>
              <span className="nav-close-circle nav-menu-piece">
                <Close size={23} />
              </span>
            </button>
          </div>

          <nav className="nav-panel-links" aria-label="Site navigation">
            <div className="nav-menu-primary">
              {navLinks.primary.map((l) => (
                <a key={l.href} href={l.href}>
                  <NavText>{l.label}</NavText>
                </a>
              ))}
            </div>
            <div className="nav-menu-secondary">
              {navLinks.secondary.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  {...(l.href.endsWith(".pdf") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <NavText>{l.label}</NavText>
                </a>
              ))}
            </div>
          </nav>

          <div className="nav-panel-footer">
            <a className="nav-panel-email" href={`mailto:${profile.email}`}>
              <NavText>{profile.email}</NavText>
            </a>
            <div className="nav-panel-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <span className="platform-logo">{socialIcon(s.icon, 20)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
