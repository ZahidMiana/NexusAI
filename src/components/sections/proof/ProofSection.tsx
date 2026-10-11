import { Award, BriefcaseBusiness, Trophy, Users } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SWIPE_ITEM, SWIPE_ROW } from "@/components/ui/swipe";
import { SwipeHint } from "@/components/ui/SwipeHint";
import { CREDENTIALS, ORGANISATIONS } from "@/data/proof";
import { getMemberById } from "@/data/team";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Credential, CredentialKind } from "@/types";

const KIND_ICONS: Record<CredentialKind, typeof Award> = { Certification: Award, Role: BriefcaseBusiness, Leadership: Users, Award: Trophy };

export function ProofSection() {
  return (
    <section id="proof" aria-labelledby="proof-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="proof-heading"
        index="03"
        eyebrow="Credentials"
        title="Experience & Credentials"
        accent="cyan"
        subtitle="The roles, certifications, leadership and awards behind the work."
      />
      <OrganisationMarquee />
      <div className="mt-6">
        <SwipeHint count={CREDENTIALS.length} />
      </div>
      <div className={cn(SWIPE_ROW, "md:grid md:grid-cols-2 lg:grid-cols-3")}>
        {CREDENTIALS.map((credential, index) => (
          <Reveal key={credential.id} delay={index * 0.05} className={SWIPE_ITEM}>
            <CredentialCard credential={credential} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function OrganisationMarquee() {
  const loop = [...ORGANISATIONS, ...ORGANISATIONS];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-panel py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <p className="sr-only">Organisations and platforms: {ORGANISATIONS.join(", ")}</p>
      <ul aria-hidden className="marquee-track flex w-max animate-marquee gap-12 pr-12">
        {loop.map((name, index) => (
          <li key={`${name}-${index}`} className="font-display text-lg font-black tracking-[0.12em] whitespace-nowrap text-fg-muted transition-colors hover:text-cyber-cyan">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CredentialCard({ credential }: { credential: Credential }) {
  const tokens = accentTokens(credential.accent);
  const member = getMemberById(credential.memberId);
  const Icon = KIND_ICONS[credential.kind];

  return (
    <BentoCard accent={credential.accent} className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between font-tech text-xs tracking-[0.12em] uppercase">
        <span className={cn("flex items-center gap-1.5", tokens.text)}>
          <Icon className="h-3.5 w-3.5" aria-hidden /> {credential.kind}
        </span>
        <span className="rounded border border-line-strong px-2 py-0.5 text-fg-soft">{credential.period}</span>
      </div>
      <div>
        <h3 className="font-display text-lg font-black tracking-wide text-fg">{credential.title}</h3>
        <p className="font-mono text-sm text-fg-muted">{credential.org}</p>
      </div>
      <p className="flex-1 font-mono text-sm leading-relaxed text-fg-soft">{credential.detail}</p>
      {member && (
        <p className="border-t border-line pt-3 font-tech text-xs tracking-[0.12em] text-fg-muted uppercase">
          {member.name} <span className={tokens.text}>{member.handle}</span>
        </p>
      )}
    </BentoCard>
  );
}
