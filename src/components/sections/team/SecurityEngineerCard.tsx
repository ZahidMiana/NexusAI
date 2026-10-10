"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShieldHalf } from "lucide-react";
import { useState } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { SegmentedControl, type SegmentOption } from "@/components/ui/SegmentedControl";
import { MemberHeader } from "./MemberHeader";
import type { MemberCardProps } from "./types";
import { InjectionLab } from "./widgets/security/InjectionLab";
import { OwaspScan } from "./widgets/security/OwaspScan";
import { ThreatFeed } from "./widgets/security/ThreatFeed";

type View = "injection" | "audit" | "feed";

const VIEWS: readonly SegmentOption<View>[] = [
  { value: "injection", label: "Injection Lab" },
  { value: "audit", label: "OWASP Audit" },
  { value: "feed", label: "Threat Feed" },
];

const PANELS: Record<View, () => React.JSX.Element> = {
  injection: InjectionLab,
  audit: OwaspScan,
  feed: ThreatFeed,
};

export function SecurityEngineerCard({ member }: MemberCardProps) {
  const [view, setView] = useState<View>("injection");
  const Panel = PANELS[view];

  return (
    <BentoCard accent={member.accent} scaleOnHover={false} className="flex h-full flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <BentoLabel index="04.B" accent={member.accent}>
          AI Security Lab
        </BentoLabel>
        <ShieldHalf className="h-5 w-5 text-cyber-pink" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)]">
        <MemberHeader member={member} />
        <div className="min-w-0 space-y-4">
          <SegmentedControl options={VIEWS} value={view} onChange={setView} accent={member.accent} ariaLabel="Security lab view" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={view} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </BentoCard>
  );
}
