import { TECH_CATEGORIES } from "@/data/techStack";
import type { TerminalCommand, TerminalLineDraft } from "@/types";

export const stackCommand: TerminalCommand = {
  name: "/stack",
  aliases: ["/tech"],
  description: "List the team's full technology stack",
  execute: () => {
    const groups: TerminalLineDraft[] = TECH_CATEGORIES.flatMap((category) => [
      { text: `▸ ${category.label.toUpperCase()}`, tone: category.accent },
      { text: `  ${[...category.items.map((item) => item.name), ...category.alsoUsed].join(" · ")}`, tone: "muted" },
    ]);

    return {
      lines: [
        { text: "> Mounting /usr/nexus/stack ...", tone: "muted" },
        ...groups,
        { text: "Run /explain <tool> for details, e.g. /explain langgraph", tone: "lime" },
      ],
    };
  },
};
