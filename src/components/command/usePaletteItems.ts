"use client";

import { ArrowUpRight, Copy, Leaf, Palette, Rocket, SquareTerminal, Sparkles, type LucideIcon } from "lucide-react";
import { STYLE_ICONS } from "@/components/layout/StyleMenu";
import { useMemo } from "react";
import { NAV_LINKS } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useContactLauncher } from "@/context/ContactContext";
import { useTerminalLauncher } from "@/context/TerminalContext";
import { usePreferences } from "@/hooks/usePreferences";
import { preferenceStore } from "@/lib/preferences/store";
import { DESIGN_STYLES, DESIGN_STYLE_IDS, THEMES, THEME_IDS } from "@/lib/preferences/themes";

export type PaletteGroup = "Actions" | "Navigate" | "Style" | "Theme" | "Effects";

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

export const GROUP_ORDER: readonly PaletteGroup[] = ["Actions", "Navigate", "Style", "Theme", "Effects"];

function scrollToSection(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Builds palette entries from navigation, actions and preferences. */
export function usePaletteItems(): PaletteItem[] {
  const { openContact } = useContactLauncher();
  const { openTerminal } = useTerminalLauncher();
  const { style, theme, effects } = usePreferences();

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
      keywords: `style design skin look ${id} ${DESIGN_STYLES[id].scheme}`,
      icon: STYLE_ICONS[id],
      selected: style === id,
      run: () => preferenceStore.setStyle(id),
    }));

    const themes = THEME_IDS.map<PaletteItem>((id) => ({
      id: `theme-${id}`,
      group: "Theme",
      label: `${THEMES[id].label} theme`,
      hint: `${THEMES[id].description} · Cyber style`,
      keywords: `theme colour color palette ${id}`,
      icon: Palette,
      selected: style === "cyber" && theme === id,
      run: () => {
        preferenceStore.setStyle("cyber");
        preferenceStore.setTheme(id);
      },
    }));

    const effectModes: PaletteItem[] = [
      { id: "fx-full", group: "Effects", label: "Full effects", hint: "Every animation on", keywords: "effects motion animation fx", icon: Sparkles, selected: effects === "full", run: () => preferenceStore.setEffects("full") },
      { id: "fx-calm", group: "Effects", label: "Calm effects", hint: "No ambient motion", keywords: "effects reduce motion quiet fx accessibility", icon: Leaf, selected: effects === "calm", run: () => preferenceStore.setEffects("calm") },
    ];

    return [...actions, ...navigate, ...styles, ...themes, ...effectModes];
  }, [openContact, openTerminal, style, theme, effects]);
}

export function matchesQuery(item: PaletteItem, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = `${item.label} ${item.hint ?? ""} ${item.keywords} ${item.group}`.toLowerCase();
  return needle.split(/\s+/).every((word) => haystack.includes(word));
}

