import { DEFAULT_EFFECTS, EFFECTS_STORAGE_KEY, isEffectsMode, type EffectsMode } from "./effects";

export interface Preferences {
  effects: EffectsMode;
}

const listeners = new Set<() => void>();

const SERVER_SNAPSHOT: Preferences = { effects: DEFAULT_EFFECTS };
let snapshot: Preferences | null = null;

function readFromDocument(): Preferences {
  const { fx } = document.documentElement.dataset;
  return { effects: isEffectsMode(fx) ? fx : DEFAULT_EFFECTS };
}

/** External store over <html data-fx>, shared by every subscriber. */
export const preferenceStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): Preferences {
    snapshot ??= readFromDocument();
    return snapshot;
  },
  getServerSnapshot(): Preferences {
    return SERVER_SNAPSHOT;
  },
  setEffects(effects: EffectsMode): void {
    document.documentElement.dataset.fx = effects;
    try {
      localStorage.setItem(EFFECTS_STORAGE_KEY, effects);
    } catch {
      // Storage can be unavailable (private mode); the in-memory value still applies.
    }
    snapshot = { effects };
    listeners.forEach((listener) => listener());
  },
};
