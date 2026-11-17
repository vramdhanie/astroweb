const GRID_FINE = 'color-mix(in srgb, var(--foreground) 5%, transparent)';
const GRID_BOLD = 'color-mix(in srgb, var(--foreground) 9%, transparent)';

/** Site-wide graph-paper backdrop: fixed behind all content, absent at the
 * top of the viewport (keeps the header clean), fading to a whisper-faint
 * maximum further down. Fine 24px cells with a bolder line every fifth. */
export default function GraphPaper() {
  const mask =
    'linear-gradient(to bottom, transparent 0, rgb(0 0 0 / 0.35) 220px, rgb(0 0 0 / 0.8) 100%)';
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage:
          `linear-gradient(to right, ${GRID_FINE} 1px, transparent 1px), ` +
          `linear-gradient(to bottom, ${GRID_FINE} 1px, transparent 1px), ` +
          `linear-gradient(to right, ${GRID_BOLD} 1px, transparent 1px), ` +
          `linear-gradient(to bottom, ${GRID_BOLD} 1px, transparent 1px)`,
        backgroundSize: '24px 24px, 24px 24px, 120px 120px, 120px 120px',
        maskImage: mask,
        WebkitMaskImage: mask,
      }}
    />
  );
}
