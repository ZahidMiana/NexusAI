"use client";

import { useState, useSyncExternalStore } from "react";

interface ClockStore {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => Date;
}

function createClockStore(intervalMs: number): ClockStore {
  let current = new Date();
  return {
    subscribe(onChange) {
      const id = window.setInterval(() => {
        current = new Date();
        onChange();
      }, intervalMs);
      return () => window.clearInterval(id);
    },
    getSnapshot: () => current,
  };
}

const getServerSnapshot = (): null => null;

/**
 * Current time refreshed on an interval. Returns `null` on the server and
 * during hydration so server and client markup always match.
 */
export function useNow(intervalMs = 1000): Date | null {
  const [store] = useState(() => createClockStore(intervalMs));
  return useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot);
}
