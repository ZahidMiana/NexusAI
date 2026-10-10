"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { useTerminalSession, type TerminalSession } from "@/hooks/useTerminalSession";
import { BOOT_SEQUENCE, createDefaultRegistry, type CommandRegistry } from "@/lib/terminal";
import type { TerminalEffect } from "@/types";

export const TERMINAL_SECTION_ID = "terminal";

interface TerminalLauncher {
  /** Scrolls to the terminal, focuses it and optionally runs a command. */
  openTerminal: (command?: string) => void;
}

interface TerminalSessionContextValue extends TerminalSession {
  inputRef: RefObject<HTMLInputElement | null>;
}

/*
 * Two narrow contexts instead of one wide one (Interface Segregation):
 * the navbar and hero only need to *launch* the terminal and must not
 * re-render on every typed character or printed line.
 */
const TerminalLauncherContext = createContext<TerminalLauncher | null>(null);
const TerminalSessionContext = createContext<TerminalSessionContextValue | null>(null);

interface TerminalProviderProps {
  children: ReactNode;
  /** Injectable for tests or alternative command sets (Dependency Inversion). */
  registry?: CommandRegistry;
  /** Fulfils side effects requested by commands (e.g. opening the contact form). */
  onEffect?: (effect: TerminalEffect) => void;
}

export function TerminalProvider({ children, registry, onEffect }: TerminalProviderProps) {
  const [activeRegistry] = useState(() => registry ?? createDefaultRegistry());
  const session = useTerminalSession(activeRegistry, BOOT_SEQUENCE, onEffect);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { run } = session;

  const openTerminal = useCallback(
    (command?: string) => {
      document.getElementById(TERMINAL_SECTION_ID)?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 450);
      if (command) run(command);
    },
    [run],
  );

  const launcher = useMemo<TerminalLauncher>(() => ({ openTerminal }), [openTerminal]);
  const sessionValue = useMemo<TerminalSessionContextValue>(() => ({ ...session, inputRef }), [session]);

  return (
    <TerminalLauncherContext.Provider value={launcher}>
      <TerminalSessionContext.Provider value={sessionValue}>{children}</TerminalSessionContext.Provider>
    </TerminalLauncherContext.Provider>
  );
}

export function useTerminalLauncher(): TerminalLauncher {
  const context = useContext(TerminalLauncherContext);
  if (!context) throw new Error("useTerminalLauncher must be used inside <TerminalProvider>");
  return context;
}

export function useTerminal(): TerminalSessionContextValue {
  const context = useContext(TerminalSessionContext);
  if (!context) throw new Error("useTerminal must be used inside <TerminalProvider>");
  return context;
}
