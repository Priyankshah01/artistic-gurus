"use client";

import { useEffect, useState } from "react";

/** Types `text` once, then leaves a blinking caret. */
export default function Typed({ text, delay = 900, speed = 45 }: { text: string; delay?: number; speed?: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => setN(text.length), 0);
      return () => clearTimeout(t);
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setN(i);
      if (i < text.length) timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed]);

  return (
    <span aria-label={text}>
      <span aria-hidden>{text.slice(0, n)}</span>
      <span className="caret" aria-hidden />
    </span>
  );
}
