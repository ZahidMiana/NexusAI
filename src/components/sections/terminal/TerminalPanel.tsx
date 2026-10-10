"use client";

import { SquareTerminal } from "lucide-react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { StatusDot } from "@/components/ui/StatusDot";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { TERMINAL_SECTION_ID, useTerminal } from "@/context/TerminalContext";
import { QUICK_COMMANDS } from "@/lib/terminal";
import { CommandChips } from "./CommandChips";
import { TerminalInput } from "./TerminalInput";
import { TerminalOutput } from "./TerminalOutput";

/** The site's single interactive terminal. `id` lets the navbar and palette jump to it. */
export function TerminalPanel({ className }: { className?: string }) {
  const { lines, revealedCount, busy, input, setInput, run, markLineRevealed, handleKeyDown, inputRef } = useTerminal();
  const focusInput = () => inputRef.current?.focus({ preventScroll: true });

  return (
    <BentoCard id={TERMINAL_SECTION_ID} accent="cyan" scaleOnHover={false} className={`scroll-mt-28 p-4 sm:p-6 ${className ?? ""}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <BentoLabel index="06.B">Terminal</BentoLabel>
        <span className="flex items-center gap-2 font-tech text-xs tracking-[0.14em] text-cyber-lime uppercase">
          <StatusDot accent="lime" /> Type /help to start
        </span>
      </div>

      <TerminalWindow title="nexus@core: ~/playground — zsh" accent="cyan" actions={<SquareTerminal className="h-4 w-4 text-fg-muted" />}>
        <TerminalOutput lines={lines} revealedCount={revealedCount} onLineRevealed={markLineRevealed} onActivate={focusInput} />
        <TerminalInput inputRef={inputRef} value={input} busy={busy} onChange={setInput} onKeyDown={handleKeyDown} />
      </TerminalWindow>

      <div className="mt-4">
        <CommandChips commands={QUICK_COMMANDS} onRun={run} />
      </div>
    </BentoCard>
  );
}
