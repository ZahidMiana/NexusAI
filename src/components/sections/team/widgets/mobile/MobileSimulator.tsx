"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HomeScreen } from "./HomeScreen";
import { LlamaScreen } from "./LlamaScreen";
import { PhoneFrame } from "./PhoneFrame";
import type { DeviceMode } from "./types";
import { VisionScreen } from "./VisionScreen";

export interface MobileSimulatorProps {
  mode: DeviceMode;
  onModeChange: (mode: DeviceMode) => void;
  onLlmActivityChange: (active: boolean) => void;
}

/** Phone mock that switches between on-device AI demo screens. */
export function MobileSimulator({ mode, onModeChange, onLlmActivityChange }: MobileSimulatorProps) {
  const goHome = () => onModeChange("home");

  return (
    <PhoneFrame>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {mode === "home" && <HomeScreen onLaunch={onModeChange} />}
          {mode === "llm" && <LlamaScreen onBack={goHome} onActivityChange={onLlmActivityChange} />}
          {mode === "cv" && <VisionScreen onBack={goHome} />}
        </motion.div>
      </AnimatePresence>
    </PhoneFrame>
  );
}
