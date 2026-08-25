/** The "Enhanced Coverage" flag, shared by every review layout. */
export function CoverageBadge({ label }: { label: string }) {
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-btis-navy"
      style={{ backgroundColor: "rgb(249, 228, 123)" }}
    >
      {label}
    </span>
  );
}
