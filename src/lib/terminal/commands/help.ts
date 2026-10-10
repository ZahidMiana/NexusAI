import type { TerminalCommand } from "@/types";

export const helpCommand: TerminalCommand = {
  name: "/help",
  aliases: ["/?", "/commands"],
  description: "List every available protocol",
  execute: ({ availableCommands }) => {
    const width = Math.max(...availableCommands.map((command) => command.name.length)) + 4;
    return {
      lines: [
        { text: "╔══ NEXUS_AI // COMMAND MANIFEST ══╗", tone: "cyan" },
        ...availableCommands.map((command) => ({
          text: `  ${command.name.padEnd(width, ".")} ${command.description}`,
        })),
        { text: "╚══════════════════════════════════╝", tone: "cyan" },
        { text: "TIP: press ↑ / ↓ to cycle history, TAB to autocomplete.", tone: "muted" },
      ],
    };
  },
};
