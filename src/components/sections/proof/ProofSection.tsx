import { Radio } from "lucide-react";
import { BentoCard } from "@/components/ui/BentoCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CLIENT_LOGOS, TESTIMONIALS } from "@/data/proof";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/types";

export function ProofSection() {
  return (
    <section id="proof" aria-labelledby="proof-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading
        headingId="proof-heading"
        index="03"
        title="Incoming Transmissions"
        accent="cyan"
        subtitle="What the teams we work with say once the systems are live."
      />
      <LogoMarquee />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <Reveal key={testimonial.id} delay={index * 0.08}>
            <TestimonialCard testimonial={testimonial} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function LogoMarquee() {
  const loop = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-panel py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <p className="sr-only">Teams we have worked with: {CLIENT_LOGOS.join(", ")}</p>
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const tokens = accentTokens(testimonial.accent);
  return (
    <BentoCard accent={testimonial.accent} className="flex h-full flex-col gap-5 p-6">
      <div className="flex items-center justify-between font-tech text-xs tracking-[0.12em] uppercase">
        <span className={cn("flex items-center gap-1.5", tokens.text)}>
          <Radio className="h-3.5 w-3.5" /> Transmission
        </span>
        <span className="rounded border border-line-strong px-2 py-0.5 text-fg-soft">{testimonial.metric}</span>
      </div>
      <blockquote className="flex-1 font-mono text-base leading-relaxed text-fg">“{testimonial.quote}”</blockquote>
      <footer className="border-t border-line pt-4">
        <p className="font-tech text-sm tracking-[0.1em] text-fg-soft uppercase">{testimonial.role}</p>
        <p className="font-mono text-xs text-fg-muted">{testimonial.company}</p>
      </footer>
    </BentoCard>
  );
}
