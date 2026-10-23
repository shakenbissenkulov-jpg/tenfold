/**
 * Tenfold logo: "10x" mark (vector, traced from the brand artwork) + "Tenfold" wordmark.
 * The mark uses currentColor, so it works on light and dark backgrounds.
 */
export function Mark({ height = 24, className = "" }: { height?: number; className?: string }) {
  const width = Math.round((height * 368) / 171);
  return (
    <svg width={width} height={height} viewBox="0 0 368 171" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M0 28L56 0H62V171H30V34L0 62Z" />
      <path fillRule="evenodd" d="M142 -1a75 86 0 1 0 0.001 0ZM142 39a37 46 0 1 1 -0.001 0Z" />
      <path d="M224 35H274L368 171H318Z" />
      <path d="M315 35H365L264 171H219Z" />
    </svg>
  );
}

export function Logo({ height = 24, onDark = false }: { height?: number; onDark?: boolean }) {
  return (
    <span className={`inline-flex items-center ${onDark ? "text-white" : "text-ink"}`} style={{ gap: Math.round(height * 0.3) }}>
      <Mark height={height} />
      <span className="font-semibold leading-none tracking-[-0.01em]" style={{ fontSize: Math.round(height * 0.83) }}>
        Tenfold
      </span>
    </span>
  );
}
