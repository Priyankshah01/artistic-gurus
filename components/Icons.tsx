type P = { size?: number };

const base = (size = 16) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const ArrowUpRight = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const ArrowUp = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
export const Moon = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
  </svg>
);
export const Sun = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
export const Dots = ({ size }: P) => (
  <svg {...base(size)} fill="currentColor" stroke="none">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);
export const Close = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const Copy = ({ size }: P) => (
  <svg {...base(size)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V5a2 2 0 0 1 2-2h8" />
  </svg>
);
export const Check = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M5 12.5 10 17l9-10" />
  </svg>
);

const fill = (size = 16) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true });

export const LinkedIn = ({ size }: P) => (
  <svg {...fill(size)}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z" />
  </svg>
);
export const Behance = ({ size }: P) => (
  <svg {...fill(size)}>
    <path d="M8.2 11.3c.9-.4 1.5-1.2 1.5-2.4C9.7 6.7 8.1 6 6 6H1v12h5.2c2.3 0 4.3-1.1 4.3-3.6 0-1.5-.8-2.7-2.3-3.1ZM3.6 8h2c.8 0 1.5.2 1.5 1.1 0 .9-.6 1.2-1.4 1.2H3.6V8Zm2.2 8H3.6v-3.6h2.3c.9 0 1.7.4 1.7 1.8S6.7 16 5.8 16ZM17.4 9.3c-2.6 0-4.4 2-4.4 4.6 0 2.7 1.7 4.5 4.4 4.5 2 0 3.4-.9 4-2.9h-2.1c-.2.7-1.1 1.1-1.8 1.1-1.3 0-2-.8-2-2.1H21.6c.2-2.7-1.3-5.2-4.2-5.2Zm-1.9 3.7c.1-1.1.8-1.8 1.9-1.8 1.1 0 1.7.7 1.8 1.8h-3.7ZM15 6.8h4.9V8H15V6.8Z" />
  </svg>
);
export const Dribbble = ({ size }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M8.3 3.3c3.6 4.6 5.8 9.8 6.8 17.2M3 10.4c6.2.2 11-.9 15.4-4.3M5.2 18.7c3-4.4 7.6-6.4 15.9-4.4" />
  </svg>
);
export const Doc = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h6" />
  </svg>
);

export const socialIcon = (name: string, size = 16) => {
  switch (name) {
    case "linkedin":
      return <LinkedIn size={size} />;
    case "behance":
      return <Behance size={size} />;
    case "dribbble":
      return <Dribbble size={size} />;
    default:
      return <Doc size={size} />;
  }
};

export const FileText = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2Z" />
    <path d="M14 2v6h6M10 9H8M16 13H8M16 17H8" />
  </svg>
);
export const ChevronDown = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);
export const ArrowRight = ({ size }: P) => (
  <svg {...base(size)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
