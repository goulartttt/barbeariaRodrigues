const base = (size) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  focusable: false,
});

export function ArrowUpRight({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className} fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M7 17 17 7M8.5 7H17v8.5" strokeLinecap="square" />
    </svg>
  );
}

export function Phone({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className} fill="none" stroke="currentColor" strokeWidth="1.75">
      <path
        d="M5.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3.5 5.5a2 2 0 0 1 2-2Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className} fill="currentColor">
      <path d="m12 2.8 2.85 5.78 6.38.93-4.62 4.5 1.09 6.35L12 17.36l-5.7 3 1.09-6.35-4.62-4.5 6.38-.93L12 2.8Z" />
    </svg>
  );
}

/** Cinco estrelas decorativas; a nota em si é sempre dita em texto. */
export function Stars({ size, className }) {
  return (
    <span className={className} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} />
      ))}
    </span>
  );
}
