"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ContactPrefill } from "@/types";

export const CONTACT_SECTION_ID = "contact";
/** The form card itself; on narrow screens it sits below the "what happens next" card. */
export const CONTACT_FORM_ID = "project-intake";

export interface ContactRequest {
  /** Increments on every open so repeated requests re-apply prefill and focus. */
  id: number;
  prefill: ContactPrefill;
}

interface ContactLauncher {
  openContact: (prefill?: ContactPrefill) => void;
}

const ContactLauncherContext = createContext<ContactLauncher | null>(null);
const ContactRequestContext = createContext<ContactRequest | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<ContactRequest | null>(null);

  const openContact = useCallback((prefill: ContactPrefill = {}) => {
    setRequest((current) => ({ id: (current?.id ?? 0) + 1, prefill }));
    // Wide screens show the form beside the intro, so the section top is ideal.
    // On phones the form is stacked lower, so scroll straight to it.
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const target = document.getElementById(wide ? CONTACT_SECTION_ID : CONTACT_FORM_ID) ?? document.getElementById(CONTACT_SECTION_ID);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const launcher = useMemo(() => ({ openContact }), [openContact]);

  return (
    <ContactLauncherContext.Provider value={launcher}>
      <ContactRequestContext.Provider value={request}>{children}</ContactRequestContext.Provider>
    </ContactLauncherContext.Provider>
  );
}

/** For anything that only needs to open the form (buttons, terminal). */
export function useContactLauncher(): ContactLauncher {
  const context = useContext(ContactLauncherContext);
  if (!context) throw new Error("useContactLauncher must be used inside <ContactProvider>");
  return context;
}

/** For the form itself: the latest open request, or null. */
export function useContactRequest(): ContactRequest | null {
  return useContext(ContactRequestContext);
}
