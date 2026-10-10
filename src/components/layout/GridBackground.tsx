/** Fixed page backdrop: cream paper with a fine black grid (see design-styles.css). */
export function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-void">
      <div className="bg-grid-layer absolute inset-0" />
    </div>
  );
}
