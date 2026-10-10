import type { CommandDescriptor, TerminalCommand } from "@/types";

/**
 * Holds terminal commands by name and alias. The registry only knows the
 * `TerminalCommand` abstraction, never concrete commands (Dependency Inversion).
 */
export class CommandRegistry {
  private readonly commands = new Map<string, TerminalCommand>();
  private readonly ordered: TerminalCommand[] = [];

  register(command: TerminalCommand): this {
    const keys = [command.name, ...(command.aliases ?? [])];
    for (const key of keys) {
      if (this.commands.has(key)) {
        throw new Error(`Terminal command "${key}" is already registered`);
      }
      this.commands.set(key, command);
    }
    this.ordered.push(command);
    return this;
  }

  resolve(name: string): TerminalCommand | undefined {
    return this.commands.get(name);
  }

  describe(): CommandDescriptor[] {
    return this.ordered.map(({ name, description }) => ({ name, description }));
  }
}
