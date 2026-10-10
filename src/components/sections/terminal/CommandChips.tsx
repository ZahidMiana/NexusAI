import { Zap } from "lucide-react";

export interface CommandChipsProps {
  commands: readonly string[];
  onRun: (command: string) => void;
}

export function CommandChips({ commands, onRun }: CommandChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1 font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">
        <Zap className="h-3 w-3 text-cyber-pink" /> Rapid exec
      </span>
      {commands.map((command) => (
        <button
          key={command}
          type="button"
          onClick={() => onRun(command)}
          className="rounded-md border border-line bg-inset px-2.5 py-1 font-mono text-xs text-fg-soft transition-all duration-300 ease-hardware hover:-translate-y-0.5 hover:border-cyber-cyan/70 hover:text-cyber-cyan hover:glow-cyan"
        >
          {command}
        </button>
      ))}
    </div>
  );
}
