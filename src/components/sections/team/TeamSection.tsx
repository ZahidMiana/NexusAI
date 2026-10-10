import type { ComponentType } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TEAM } from "@/data/team";
import type { MemberSpecialty } from "@/types";
import { FullStackEngineerCard } from "./FullStackEngineerCard";
import { AvailabilityCard } from "./AvailabilityCard";
import { MobileDeveloperCard } from "./MobileDeveloperCard";
import { ProductEngineerCard } from "./ProductEngineerCard";
import { SecurityEngineerCard } from "./SecurityEngineerCard";
import type { MemberCardProps } from "./types";

/**
 * Maps each specialty to its showcase card and grid placement. Adding a new
 * operator type means adding an entry here — no conditional logic to edit.
 */
const SHOWCASES: Record<MemberSpecialty, { Card: ComponentType<MemberCardProps>; span: string }> = {
  "full-stack": { Card: FullStackEngineerCard, span: "md:col-span-2 lg:col-span-2 xl:col-span-3" },
  security: { Card: SecurityEngineerCard, span: "md:col-span-2 lg:col-span-3 xl:col-span-4" },
  product: { Card: ProductEngineerCard, span: "md:col-span-2 lg:col-span-2 xl:col-span-2" },
  mobile: { Card: MobileDeveloperCard, span: "md:col-span-2 lg:col-span-1 xl:col-span-2" },
};

export function TeamSection() {
  const [lead, ...rest] = TEAM;
  const LeadCard = SHOWCASES[lead.specialty].Card;

  return (
    <section id="team" aria-labelledby="team-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="team-heading"
        index="04"
        eyebrow="Team"
        title="Meet the Team"
        accent="pink"
        subtitle="One builds the AI, one breaks it before attackers can. Each card includes a live demo of their work."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Reveal className={SHOWCASES[lead.specialty].span}>
          <LeadCard member={lead} />
        </Reveal>
        <Reveal delay={0.05} className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <AvailabilityCard />
        </Reveal>
        {rest.map((member, offset) => {
          const { Card, span } = SHOWCASES[member.specialty];
          return (
            <Reveal key={member.id} delay={0.1 * (offset + 1)} className={span}>
              <Card member={member} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
