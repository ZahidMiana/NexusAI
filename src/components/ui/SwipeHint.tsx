import { ArrowRight } from "lucide-react";

/** Small "swipe" cue shown only where a row scrolls sideways (phones). */
export function SwipeHint({ count }: { count: number }) {
  return (
    <p className="mb-3 flex items-center gap-1.5 font-tech text-xs tracking-[0.12em] text-fg-muted uppercase md:hidden" aria-hidden>
      Swipe to see all {count} <ArrowRight className="h-3.5 w-3.5" />
    </p>
  );
}
