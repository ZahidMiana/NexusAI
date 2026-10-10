"use client";

import { useCallback, type ReactNode } from "react";
import { ContactProvider, useContactLauncher } from "@/context/ContactContext";
import { TerminalProvider } from "@/context/TerminalContext";
import type { TerminalEffect } from "@/types";

/**
 * Composition root for client-side features. This is the only place that
 * knows the terminal and the contact form exist together.
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
      if (effect.type === "open-contact") openContact(effect.prefill);
    },
    [openContact],
  );

  return <TerminalProvider onEffect={handleEffect}>{children}</TerminalProvider>;
}
