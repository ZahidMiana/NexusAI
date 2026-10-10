import type { CommandResult } from "@/types";
import { parseInput } from "./parser";
import type { CommandRegistry } from "./registry";

/** Runs raw input against a registry and always yields printable output. */
export function executeInput(raw: string, registry: CommandRegistry, now: Date = new Date()): CommandResult {
  const parsed = parseInput(raw);
  if (!parsed) return { lines: [] };

  const command = registry.resolve(parsed.name);
  if (!command) {
    return {
      lines: [
        { text: `ERR::COMMAND_NOT_FOUND → "${parsed.name}"`, tone: "error" },
        { text: "Type /help to list available protocols.", tone: "muted" },
      ],
    };
  }

  return command.execute({ args: parsed.args, availableCommands: registry.describe(), now });
}
