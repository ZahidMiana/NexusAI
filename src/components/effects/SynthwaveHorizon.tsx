/**
 * Decorative synthwave sunset that sits in the breathing space below the hero:
 * a striped sun setting behind a scrolling perspective grid, tinted by the theme.
 */
export function SynthwaveHorizon() {
  return (
    <div
      aria-hidden
      className="horizon-band pointer-events-none absolute inset-x-0 top-full -z-10 h-28 overflow-hidden md:h-36"
    >
      <div className="absolute inset-x-0 top-0 bottom-[38%] overflow-hidden">
        <div className="horizon-sun absolute bottom-0 left-1/2 h-40 w-40 -translate-x-1/2 translate-y-1/2 rounded-full md:h-56 md:w-56" />
      </div>
      <div className="horizon-floor absolute -inset-x-1/2 bottom-0 h-[38%]" />
    </div>
  );
}
