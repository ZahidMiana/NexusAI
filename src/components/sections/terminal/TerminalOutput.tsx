"use client";

import { useEffect, useRef } from "react";
import type { TerminalLine } from "@/types";
import { TerminalLineView } from "./TerminalLineView";

export interface TerminalOutputProps {
  lines: readonly TerminalLine[];
  revealedCount: number;
  onLineRevealed: () => void;
  onActivate: () => void;
}

/**
 * Scrollback viewport. Lines before `revealedCount` render instantly, the
 * line at `revealedCount` types itself in, and later lines wait their turn.
 */
export function TerminalOutput({ lines, revealedCount, onLineRevealed, onActivate }: TerminalOutputProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const visible = lines.slice(0, revealedCount + 1);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  });

  return (
    <div
      ref={viewportRef}
      onClick={onActivate}
      role="log"
      aria-live="polite"
      aria-label="Terminal output"
      className="h-[18rem] overflow-y-auto px-4 py-4 leading-relaxed sm:h-[21rem] sm:px-6"
    >
      {visible.map((line, index) => (
        <TerminalLineView key={line.id} line={line} animate={index === revealedCount} onRevealed={onLineRevealed} />
      ))}
    </div>
  );
}
