/**
 * Tenfold logo "10x Tenfold", set as live text in the site font (Onest).
 * `height` is the cap height-ish size in px; uses currentColor-style classes for light/dark.
 */
export function Logo({ height = 24, onDark = false }: { height?: number; onDark?: boolean }) {
  return (
    <span
      role="img"
      aria-label="10x Tenfold"
      className={`inline-flex items-baseline whitespace-nowrap font-sans font-semibold leading-none tracking-[-0.03em] ${onDark ? "text-white" : "text-ink"}`}
      style={{ fontSize: Math.round(height * 1.15) }}
    >
      <span aria-hidden="true">10x</span>
      <span aria-hidden="true" className="ml-[0.28em]">Tenfold</span>
    </span>
  );
}
