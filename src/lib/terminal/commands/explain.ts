import { ALL_TECH_ITEMS } from "@/data/techStack";
import type { TerminalCommand } from "@/types";

const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

/** Explains how the team uses a technology: `/explain langgraph`. */
export const explainCommand: TerminalCommand = {
  name: "/explain",
  aliases: ["/tool"],
  description: "Explain how we use a technology",
  execute: ({ args }) => {
    const query = normalise(args.join(" "));
    const item = ALL_TECH_ITEMS.find((candidate) => normalise(candidate.id) === query || normalise(candidate.name) === query);

    if (!item) {
      return {
        lines: [
          { text: query ? `ERR::UNKNOWN_TECH → "${args.join(" ")}"` : "Usage: /explain <technology>", tone: query ? "error" : "cyan" },
          { text: `  Try: ${ALL_TECH_ITEMS.slice(0, 6).map((candidate) => candidate.id).join(", ")} …`, tone: "muted" },
          { text: "  Or tap any technology on the left.", tone: "muted" },
        ],
      };
    }

    const filled = Math.round(item.proficiency / 5);
    return {
      lines: [
        { text: `▸ ${item.name.toUpperCase()} :: HOW WE USE IT`, tone: item.accent },
        { text: item.summary },
        { text: `  LEVEL    [${"█".repeat(filled)}${"░".repeat(20 - filled)}] ${item.proficiency}%`, tone: "lime" },
        { text: `  USED IN  ${item.usedIn.join(" · ")}`, tone: "muted" },
        ...item.highlights.map((highlight) => ({ text: `  ✓ ${highlight}`, tone: "cyan" as const })),
      ],
    };
  },
};
