"use client";

import { ArrowUpRight, Copy, Leaf, Rocket, SquareTerminal, Sparkles, type LucideIcon } from "lucide-react";
import { STYLE_ICONS } from "@/components/layout/StyleMenu";
import { useMemo } from "react";
import { NAV_LINKS } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useContactLauncher } from "@/context/ContactContext";
import { useTerminalLauncher } from "@/context/TerminalContext";
import { usePreferences } from "@/hooks/usePreferences";
import { preferenceStore } from "@/lib/preferences/store";
import { DESIGN_STYLES, DESIGN_STYLE_IDS } from "@/lib/preferences/styles";

export type PaletteGroup = "Actions" | "Navigate" | "Style" | "Effects";

export interface PaletteItem {
  id: string;
  group: PaletteGroup;
  label: string;
  hint?: string;
  keywords: string;
  icon: LucideIcon;
  selected?: boolean;
  run: () => void;
}

export const GROUP_ORDER: readonly PaletteGroup[] = ["Actions", "Navigate", "Style", "Effects"];

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Builds palette entries from navigation, actions and preferences. */
export function usePaletteItems(): PaletteItem[] {
  const { openContact } = useContactLauncher();
  const { openTerminal } = useTerminalLauncher();
  const { style, effects } = usePreferences();

  return useMemo(() => {
    const actions: PaletteItem[] = [
      { id: "book", group: "Actions", label: "Book a call", hint: "Open the project form", keywords: "contact hire start project form email", icon: Rocket, run: () => openContact() },
      { id: "terminal", group: "Actions", label: "Open live terminal", hint: "Type /help", keywords: "console cli command shell", icon: SquareTerminal, run: () => openTerminal() },
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: siteConfig.contact.email,
        keywords: "mail contact clipboard",
        icon: Copy,
        run: () => void navigator.clipboard?.writeText(siteConfig.contact.email).catch(() => undefined),
      },
    ];

    const navigate: PaletteItem[] = [
      { id: "nav-top", group: "Navigate", label: "Home", hint: "00", keywords: "top hero start", icon: ArrowUpRight, run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
      ...NAV_LINKS.map<PaletteItem>((link) => ({
        id: `nav-${link.id}`,
        group: "Navigate",
        label: link.label,
        hint: link.code,
        keywords: `${link.id} section go`,
        icon: ArrowUpRight,
        run: () => scrollToSection(link.id),
      })),
    ];

    const styles = DESIGN_STYLE_IDS.map<PaletteItem>((id) => ({
      id: `style-${id}`,
      group: "Style",
      label: `${DESIGN_STYLES[id].label} style`,
      hint: DESIGN_STYLES[id].description,
      keywords: `style design skin look theme ${id}`,
      icon: STYLE_ICONS[id],
      selected: style === id,
      run: () => preferenceStore.setStyle(id),
    }));

    const effectModes: PaletteItem[] = [
      { id: "fx-full", group: "Effects", label: "Full effects", hint: "Every animation on", keywords: "effects motion animation fx", icon: Sparkles, selected: effects === "full", run: () => preferenceStore.setEffects("full") },
      { id: "fx-calm", group: "Effects", label: "Calm effects", hint: "No ambient motion", keywords: "effects reduce motion quiet fx accessibility", icon: Leaf, selected: effects === "calm", run: () => preferenceStore.setEffects("calm") },
    ];

    return [...actions, ...navigate, ...styles, ...effectModes];
  }, [openContact, openTerminal, style, effects]);
}

export function matchesQuery(item: PaletteItem, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = `${item.label} ${item.hint ?? ""} ${item.keywords} ${item.group}`.toLowerCase();
  return needle.split(/\s+/).every((word) => haystack.includes(word));
}

