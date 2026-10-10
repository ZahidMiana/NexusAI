import { Globe } from "lucide-react";
import Image from "next/image";
import { BrandIcon, type Brand } from "@/components/ui/BrandIcon";
import { StatusDot } from "@/components/ui/StatusDot";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { TeamMember } from "@/types";
import { HireButton } from "./HireButton";

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
        <Avatar member={member} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-tech text-xs tracking-[0.14em] text-fg-muted">OP_0{index + 1}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-pink/40 bg-cyber-pink/10 px-2 py-0.5 font-tech text-xs tracking-[0.12em] text-cyber-pink uppercase">
              <StatusDot accent="pink" className="h-1.5 w-1.5" />
              {member.status}
            </span>
          </div>
          <h3 className="mt-1 truncate font-display text-xl font-black tracking-wide text-fg uppercase">{member.name}</h3>
          <p className={cn("font-tech text-xs tracking-[0.12em] uppercase", tokens.text)}>
            {member.role} <span className="text-fg-muted">{member.handle}</span>
          </p>
        </div>
      </div>
      {!compact && <p className="font-mono text-sm leading-relaxed text-fg-soft">{member.bio}</p>}
      <ul className="flex flex-wrap gap-1.5" aria-label={`${member.name} focus areas`}>
        {member.focus.map((focus) => (
          <li key={focus} className="rounded border border-line bg-inset px-2 py-0.5 font-tech text-xs tracking-[0.12em] text-fg-muted uppercase">
            {focus}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-3">
        <HireButton member={member} />
        <SocialLinks member={member} />
      </div>
    </div>
  );
}

const HEXAGON = "polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%)";

/** Portrait with a neon duotone treatment, or initials when no photo is set. */
function Avatar({ member }: { member: TeamMember }) {
  const tokens = accentTokens(member.accent);
  return (
    <div
      className={cn("relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden border bg-inset font-display text-lg font-black", tokens.borderSoft, tokens.text)}
      style={{ clipPath: HEXAGON }}
      aria-hidden={!member.photo}
    >
      {member.photo ? (
        <>
          <Image src={member.photo} alt={`Portrait of ${member.name}`} fill sizes="56px" className="object-cover grayscale contrast-125" />
          <span aria-hidden className={cn("absolute inset-0 mix-blend-color opacity-80", tokens.bg)} />
        </>
      ) : (
        initials(member.name)
      )}
    </div>
  );
}

type SocialKey = Brand | "website";

const SOCIAL_LABELS: Record<SocialKey, string> = { github: "GitHub", linkedin: "LinkedIn", website: "website" };

function SocialIcon({ kind }: { kind: SocialKey }) {
  return kind === "website" ? <Globe className="h-4 w-4" aria-hidden /> : <BrandIcon brand={kind} className="h-4 w-4" />;
}

function SocialLinks({ member }: { member: TeamMember }) {
  const entries = Object.entries(member.socials ?? {}).filter((entry): entry is [SocialKey, string] => Boolean(entry[1]));
  if (entries.length === 0) return null;
  return (
    <ul className="flex items-center gap-2">
      {entries.map(([brand, url]) => (
        <li key={brand}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on ${SOCIAL_LABELS[brand]}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line-strong text-fg-soft transition-colors hover:border-line-strong hover:text-fg"
          >
            <SocialIcon kind={brand} />
          </a>
        </li>
      ))}
    </ul>
  );
}
