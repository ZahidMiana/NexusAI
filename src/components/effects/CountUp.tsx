"use client";

import { useRef } from "react";
import { useFrameAnimation } from "@/hooks/useFrameAnimation";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useMotionAllowed } from "@/hooks/usePreferences";

interface Countable {
  prefix: string;
  value: number;
  decimals: number;
  suffix: string;
}

/** Splits values like "$12k", "-72%", "3.4x" or "99.99%" into countable parts. */
export function parseCountable(raw: string): Countable | null {
  const match = raw.match(/^(.*?)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  return { prefix, value: Number(number), decimals: number.split(".")[1]?.length ?? 0, suffix };
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Counts a metric up from zero the first time it is seen. */
export function CountUp({ value, durationMs = 1200 }: { value: string; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInViewOnce(ref);
  const motionAllowed = useMotionAllowed();
  const progress = useFrameAnimation(seen, durationMs, motionAllowed);
  const parsed = parseCountable(value);

  let display = value;
  if (parsed && progress !== null && progress < 1) {
    display = `${parsed.prefix}${(parsed.value * easeOutCubic(progress)).toFixed(parsed.decimals)}${parsed.suffix}`;
  }

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{value}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}
