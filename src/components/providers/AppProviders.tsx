"use client";

import { useCallback, type ReactNode } from "react";
import { CommandPalette } from "@/components/command/CommandPalette";
import { CursorRing } from "@/components/effects/CursorRing";
import { CommandPaletteProvider } from "@/context/CommandPaletteContext";
import { ContactProvider, useContactLauncher } from "@/context/ContactContext";
import { TerminalProvider } from "@/context/TerminalContext";
import { preferenceStore } from "@/lib/preferences/store";
import type { TerminalEffect } from "@/types";

/**
 * Composition root for client-side features. This is the only place that
 * knows the terminal, contact form, command palette and preferences meet.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ContactProvider>
      <TerminalWithEffects>{children}</TerminalWithEffects>
    </ContactProvider>
  );
}

function TerminalWithEffects({ children }: { children: ReactNode }) {
  const { openContact } = useContactLauncher();

  const handleEffect = useCallback(
    (effect: TerminalEffect) => {
      switch (effect.type) {
        case "open-contact":
          openContact(effect.prefill);
          break;
        case "set-style":
          preferenceStore.setStyle(effect.style);
          break;
        case "set-theme":
          // Colour themes belong to the Cyber style, so applying one switches to it.
          preferenceStore.setStyle("cyber");
          preferenceStore.setTheme(effect.theme);
          break;
        case "set-effects":
          preferenceStore.setEffects(effect.effects);
          break;
      }
    },
    [openContact],
  );

  return (
    <TerminalProvider onEffect={handleEffect}>
      <CommandPaletteProvider>
        {children}
        <CommandPalette />
        <CursorRing />
      </CommandPaletteProvider>
    </TerminalProvider>
  );
}
