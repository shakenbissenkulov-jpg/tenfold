/**
 * Tenfold logo "10x Tenfold" — vector, traced from the brand artwork.
 * "10x" is drawn as paths; "Tenfold" is set in Onest Bold and fitted to the artwork's width.
 * Uses currentColor, so it works on light and dark backgrounds.
 */

/** Vertical squash: <1 makes the logo flatter. */
const SQUASH = 0.8;
const H = 196 * SQUASH;

const ONE = <rect x="0" y="5" width="35" height="186" />;
const ZERO = <path fillRule="evenodd" d="M138 0a82 98 0 1 0 0.001 0ZM138 37a45 61 0 1 1 -0.001 0Z" />;
const X = (
  <>
    <path d="M256 64H299L380 183H337Z" />
    <path d="M339 64H380L299 183H256Z" />
  </>
);

/** "10x" mark only (380 × 196). */
export function Mark({ height = 24, className = "" }: { height?: number; className?: string }) {
  return (
    <svg width={Math.round((height * 380) / H)} height={height} viewBox={`0 0 380 ${H}`} fill="currentColor" aria-hidden="true" className={className}>
      <g transform={`scale(1 ${SQUASH})`}>
        {ONE}
        {ZERO}
        {X}
      </g>
    </svg>
  );
}

/** Full lockup "10x Tenfold" (1166 × 196). */
export function Logo({ height = 24, onDark = false }: { height?: number; onDark?: boolean }) {
  return (
    <svg
      role="img"
      aria-label="10x Tenfold"
      width={Math.round((height * 1166) / H)}
      height={height}
      viewBox={`0 0 1166 ${H}`}
      fill="currentColor"
      className={onDark ? "text-white" : "text-ink"}
    >
      <g transform={`scale(1 ${SQUASH})`}>
      {ONE}
      {ZERO}
      {X}
      <text
        x="431"
        y="177"
        fontFamily="Onest, system-ui, sans-serif"
        fontWeight="700"
        fontSize="236"
        textLength="735"
        lengthAdjust="spacingAndGlyphs"
      >
        Tenfold
      </text>
      </g>
    </svg>
  );
}
