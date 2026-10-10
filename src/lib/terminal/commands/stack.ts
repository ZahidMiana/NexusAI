import type { Accent, TerminalCommand } from "@/types";

interface StackEntry {
  name: string;
  version: string;
  role: string;
  load: number;
  tone: Accent;
}

const STACK: readonly StackEntry[] = [
  { name: "PYTHON", version: "v3.12", role: "core runtime // async services", load: 10, tone: "cyan" },
  { name: "PYTORCH", version: "v2.5", role: "training · fine-tuning · distillation", load: 10, tone: "pink" },
  { name: "LANGCHAIN", version: "v0.3", role: "agent graphs · retrieval chains", load: 9, tone: "lime" },
  { name: "NEXT.JS", version: "v16", role: "streaming RSC interfaces", load: 9, tone: "cyan" },
  { name: "HUGGING_FACE", version: "API", role: "transformers · PEFT · TGI protocols", load: 9, tone: "pink" },
];

function meter(load: number): string {
  return `[${"■".repeat(load)}${"□".repeat(10 - load)}]`;
}

export const stackCommand: TerminalCommand = {
  name: "/stack",
  aliases: ["/tech"],
  description: "Dump the production technology stack",
  execute: () => ({
    lines: [
      { text: "> Mounting /usr/nexus/stack ...", tone: "muted" },
      { text: "┌─ CORE_PROTOCOLS ──────────────────────────────┐", tone: "cyan" },
      ...STACK.map((entry) => ({
        text: `  ${meter(entry.load)} ${entry.name.padEnd(15, ".")} ${entry.version.padEnd(6)} // ${entry.role}`,
        tone: entry.tone,
      })),
      { text: "└───────────────────────────────────────────────┘", tone: "cyan" },
      { text: "STACK_INTEGRITY: 100% · ALL PROTOCOLS HANDSHAKE OK", tone: "lime" },
    ],
  }),
};
