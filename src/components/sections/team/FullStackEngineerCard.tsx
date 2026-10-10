"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Server } from "lucide-react";
import { useState } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { SegmentedControl, type SegmentOption } from "@/components/ui/SegmentedControl";
import { MemberHeader } from "./MemberHeader";
import type { MemberCardProps } from "./types";
import { ArchitectureGraph } from "./widgets/ArchitectureGraph";
import { LLMStatsGrid } from "./widgets/LLMStatsGrid";

type View = "telemetry" | "architecture";

const VIEWS: readonly SegmentOption<View>[] = [
  { value: "telemetry", label: "RAG Stats" },
  { value: "architecture", label: "Arch Graph" },
];

export function FullStackEngineerCard({ member, index }: MemberCardProps) {
  const [view, setView] = useState<View>("telemetry");

  return (
    <BentoCard accent={member.accent} scaleOnHover={false} className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <BentoLabel index="04.A" accent={member.accent}>
          RAG & Agent Core
        </BentoLabel>
        <Server className="h-5 w-5 text-cyber-cyan" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
        <MemberHeader member={member} index={index} />
        <div className="min-w-0 space-y-4">
          <SegmentedControl options={VIEWS} value={view} onChange={setView} accent={member.accent} ariaLabel="RAG and agent view" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {view === "telemetry" ? <LLMStatsGrid /> : <ArchitectureGraph />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </BentoCard>
  );
}
