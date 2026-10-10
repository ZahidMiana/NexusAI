import type { ElementType } from "react";
import { cn } from "@/lib/cn";

export interface GlitchTextProps {
  text: string;
  as?: ElementType;
  className?: string;
}

/** RGB-split glitch effect using two clipped, offset overlay copies. */
export function GlitchText({ text, as: Tag = "span", className }: GlitchTextProps) {
  return (
    <Tag className={cn("relative inline-block", className)} data-text={text}>
      <span className="relative z-10">{text}</span>
      <span aria-hidden className="absolute inset-0 animate-glitch-a text-cyber-cyan mix-blend-screen select-none">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0 animate-glitch-b text-cyber-pink mix-blend-screen select-none">
        {text}
      </span>
    </Tag>
  );
}
