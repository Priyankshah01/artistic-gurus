"use client";

import { useEffect } from "react";

/**
 * Section fade-in for the whole page (no dependencies).
 * Every [data-fade] block fades from 0 to 1 opacity over 1.4s the first time it
 * comes into view. Blocks already on screen at load are left alone, and a block
 * shows at once if keyboard focus lands inside it before it has faded in.
 */
export default function ScrollEffects() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fades = Array.from(document.querySelectorAll<HTMLElement>("[data-fade]"));
    const playing = new Map<HTMLElement, Animation>();
    const done = new WeakSet<HTMLElement>();

    const reveal = (el: HTMLElement) => {
      done.add(el);
      io.unobserve(el);
      el.style.removeProperty("opacity");
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (done.has(el)) continue;
          done.add(el);
          io.unobserve(el);
          const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 1400,
            easing: "cubic-bezier(.33,0,.2,1)",
            fill: "both",
          });
          playing.set(el, a);
          a.onfinish = () => {
            playing.delete(el);
            el.style.removeProperty("opacity");
            a.cancel();
          };
        }
      },
      { threshold: 0, rootMargin: "0px 0px 48px 0px" },
    );

    for (const el of fades) {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        done.add(el);
        continue;
      }
      el.style.opacity = "0";
      io.observe(el);
    }

    // keyboard users never wait on a fade
    const onFocus = (e: FocusEvent) => {
      if (!(e.target instanceof Node)) return;
      for (const el of fades) {
        if (!el.contains(e.target)) continue;
        playing.get(el)?.finish();
        if (!done.has(el)) reveal(el);
      }
    };
    document.addEventListener("focusin", onFocus);

    return () => {
      document.removeEventListener("focusin", onFocus);
      io.disconnect();
      playing.forEach((a) => a.cancel());
      fades.forEach((el) => el.style.removeProperty("opacity"));
    };
  }, []);

  return null;
}
