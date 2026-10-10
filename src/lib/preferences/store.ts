import { DEFAULT_EFFECTS, DEFAULT_STYLE, STORAGE_KEYS, isDesignStyleId, isEffectsMode, type DesignStyleId, type EffectsMode } from "./styles";

export interface Preferences {
  style: DesignStyleId;
  effects: EffectsMode;
}

const listeners = new Set<() => void>();

const SERVER_SNAPSHOT: Preferences = { style: DEFAULT_STYLE, effects: DEFAULT_EFFECTS };
let snapshot: Preferences | null = null;

function readFromDocument(): Preferences {
  const { style, fx } = document.documentElement.dataset;
  return {
    style: isDesignStyleId(style) ? style : DEFAULT_STYLE,
    effects: isEffectsMode(fx) ? fx : DEFAULT_EFFECTS,
  };
}

function persist(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable (private mode); the in-memory value still applies.
  }
}

function update(patch: Partial<Preferences>): void {
  snapshot = { ...preferenceStore.getSnapshot(), ...patch };
  listeners.forEach((listener) => listener());
}

/** External store over <html data-style/data-fx>, shared by every subscriber. */
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
  setStyle(style: DesignStyleId): void {
    document.documentElement.dataset.style = style;
    persist(STORAGE_KEYS.style, style);
    update({ style });
  },
  setEffects(effects: EffectsMode): void {
    document.documentElement.dataset.fx = effects;
    persist(STORAGE_KEYS.effects, effects);
    update({ effects });
  },
};
