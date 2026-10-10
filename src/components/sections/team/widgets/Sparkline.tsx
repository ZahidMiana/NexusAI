import { useId } from "react";
import { accentTokens } from "@/lib/accent";
import type { Accent } from "@/types";

export interface SparklineProps {
  values: readonly number[];
  min: number;
  max: number;
  accent?: Accent;
  className?: string;
}

export function Sparkline({ values, min, max, accent = "cyan", className }: SparklineProps) {
  const { hex } = accentTokens(accent);
  const gradientId = `spark-${useId().replace(/:/g, "")}`;
  const range = max - min || 1;
  const step = values.length > 1 ? 100 / (values.length - 1) : 100;
  const points = values.map((value, index) => `${(index * step).toFixed(2)},${(30 - ((value - min) / range) * 28 - 1).toFixed(2)}`);

  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: hex, stopOpacity: 0.35 }} />
          <stop offset="100%" style={{ stopColor: hex, stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <polygon points={`0,30 ${points.join(" ")} 100,30`} fill={`url(#${gradientId})`} />
      <polyline points={points.join(" ")} fill="none" strokeWidth="1.2" vectorEffect="non-scaling-stroke" style={{ stroke: hex, filter: `drop-shadow(0 0 3px ${hex})` }} />
    </svg>
  );
}
