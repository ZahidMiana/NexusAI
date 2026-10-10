import type { TerminalCommand } from "@/types";

export const clearCommand: TerminalCommand = {
  name: "/clear",
  aliases: ["/cls"],
  description: "Purge the console buffer",
  execute: () => ({
    clearScreen: true,
    lines: [{ text: "Buffer purged. Session integrity preserved.", tone: "muted" }],
  }),
};
