import { StatusDot } from "@/components/ui/StatusDot";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

/** Plain-language availability indicator used in the navbar and palette. */
export function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-tech text-xs tracking-[0.12em] text-fg-soft uppercase", className)}>
      <StatusDot accent="lime" />
      {siteConfig.availability}
    </span>
  );
}
