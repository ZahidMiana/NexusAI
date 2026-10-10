"use client";

import { memo } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/cn";
import type { TerminalLine, TerminalTone } from "@/types";

const TONE_CLASSES: Record<TerminalTone, string> = {
  default: "text-fg-soft",
  muted: "text-fg-muted",
  cyan: "text-cyber-cyan text-glow-cyan",
  pink: "text-cyber-pink text-glow-pink",
  lime: "text-cyber-lime text-glow-lime",
  error: "text-danger",
};

export interface TerminalLineViewProps {
  line: TerminalLine;
  animate: boolean;
  onRevealed: () => void;
}

/** Renders one console line; output lines type themselves in when `animate`. */
export const TerminalLineView = memo(function TerminalLineView({ line, animate, onRevealed }: TerminalLineViewProps) {
  const isInput = line.kind === "input";
  const { output, done } = useTypewriter(line.text, {
    enabled: animate && !isInput,
    speed: 12,
    step: 3,
    onComplete: animate ? onRevealed : undefined,
  });

  if (isInput) {
    return (
      <div className="flex gap-2 pt-2 whitespace-pre-wrap break-words">
        <span className="shrink-0 text-cyber-lime">guest@nexus</span>
        <span className="shrink-0 text-fg-muted">~$</span>
        <span className="text-fg">{line.text}</span>
      </div>
    );
  }

  return (
    <div className={cn("whitespace-pre-wrap break-words", TONE_CLASSES[line.tone])}>
      {output || " "}
      {animate && !done && <span className="ml-0.5 inline-block h-3.5 w-2 animate-blink bg-cyber-cyan align-middle" />}
    </div>
  );
});
