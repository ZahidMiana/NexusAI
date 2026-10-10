"use client";

import type { KeyboardEvent, RefObject } from "react";
import { cn } from "@/lib/cn";

export interface TerminalInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  value: string;
  busy: boolean;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

export function TerminalInput({ inputRef, value, busy, onChange, onKeyDown }: TerminalInputProps) {
  return (
    <label className="flex items-center gap-2 border-t border-zinc-800 bg-black/60 px-4 py-3 sm:px-6">
      <span className="shrink-0 text-cyber-lime">guest@nexus</span>
      <span className="shrink-0 text-zinc-400">~$</span>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        aria-label="Terminal command input"
        placeholder="type /help and press enter"
        className="min-w-0 flex-1 bg-transparent text-white caret-cyber-pink outline-none placeholder:text-zinc-500"
      />
      <span className={cn("shrink-0 font-tech text-xs tracking-[0.12em] uppercase", busy ? "text-cyber-pink animate-flicker" : "text-cyber-lime")}>
        {busy ? "streaming" : "ready"}
      </span>
    </label>
  );
}
