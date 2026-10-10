"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Whether the surrounding UI region is currently worth animating (on screen
 * and in a visible tab). Defaults to `true` outside any boundary.
 */
const ActivityContext = createContext(true);

export function ActivityBoundary({ active, children }: { active: boolean; children: ReactNode }) {
  return <ActivityContext.Provider value={active}>{children}</ActivityContext.Provider>;
}

export function useActivity(): boolean {
  return useContext(ActivityContext);
}
