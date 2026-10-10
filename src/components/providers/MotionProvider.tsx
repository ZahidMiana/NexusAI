"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { usePreferences } from "@/hooks/usePreferences";

/** Framer follows the OS setting, and is fully reduced in Calm effects mode. */
export function MotionProvider({ children }: { children: ReactNode }) {
  const { effects } = usePreferences();
  return <MotionConfig reducedMotion={effects === "calm" ? "always" : "user"}>{children}</MotionConfig>;
}
