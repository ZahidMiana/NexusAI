import { aboutCommand } from "./commands/about";
import { bookCommand } from "./commands/book";
import { clearCommand } from "./commands/clear";
import { contactCommand } from "./commands/contact";
import { helpCommand } from "./commands/help";
import { pingCommand } from "./commands/ping";
import { stackCommand } from "./commands/stack";
import { teamCommand } from "./commands/team";
import { whoamiCommand } from "./commands/whoami";
import { CommandRegistry } from "./registry";

export { CommandRegistry } from "./registry";
export { executeInput } from "./executor";
export { parseInput } from "./parser";

/** Composition root for the default terminal command set. */
export function createDefaultRegistry(): CommandRegistry {
  return new CommandRegistry()
    .register(helpCommand)
    .register(teamCommand)
    .register(stackCommand)
    .register(pingCommand)
    .register(contactCommand)
    .register(bookCommand)
    .register(aboutCommand)
    .register(whoamiCommand)
    .register(clearCommand);
}

export const QUICK_COMMANDS = ["/help", "/team", "/stack", "/ping", "/book", "/clear"] as const;

export const BOOT_SEQUENCE = [
  { text: "NEXUS_OS v7.3.1 // kernel 6.13-nexus-rt", tone: "muted" },
  { text: "[ OK ] Neural mesh online · 3 operators linked", tone: "lime" },
  { text: "[ OK ] Inference fabric warm · 8 GPUs ready", tone: "lime" },
  { text: "Type /help or tap a command chip to begin.", tone: "cyan" },
] as const;
