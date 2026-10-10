/**
 * Colour themes for the Cyber style. Their RGB values live in
 * app/design-styles.css (`:root[data-theme=...]`); this registry provides
 * the ids and labels used by the palette, the terminal and validation.
 */
export const THEMES = {
  cyber: { label: "Cyber", description: "Cyan, hot pink and radioactive lime" },
  synthwave: { label: "Synthwave", description: "Sunset pink, electric teal and gold" },
  matrix: { label: "Matrix", description: "Phosphor greens on black" },
} as const;

export type ThemeId = keyof typeof THEMES;

export const THEME_IDS = Object.keys(THEMES) as ThemeId[];

export const DEFAULT_THEME: ThemeId = "cyber";

/**
 * Design style registry: the overall visual language (shape, shadow, type,
 * light or dark). Token values live in app/design-styles.css.
 */
export const DESIGN_STYLES = {
  clay: { label: "Clay", description: "Soft pastel claymorphism", scheme: "light" },
  cyber: { label: "Cyber", description: "Dark neon cyberpunk", scheme: "dark" },
  brutal: { label: "Brutal", description: "Bold light neo-brutalism", scheme: "light" },
} as const;

export type DesignStyleId = keyof typeof DESIGN_STYLES;

export const DESIGN_STYLE_IDS = Object.keys(DESIGN_STYLES) as DesignStyleId[];

export const DEFAULT_STYLE: DesignStyleId = "clay";

export function isDesignStyleId(value: unknown): value is DesignStyleId {
  return typeof value === "string" && value in DESIGN_STYLES;
}

export type EffectsMode = "full" | "calm";

export const DEFAULT_EFFECTS: EffectsMode = "full";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && value in THEMES;
}

export function isEffectsMode(value: unknown): value is EffectsMode {
  return value === "full" || value === "calm";
}

export const STORAGE_KEYS = { style: "nexus-style", theme: "nexus-theme", effects: "nexus-fx", booted: "nexus-booted" } as const;

/**
 * Runs before hydration and first paint: restores style, theme and effects
 * and decides whether the Cyber-only boot intro plays. Dependency-free on purpose.
 */
export function preferenceBootScript(): string {
  return `(function(){var d=document.documentElement;try{var S=${JSON.stringify(DESIGN_STYLE_IDS)};var s=localStorage.getItem("${STORAGE_KEYS.style}");if(S.indexOf(s)<0)s="${DEFAULT_STYLE}";d.dataset.style=s;var T=${JSON.stringify(THEME_IDS)};var t=localStorage.getItem("${STORAGE_KEYS.theme}");if(T.indexOf(t)>-1)d.dataset.theme=t;var f=localStorage.getItem("${STORAGE_KEYS.effects}");if(f==="calm"||f==="full")d.dataset.fx=f;var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(sessionStorage.getItem("${STORAGE_KEYS.booted}")||rm||f==="calm"||s!=="cyber"){d.dataset.boot="done"}else{sessionStorage.setItem("${STORAGE_KEYS.booted}","1")}}catch(e){d.dataset.boot="done"}})();`;
}
