import type { ReactNode } from "react";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

export interface TerminalWindowProps {
  title: string;
  accent?: Accent;
  actions?: ReactNode;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}

/** Window chrome shared by every terminal-style surface on the site. */
export function TerminalWindow({ title, accent = "cyan", actions, className, bodyClassName, children }: TerminalWindowProps) {
  const tokens = accentTokens(accent);
  return (
    <div className={cn("scheme-dark terminal-shell overflow-hidden rounded-xl border border-line bg-void", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-panel-raised/80 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-cyber-pink/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-cyber-lime/80" />
          </div>
          <span className={cn("truncate font-tech text-xs tracking-[0.12em] uppercase", tokens.text)}>{title}</span>
        </div>
        {actions}
      </div>
      <div className={cn("font-mono text-xs sm:text-sm", bodyClassName)}>{children}</div>
    </div>
  );
}
