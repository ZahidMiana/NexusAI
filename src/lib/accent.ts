import type { Accent } from "@/types";

/**
 * Every accent-dependent class lives here as a complete literal so the
 * Tailwind compiler can see it. Components ask for tokens by accent name and
 * never hard-code colour classes themselves.
 */
export interface AccentTokens {
  /** Solid colour as a CSS value, e.g. for SVG `style={{ stroke }}`. */
  hex: string;
  /** CSS variable holding the RGB triplet; use as `rgb(${rgb} / alpha)`. */
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
    hex: "rgb(var(--accent-cyan))",
    rgb: "var(--accent-cyan)",
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
    hex: "rgb(var(--accent-pink))",
    rgb: "var(--accent-pink)",
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
    hex: "rgb(var(--accent-lime))",
    rgb: "var(--accent-lime)",
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

/** Theme-aware colour for CSS contexts (inline styles, SVG `style`). */
export function accentRgba(accent: Accent, alpha: number): string {
  return `rgb(var(--accent-${accent}) / ${alpha})`;
}

export type AccentPalette = Record<Accent, string>;

/** Resolves the live theme's RGB triplets, for canvas where CSS variables are unavailable. */
export function readAccentPalette(element: Element = document.documentElement): AccentPalette {
  const style = getComputedStyle(element);
  const read = (accent: Accent) => style.getPropertyValue(`--accent-${accent}`).trim() || "255 255 255";
  return { cyan: read("cyan"), pink: read("pink"), lime: read("lime") };
}
