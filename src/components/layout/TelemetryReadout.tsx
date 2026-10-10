"use client";

import { StatusDot } from "@/components/ui/StatusDot";
import { siteConfig } from "@/config/site";
import { useLiveMetric } from "@/hooks/useLiveMetric";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";

export interface TelemetryReadoutProps {
  layout?: "row" | "stack";
  /** Show only the first reading between xl and 2xl, where the navbar also shows links. */
  condensed?: boolean;
  className?: string;
}

/** Live system status shown in the navbar and in the mobile menu. */
export function TelemetryReadout({ layout = "row", condensed = false, className }: TelemetryReadoutProps) {
  const coreTemp = useLiveMetric({ initial: 41.6, amplitude: 0.6, min: 38, max: 46, intervalMs: 1500 });

  return (
    <div
      className={cn(
        "font-tech text-xs tracking-[0.12em] uppercase",
        layout === "row" ? "flex items-center gap-5" : "grid gap-2",
        className,
      )}
    >
      {siteConfig.navTelemetry.map((item, index) => {
        const tokens = accentTokens(item.accent);
        return (
          <div key={item.label} className={cn("flex items-center gap-2", condensed && index > 0 && "xl:hidden 2xl:flex")}>
            <StatusDot accent={item.accent} />
            <span className="text-fg-muted">{item.label}:</span>
            <span className={cn(tokens.text)}>{item.value}</span>
            {item.label === "CORE_TEMP" && <span className="text-fg-muted tabular-nums">{coreTemp.toFixed(1)}°C</span>}
          </div>
        );
      })}
    </div>
  );
}
