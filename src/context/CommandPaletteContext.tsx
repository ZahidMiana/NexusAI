"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useHotkey } from "@/hooks/useHotkey";

interface CommandPaletteControls {
  open: boolean;
  /** Increments on each open so the palette can reset its query. */
  session: number;
  openPalette: () => void;
  closePalette: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteControls | null>(null);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState(0);

  const openPalette = useCallback(() => {
    setSession((value) => value + 1);
    setOpen(true);
  }, []);
  const closePalette = useCallback(() => setOpen(false), []);

  useHotkey("k", () => (open ? closePalette() : openPalette()));

  const value = useMemo(() => ({ open, session, openPalette, closePalette }), [open, session, openPalette, closePalette]);
  return <CommandPaletteContext.Provider value={value}>{children}</CommandPaletteContext.Provider>;
}

export function useCommandPalette(): CommandPaletteControls {
  const context = useContext(CommandPaletteContext);
  if (!context) throw new Error("useCommandPalette must be used inside <CommandPaletteProvider>");
  return context;
}
