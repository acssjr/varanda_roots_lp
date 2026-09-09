export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand--compact" : ""}`} aria-label="Varanda Roots">
      <span className="brand__official-icon" aria-hidden="true" />
      <span className="brand__official-name" aria-hidden="true" />
    </span>
  );
}
