import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

export interface StatusDotProps {
  accent?: Accent;
  pulse?: boolean;
  className?: string;
}

export function StatusDot({ accent = "lime", pulse = true, className }: StatusDotProps) {
  const tokens = accentTokens(accent);
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      {pulse && <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-70", tokens.bg)} />}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", tokens.bg)} />
    </span>
  );
}
