"use client";

import { Clock, MessageSquareReply } from "lucide-react";
import { BookCallButton } from "@/components/layout/BookCallButton";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { StatusDot } from "@/components/ui/StatusDot";
import { siteConfig } from "@/config/site";
import { useNow } from "@/hooks/useNow";
import { formatClock } from "@/lib/format";

/** Real, useful facts for a visitor deciding to get in touch. */
export function AvailabilityCard() {
  return (
    <BentoCard accent="lime" className="flex h-full flex-col gap-6 p-6">
      <BentoLabel index="04.∑" accent="lime">
        Availability
      </BentoLabel>
      <LocalTime />
      <ul className="space-y-3 font-mono text-sm text-fg-soft">
        <li className="flex items-center gap-2.5">
          <StatusDot accent="lime" />
          {siteConfig.availability}
        </li>
        <li className="flex items-center gap-2.5">
          <MessageSquareReply className="h-4 w-4 shrink-0 text-cyber-cyan" aria-hidden />
          {siteConfig.responseTime}
        </li>
      </ul>
      <BookCallButton accent="lime" className="mt-auto w-full" />
    </BentoCard>
  );
}

function LocalTime() {
  const now = useNow(1000);
  const { city, timeZone, utcOffset } = siteConfig.location;
  return (
    <div>
      <p className="flex items-center gap-1.5 font-tech text-xs tracking-[0.12em] text-fg-muted uppercase">
        <Clock className="h-3.5 w-3.5" aria-hidden /> Local time · {city.split(",")[0]}
      </p>
      <p className="mt-1 font-display text-3xl font-black text-fg tabular-nums">{now ? formatClock(now, timeZone).slice(0, 5) : "--:--"}</p>
      <p className="font-mono text-xs text-fg-muted">{utcOffset}</p>
    </div>
  );
}
