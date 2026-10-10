import { CountUp } from "@/components/effects/CountUp";
import { BentoCard } from "@/components/ui/BentoCard";
import { HERO_STATS } from "@/data/telemetry";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";

export function HeroStats() {
  return (
    <>
      {HERO_STATS.map((stat) => {
        const tokens = accentTokens(stat.accent);
        return (
          <BentoCard key={stat.label} accent={stat.accent} className="p-5">
            <p className="font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">{stat.label}</p>
            <p className={cn("mt-2 font-display text-3xl font-black", tokens.text, tokens.textGlow)}><CountUp value={stat.value} />
            </p>
          </BentoCard>
        );
      })}
    </>
  );
}
