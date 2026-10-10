import { SynthwaveHorizon } from "@/components/effects/SynthwaveHorizon";
import { Reveal } from "@/components/ui/Reveal";
import { HeroHeadline } from "./HeroHeadline";
import { HeroStats } from "./HeroStats";
import { NeuralTopology } from "./NeuralTopology";

export function HeroSection() {
  return (
    <section id="top" aria-label="Introduction" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 sm:pt-32">
      <SynthwaveHorizon />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Reveal className="md:col-span-2 lg:col-span-2 xl:col-span-2">
          <HeroHeadline />
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-2 lg:col-span-1 xl:col-span-2">
          <NeuralTopology />
        </Reveal>
      </div>
      <Reveal delay={0.2} className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
        <HeroStats />
      </Reveal>
    </section>
  );
}
