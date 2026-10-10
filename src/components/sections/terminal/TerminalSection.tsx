"use client";

import { SquareTerminal } from "lucide-react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusDot } from "@/components/ui/StatusDot";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { TERMINAL_SECTION_ID, useTerminal } from "@/context/TerminalContext";
import { QUICK_COMMANDS } from "@/lib/terminal";
import { CommandChips } from "./CommandChips";
import { TerminalInput } from "./TerminalInput";
import { TerminalOutput } from "./TerminalOutput";

export function TerminalSection() {
  const { lines, revealedCount, busy, input, setInput, run, markLineRevealed, handleKeyDown, inputRef } = useTerminal();
  const focusInput = () => inputRef.current?.focus({ preventScroll: true });

  return (
    <section id={TERMINAL_SECTION_ID} aria-labelledby="terminal-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-24 sm:px-6">
      <SectionHeading
        headingId="terminal-heading"
        index="07"
        title="Live AI Terminal"
        accent="cyan"
        subtitle="Interrogate the mesh directly. Type a protocol or fire a rapid command chip — output streams in real time."
      />
      <BentoCard accent="cyan" scaleOnHover={false} className="p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <BentoLabel index="07.A">Command Uplink</BentoLabel>
          <span className="flex items-center gap-2 font-tech text-xs tracking-[0.14em] text-cyber-lime uppercase">
            <StatusDot accent="lime" /> Session encrypted
          </span>
        </div>

        <TerminalWindow
          title="nexus@core: ~/uplink — zsh"
          accent="cyan"
          actions={<SquareTerminal className="h-4 w-4 text-zinc-400" />}
          className="glow-cyan"
        >
          <TerminalOutput lines={lines} revealedCount={revealedCount} onLineRevealed={markLineRevealed} onActivate={focusInput} />
          <TerminalInput inputRef={inputRef} value={input} busy={busy} onChange={setInput} onKeyDown={handleKeyDown} />
        </TerminalWindow>

        <div className="mt-4">
          <CommandChips commands={QUICK_COMMANDS} onRun={run} />
        </div>
      </BentoCard>
    </section>
  );
}
