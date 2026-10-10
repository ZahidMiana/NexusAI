import { Clock, FileLock2, Handshake, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { CONTACT_SECTION_ID } from "@/context/ContactContext";
import { ContactForm } from "./ContactForm";

const NEXT_STEPS = [
  { title: "We read your brief", detail: "An engineer, not a salesperson, reviews it the same day." },
  { title: "30 minute call", detail: "We dig into goals, data and constraints. No slides." },
  { title: "Proposal in 48h", detail: "Scope, timeline, team and a fixed price or monthly rate." },
] as const;

export function ContactSection() {
  return (
    <section id={CONTACT_SECTION_ID} aria-labelledby="contact-heading" className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-24 sm:px-6">
      <SectionHeading
        headingId="contact-heading"
        index="10"
        title="Initiate Protocol"
        accent="pink"
        subtitle="Tell us what you are building. You will hear back from an engineer within one business day."
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <BentoCard accent="cyan" className="flex h-full flex-col gap-6 p-6 sm:p-8">
            <BentoLabel index="10.A">What happens next</BentoLabel>
            <ol className="space-y-5">
              {NEXT_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyber-cyan/60 font-tech text-sm text-cyber-cyan">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-tech text-sm tracking-[0.1em] text-white uppercase">{step.title}</p>
                    <p className="mt-1 font-mono text-sm leading-relaxed text-zinc-300">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="mt-auto space-y-3 border-t border-zinc-800 pt-6">
              <Assurance icon={<Clock className="h-4 w-4" />}>Reply within one business day</Assurance>
              <Assurance icon={<FileLock2 className="h-4 w-4" />}>NDA signed before any details</Assurance>
              <Assurance icon={<Handshake className="h-4 w-4" />}>You own all code and models</Assurance>
              <Assurance icon={<Mail className="h-4 w-4" />}>
                <a href={`mailto:${siteConfig.contact.email}`} className="text-cyber-cyan underline-offset-4 hover:underline">
                  {siteConfig.contact.email}
                </a>
              </Assurance>
            </ul>
          </BentoCard>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-3">
          <BentoCard accent="pink" scaleOnHover={false} className="p-6 sm:p-8">
            <BentoLabel index="10.B" accent="pink" className="mb-6">
              Project intake
            </BentoLabel>
            <ContactForm />
          </BentoCard>
        </Reveal>
      </div>
    </section>
  );
}

function Assurance({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3 font-mono text-sm text-zinc-200">
      <span className="text-cyber-lime">{icon}</span>
      {children}
    </li>
  );
}
