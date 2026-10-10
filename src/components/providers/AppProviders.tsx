"use client";

import { useCallback, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { CommandPaletteProvider } from "@/context/CommandPaletteContext";
import { ContactProvider, useContactLauncher } from "@/context/ContactContext";
import { TerminalProvider } from "@/context/TerminalContext";
import { preferenceStore } from "@/lib/preferences/store";
import type { TerminalEffect } from "@/types";

// The palette is only needed after Ctrl+K or the menu button, so it loads after hydration.
const CommandPalette = dynamic(() => import("@/components/command/CommandPalette").then((module) => module.CommandPalette), { ssr: false });

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
      </CommandPaletteProvider>
    </TerminalProvider>
  );
}
