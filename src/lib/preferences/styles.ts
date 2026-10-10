/**
 * Design style registry: the overall visual language (shape, shadow, type).
 * Token values live in app/design-styles.css. Add a style here plus a token
 * block there and it appears in the navbar menu, the palette and /style.
 */
export const DESIGN_STYLES = {
  clay: { label: "Clay", description: "Soft pastel claymorphism" },
  brutal: { label: "Brutal", description: "Bold neo-brutalism" },
} as const;

export type DesignStyleId = keyof typeof DESIGN_STYLES;

export const DESIGN_STYLE_IDS = Object.keys(DESIGN_STYLES) as DesignStyleId[];

export const DEFAULT_STYLE: DesignStyleId = "clay";

export function isDesignStyleId(value: unknown): value is DesignStyleId {
  return typeof value === "string" && value in DESIGN_STYLES;
}

export type EffectsMode = "full" | "calm";

export const DEFAULT_EFFECTS: EffectsMode = "full";

export function isEffectsMode(value: unknown): value is EffectsMode {
  return value === "full" || value === "calm";
}

export const STORAGE_KEYS = { style: "nexus-style", effects: "nexus-fx" } as const;

/**
 * Runs before hydration and first paint: restores the saved style and effects
 * mode so returning visitors never see a flash. Dependency-free on purpose.
 * Unknown saved values (e.g. a retired style) fall back to the default.
 */
export function preferenceBootScript(): string {
  return `(function(){var d=document.documentElement;try{var S=${JSON.stringify(DESIGN_STYLE_IDS)};var s=localStorage.getItem("${STORAGE_KEYS.style}");d.dataset.style=S.indexOf(s)>-1?s:"${DEFAULT_STYLE}";var f=localStorage.getItem("${STORAGE_KEYS.effects}");if(f==="calm"||f==="full")d.dataset.fx=f;}catch(e){}})();`;
}
