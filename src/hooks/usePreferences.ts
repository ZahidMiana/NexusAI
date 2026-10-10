"use client";

import { useSyncExternalStore } from "react";
import { preferenceStore, type Preferences } from "@/lib/preferences/store";
import { usePrefersReducedMotion } from "./useMediaQuery";

export function usePreferences(): Preferences {
  return useSyncExternalStore(preferenceStore.subscribe, preferenceStore.getSnapshot, preferenceStore.getServerSnapshot);
}

/**
 * Single gate for ambient motion: false when the OS asks for reduced motion
 * or the visitor switched the site to Calm effects.
 */
export function useMotionAllowed(): boolean {
  const reducedMotion = usePrefersReducedMotion();
  const { effects } = usePreferences();
  return !reducedMotion && effects === "full";
}
