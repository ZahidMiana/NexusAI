export type EffectsMode = "full" | "calm";

export const DEFAULT_EFFECTS: EffectsMode = "full";

export function isEffectsMode(value: unknown): value is EffectsMode {
  return value === "full" || value === "calm";
}

export const EFFECTS_STORAGE_KEY = "nexus-fx";

/**
 * Runs before hydration and first paint: restores the saved effects mode so
 * returning visitors who chose Calm never see a burst of motion first.
 */
export function preferenceBootScript(): string {
  return `(function(){try{var f=localStorage.getItem("${EFFECTS_STORAGE_KEY}");if(f==="calm"||f==="full")document.documentElement.dataset.fx=f;}catch(e){}})();`;
}
