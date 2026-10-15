import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`m-0 font-mono text-[13px] uppercase tracking-[0.06em] ${onDark ? "text-accent" : "text-muted"}`}>
      {children}
    </p>
  );
}

export function H2({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <h2
      id={id}
      className={`mt-4 font-display text-[clamp(28px,3.4vw,46px)] font-medium leading-[1.12] tracking-[-0.03em] ${className}`}
    >
      {children}
    </h2>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 group-hover:translate-x-[3px] ${className}`}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg font-display text-[13px] font-semibold ${onDark ? "bg-white text-ink" : "bg-ink text-accent"}`}
      >
        10×
      </span>
      <span className={`font-display text-[19px] font-medium tracking-[-0.02em] ${onDark ? "text-white" : ""}`}>Tenfold</span>
    </span>
  );
}
