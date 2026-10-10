import type { ComponentType } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TEAM } from "@/data/team";
import type { MemberSpecialty } from "@/types";
import { FullStackEngineerCard } from "./FullStackEngineerCard";
import { MissionLog } from "./MissionLog";
import { MobileDeveloperCard } from "./MobileDeveloperCard";
import { ProductEngineerCard } from "./ProductEngineerCard";
import type { MemberCardProps } from "./types";

/**
 * Maps each specialty to its showcase card and grid placement. Adding a new
 * operator type means adding an entry here — no conditional logic to edit.
 */
const SHOWCASES: Record<MemberSpecialty, { Card: ComponentType<MemberCardProps>; span: string }> = {
  "full-stack": { Card: FullStackEngineerCard, span: "md:col-span-2 lg:col-span-2 xl:col-span-3" },
  product: { Card: ProductEngineerCard, span: "md:col-span-2 lg:col-span-2 xl:col-span-2" },
  mobile: { Card: MobileDeveloperCard, span: "md:col-span-2 lg:col-span-1 xl:col-span-2" },
};

export function TeamSection() {
  const [lead, ...rest] = TEAM;
  const LeadCard = SHOWCASES[lead.specialty].Card;

  return (
    <section id="team" aria-labelledby="team-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-24 sm:px-6">
      <SectionHeading
        headingId="team-heading"
        index="03"
        title="The Elite AI Grid"
        accent="pink"
        subtitle="Three operators, three disciplines, one deployment pipeline. Every block below is a live, interactive instrument."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Reveal className={SHOWCASES[lead.specialty].span}>
          <LeadCard member={lead} index={0} />
        </Reveal>
        <Reveal delay={0.05} className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <MissionLog />
        </Reveal>
        {rest.map((member, offset) => {
          const { Card, span } = SHOWCASES[member.specialty];
          return (
            <Reveal key={member.id} delay={0.1 * (offset + 1)} className={span}>
              <Card member={member} index={offset + 1} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
