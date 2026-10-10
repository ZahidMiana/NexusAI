"use client";

import { useMemo } from "react";
import { formatDuration } from "@/lib/format";
import { useNow } from "./useNow";

export interface UptimeState {
  label: string | null;
  year: number | null;
}

/** Live uptime since `sinceIso`, formatted for telemetry displays. */
export function useUptime(sinceIso: string): UptimeState {
  const now = useNow(1000);
  const since = useMemo(() => new Date(sinceIso).getTime(), [sinceIso]);

  if (!now) return { label: null, year: null };
  return { label: formatDuration(now.getTime() - since), year: now.getFullYear() };
}
