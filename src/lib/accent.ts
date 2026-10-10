import type { Accent } from "@/types";

/**
 * Every accent-dependent class lives here as a complete literal so the
 * Tailwind compiler can see it. Components ask for tokens by accent name and
 * never hard-code colour classes themselves.
 */
export interface AccentTokens {
  hex: string;
  rgb: string;
  text: string;
  textGlow: string;
  bg: string;
  bgSoft: string;
  border: string;
  borderSoft: string;
  hoverBorder: string;
  glow: string;
  hoverGlow: string;
  dropGlow: string;
  ring: string;
  groupHoverBorder: string;
  groupHoverText: string;
  hoverBgSoft: string;
}

export const ACCENT_TOKENS: Readonly<Record<Accent, AccentTokens>> = {
  cyan: {
    hex: "#00F0FF",
    rgb: "0, 240, 255",
    text: "text-cyber-cyan",
    textGlow: "text-glow-cyan",
    bg: "bg-cyber-cyan",
    bgSoft: "bg-cyber-cyan/10",
    border: "border-cyber-cyan",
    borderSoft: "border-cyber-cyan/40",
    hoverBorder: "hover:border-cyber-cyan/80",
    glow: "glow-cyan",
    hoverGlow: "hover:glow-cyan",
    dropGlow: "drop-glow-cyan",
    ring: "focus-visible:ring-cyber-cyan/60",
    groupHoverBorder: "group-hover/bento:border-cyber-cyan",
    groupHoverText: "group-hover/bento:text-cyber-cyan",
    hoverBgSoft: "hover:bg-cyber-cyan/10",
  },
  pink: {
    hex: "#FF007F",
    rgb: "255, 0, 127",
    text: "text-cyber-pink",
    textGlow: "text-glow-pink",
    bg: "bg-cyber-pink",
    bgSoft: "bg-cyber-pink/10",
    border: "border-cyber-pink",
    borderSoft: "border-cyber-pink/40",
    hoverBorder: "hover:border-cyber-pink/80",
    glow: "glow-pink",
    hoverGlow: "hover:glow-pink",
    dropGlow: "drop-glow-pink",
    ring: "focus-visible:ring-cyber-pink/60",
    groupHoverBorder: "group-hover/bento:border-cyber-pink",
    groupHoverText: "group-hover/bento:text-cyber-pink",
    hoverBgSoft: "hover:bg-cyber-pink/10",
  },
  lime: {
    hex: "#39FF14",
    rgb: "57, 255, 20",
    text: "text-cyber-lime",
    textGlow: "text-glow-lime",
    bg: "bg-cyber-lime",
    bgSoft: "bg-cyber-lime/10",
    border: "border-cyber-lime",
    borderSoft: "border-cyber-lime/40",
    hoverBorder: "hover:border-cyber-lime/80",
    glow: "glow-lime",
    hoverGlow: "hover:glow-lime",
    dropGlow: "drop-glow-lime",
    ring: "focus-visible:ring-cyber-lime/60",
    groupHoverBorder: "group-hover/bento:border-cyber-lime",
    groupHoverText: "group-hover/bento:text-cyber-lime",
    hoverBgSoft: "hover:bg-cyber-lime/10",
  },
};

export function accentTokens(accent: Accent): AccentTokens {
  return ACCENT_TOKENS[accent];
}

export function accentRgba(accent: Accent, alpha: number): string {
  return `rgba(${ACCENT_TOKENS[accent].rgb}, ${alpha})`;
}
