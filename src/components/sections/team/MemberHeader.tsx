import { StatusDot } from "@/components/ui/StatusDot";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { TeamMember } from "@/types";

export interface MemberHeaderProps {
  member: TeamMember;
  index: number;
  compact?: boolean;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Shared identity block for every operator showcase card. */
export function MemberHeader({ member, index, compact = false }: MemberHeaderProps) {
  const tokens = accentTokens(member.accent);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "relative flex h-14 w-14 shrink-0 items-center justify-center border bg-black/60 font-display text-lg font-black",
            tokens.borderSoft,
            tokens.text,
            tokens.textGlow,
          )}
          style={{ clipPath: "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)" }}
          aria-hidden
        >
          {initials(member.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-tech text-xs tracking-[0.14em] text-zinc-400">OP_0{index + 1}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-pink/40 bg-cyber-pink/10 px-2 py-0.5 font-tech text-xs tracking-[0.12em] text-cyber-pink uppercase">
              <StatusDot accent="pink" className="h-1.5 w-1.5" />
              {member.status}
            </span>
          </div>
          <h3 className="mt-1 truncate font-display text-xl font-black tracking-wide text-white uppercase">{member.name}</h3>
          <p className={cn("font-tech text-xs tracking-[0.12em] uppercase", tokens.text)}>
            {member.role} <span className="text-zinc-400">{member.handle}</span>
          </p>
        </div>
      </div>
      {!compact && <p className="font-mono text-sm leading-relaxed text-zinc-300">{member.bio}</p>}
      <ul className="flex flex-wrap gap-1.5">
        {member.focus.map((focus) => (
          <li key={focus} className="rounded border border-zinc-800 bg-black/40 px-2 py-0.5 font-tech text-xs tracking-[0.12em] text-zinc-400 uppercase">
            {focus}
          </li>
        ))}
      </ul>
    </div>
  );
}
