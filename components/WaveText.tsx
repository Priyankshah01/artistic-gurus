/**
 * Hover effect used on buttons/links: every letter rolls up and a copy of it
 * rolls in from below. Pair with class "wave-target" on the hoverable parent.
 */
export default function WaveText({ children }: { children: string }) {
  return (
    <span className="wave-text" aria-label={children}>
      {children.split(" ").map((word, w, words) => (
        <span key={w} className="wave-window" aria-hidden>
          {[...word].map((ch, i) => (
            <span key={i} className="wave-glyph" data-char={ch} style={{ transitionDelay: `${(w * 6 + i) * 12}ms` }}>
              {ch}
            </span>
          ))}
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}

/** Icon that slides up and is replaced by a copy of itself on hover. */
export function WaveIcon({ children, size = 20 }: { children: React.ReactNode; size?: number }) {
  return (
    <span className="wave-icon" style={{ "--wave-icon-size": `${size}px` } as React.CSSProperties} aria-hidden>
      <span className="wave-icon-track">
        <span>{children}</span>
        <span>{children}</span>
      </span>
    </span>
  );
}
