import type { TerminalCommand } from "@/types";

export const whoamiCommand: TerminalCommand = {
  name: "/whoami",
  description: "Identify the current session",
  execute: ({ now }) => ({
    lines: [
      { text: "guest@nexus-ai :: clearance LEVEL_1 (visitor)", tone: "cyan" },
      { text: `session opened ${now.toISOString()}`, tone: "muted" },
      { text: "Upgrade clearance with /contact.", tone: "pink" },
    ],
  }),
};
