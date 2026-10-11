"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { siteConfig } from "@/config/site";
import { TEAM } from "@/data/team";
import type { TeamMember } from "@/types";

const CONTACTS = TEAM.filter((member): member is TeamMember & { whatsapp: string } => Boolean(member.whatsapp));

/** Click-to-chat link with a short greeting already typed in. */
function chatUrl(member: TeamMember & { whatsapp: string }): string {
  const firstName = member.name.split(" ")[0];
  const text = `Hi ${firstName}, I found ${siteConfig.name} and would like to discuss a project.`;
  return `https://wa.me/${member.whatsapp}?text=${encodeURIComponent(text)}`;
}

/**
 * Floating WhatsApp button. Opens a small menu so the visitor can pick which
 * team member to chat with. Stacked above the assistant button (bottom right).
 */
export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  if (CONTACTS.length === 0) return null;

  return (
    <div ref={rootRef} className="fixed right-4 bottom-[10.5rem] z-40 flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)] sm:right-6 md:bottom-24">
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Chat with us on WhatsApp"
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[min(20rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-lg border-2 border-line bg-panel shadow-[var(--shadow-pop)]"
          >
            <div className="flex items-start justify-between gap-3 border-b-2 border-line bg-[#25D366] px-4 py-3 text-[#111111]">
              <div>
                <p className="font-display text-base font-black">Chat on WhatsApp</p>
                <p className="font-mono text-xs">Pick a team member to message.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close WhatsApp menu" className="rounded p-1 transition-colors hover:bg-black/10">
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="divide-y-2 divide-line">
              {CONTACTS.map((member) => (
                <li key={member.id}>
                  <a
                    href={chatUrl(member)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-inset"
                  >
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-line bg-inset font-display text-xs font-black text-fg">
                      {member.photo ? <Image src={member.photo} alt="" fill sizes="40px" className="object-cover" /> : member.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-sm font-black text-fg">{member.name}</span>
                      <span className="block truncate font-mono text-xs text-fg-muted">{member.role}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-fg-muted transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? "Close WhatsApp menu" : "Chat with us on WhatsApp"}
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-line bg-[#25D366] text-[#111111] shadow-[var(--shadow-pop)] transition-transform duration-200 ease-hardware hover:-translate-y-0.5 active:translate-y-0.5"
      >
        {open ? <X className="h-6 w-6" /> : <BrandIcon brand="whatsapp" className="h-7 w-7" />}
      </button>
    </div>
  );
}
