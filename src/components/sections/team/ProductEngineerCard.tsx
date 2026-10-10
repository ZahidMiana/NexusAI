"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useState } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { SegmentedControl, type SegmentOption } from "@/components/ui/SegmentedControl";
import type { MemberCardProps } from "./types";
import { MemberHeader } from "./MemberHeader";
import { LaunchFeed } from "./widgets/LaunchFeed";
import { RoiCalculator } from "./widgets/RoiCalculator";
import { WorkflowDesigner } from "./widgets/WorkflowDesigner";

type View = "workflow" | "roi" | "launches";

const VIEWS: readonly SegmentOption<View>[] = [
  { value: "workflow", label: "Workflow" },
  { value: "roi", label: "ROI" },
  { value: "launches", label: "Launches" },
];

const PANELS: Record<View, () => React.JSX.Element> = {
  workflow: WorkflowDesigner,
  roi: RoiCalculator,
  launches: LaunchFeed,
};

export function ProductEngineerCard({ member, index }: MemberCardProps) {
  const [view, setView] = useState<View>("workflow");
  const Panel = PANELS[view];

  return (
    <BentoCard accent={member.accent} scaleOnHover={false} className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <BentoLabel index="02.B" accent={member.accent}>
          Agentic Product Lab
        </BentoLabel>
        <Bot className="h-5 w-5 text-cyber-pink drop-glow-pink" />
      </div>

      <MemberHeader member={member} index={index} />

      <div className="space-y-4">
        <SegmentedControl options={VIEWS} value={view} onChange={setView} accent={member.accent} ariaLabel="Product lab view" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>
    </BentoCard>
  );
}
