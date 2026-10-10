"use client";

import { useCallback, useMemo, useState } from "react";
import { TerminalLineView } from "@/components/sections/terminal/TerminalLineView";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import type { TechItem, TerminalLine } from "@/types";

export interface TechDetailTerminalProps {
  item: TechItem;
}

function buildLines(item: TechItem): TerminalLine[] {
  const filled = Math.round(item.proficiency / 5);
  const drafts: Omit<TerminalLine, "id">[] = [
    { kind: "input", text: `nexus explain --tech=${item.id}`, tone: "pink" },
    { kind: "output", text: `▸ ${item.name.toUpperCase()} :: PRODUCTION DOSSIER`, tone: item.accent },
    { kind: "output", text: item.summary, tone: "default" },
    { kind: "output", text: `  MASTERY  [${"█".repeat(filled)}${"░".repeat(20 - filled)}] ${item.proficiency}%`, tone: "lime" },
    { kind: "output", text: `  USED IN  ${item.usedIn.join(" · ")}`, tone: "muted" },
    ...item.highlights.map((highlight) => ({ kind: "output" as const, text: `  ✓ ${highlight}`, tone: "cyan" as const })),
    { kind: "output", text: "EOF · ready for deployment.", tone: "muted" },
  ];
  return drafts.map((draft, index) => ({ ...draft, id: `${item.id}-${index}` }));
}

/** Mini terminal that streams the team's expertise for the selected technology. */
export function TechDetailTerminal({ item }: TechDetailTerminalProps) {
  const lines = useMemo(() => buildLines(item), [item]);
  const [revealed, setRevealed] = useState(0);
  const advance = useCallback(() => setRevealed((count) => count + 1), []);

  return (
    <TerminalWindow title={`expertise://${item.id}`} accent={item.accent} bodyClassName="min-h-[16rem] space-y-0.5 p-4 sm:p-5">
      {lines.slice(0, revealed + 1).map((line, index) => (
        <TerminalLineView key={line.id} line={line} animate={index === revealed} onRevealed={advance} />
      ))}
    </TerminalWindow>
  );
}
