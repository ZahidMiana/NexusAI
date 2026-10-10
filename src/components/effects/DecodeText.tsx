"use client";

import { useMemo, useRef } from "react";
import { useFrameAnimation } from "@/hooks/useFrameAnimation";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useMotionAllowed } from "@/hooks/usePreferences";

const GLYPHS = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";

/** Deterministic pseudo-random glyph so renders stay pure. */
function glyph(index: number, frame: number): string {
  return GLYPHS[(index * 7 + frame * 13) % GLYPHS.length];
}

/**
 * Text that decodes from cipher noise the first time it scrolls into view.
 * Screen readers always get the real text; the effect is visual only.
 */
export function DecodeText({ text, durationMs = 750 }: { text: string; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInViewOnce(ref);
  const motionAllowed = useMotionAllowed();
  const progress = useFrameAnimation(seen, durationMs, motionAllowed);

  const display = useMemo(() => {
    if (progress === null || progress >= 1) return text;
    const revealed = Math.floor(progress * text.length);
    const frame = Math.floor(progress * 40);
    return text
      .split("")
      .map((char, index) => (char === " " || index < revealed ? char : glyph(index, frame)))
      .join("");
  }, [progress, text]);

  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}
