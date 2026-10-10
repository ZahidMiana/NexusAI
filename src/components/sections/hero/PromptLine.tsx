"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

export interface PromptLineProps {
  user?: string;
  command: string;
}

/** A flashing cyberpunk shell prompt that types its command on mount. */
export function PromptLine({ user = "root@nexus", command }: PromptLineProps) {
  const { output } = useTypewriter(command, { speed: 45, step: 1 });

  return (
    <p className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-fg-muted sm:text-sm">
      <span className="text-cyber-lime">{user}</span>
      <span className="text-fg-muted">:</span>
      <span className="text-cyber-cyan">~</span>
      <span className="text-cyber-pink">$</span>
      <span className="text-fg-soft">
        {output}
        <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-cyber-cyan" aria-hidden />
      </span>
    </p>
  );
}
