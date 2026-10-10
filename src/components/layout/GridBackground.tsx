/** Fixed page backdrop. Each design style restyles these layers in design-styles.css. */
export function GridBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-void">
      <div className="bg-grid-layer absolute inset-0 bg-matrix-grid [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />
      <div data-tint="cyan" className="bg-glow-blob absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-cyber-cyan/[0.07] blur-[120px]" />
      <div data-tint="pink" className="bg-glow-blob absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyber-pink/[0.07] blur-[120px]" />
      <div data-tint="lime" className="bg-glow-blob absolute bottom-0 left-0 h-[24rem] w-[24rem] rounded-full bg-cyber-lime/[0.04] blur-[120px]" />
      <div className="bg-scan-band absolute inset-x-0 top-0 h-40 animate-scan bg-gradient-to-b from-transparent via-cyber-cyan/[0.03] to-transparent" />
    </div>
  );
}
