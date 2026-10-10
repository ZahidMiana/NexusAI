import type { ElementType } from "react";
import { cn } from "@/lib/cn";

export interface GlitchTextProps {
  text: string;
  as?: ElementType;
  className?: string;
}

/**
 * RGB-split glitch using two clipped, offset copies. Bursts once after load
 * and again on hover/focus, so it draws the eye without constant noise.
 */
export function GlitchText({ text, as: Tag = "span", className }: GlitchTextProps) {
  return (
    <Tag className={cn("glitch-host relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <span aria-hidden className="glitch-layer-a absolute inset-0 text-cyber-cyan mix-blend-screen select-none">
        {text}
      </span>
      <span aria-hidden className="glitch-layer-b absolute inset-0 text-cyber-pink mix-blend-screen select-none">
        {text}
      </span>
    </Tag>
  );
}
