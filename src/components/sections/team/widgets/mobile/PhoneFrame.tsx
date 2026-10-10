"use client";

import { BatteryFull, Signal, Wifi } from "lucide-react";
import type { ReactNode } from "react";
import { useNow } from "@/hooks/useNow";
import { padNumber } from "@/lib/format";

export interface PhoneFrameProps {
  children: ReactNode;
}

/** Hardware-style smartphone shell with a live status bar. */
export function PhoneFrame({ children }: PhoneFrameProps) {
  const now = useNow(10_000);
  const time = now ? `${padNumber(now.getHours())}:${padNumber(now.getMinutes())}` : "--:--";

  return (
    <div className="scheme-dark phone-shell relative mx-auto h-fit w-[260px] shrink-0 self-center rounded-[2.6rem] border border-line-strong bg-gradient-to-b from-zinc-800 to-zinc-950 p-2.5 shadow-[0_0_0_1px_rgb(var(--accent-lime)_/_0.15),0_30px_80px_-20px_rgb(var(--accent-lime)_/_0.35)]">
      <span aria-hidden className="absolute top-24 -left-[3px] h-10 w-[3px] rounded-l bg-zinc-700" />
      <span aria-hidden className="absolute top-36 -left-[3px] h-10 w-[3px] rounded-l bg-zinc-700" />
      <span aria-hidden className="absolute top-28 -right-[3px] h-14 w-[3px] rounded-r bg-zinc-700" />
      <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[2.1rem] bg-black">
        <div className="relative z-20 flex h-9 shrink-0 items-center justify-between px-6 font-tech text-[11px] text-fg-soft">
          <span className="tabular-nums">{time}</span>
          <span aria-hidden className="absolute top-2 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-zinc-950 ring-1 ring-zinc-800" />
          <span className="flex items-center gap-1">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryFull className="h-3.5 w-3.5 text-cyber-lime" />
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden">{children}</div>
        <div className="flex h-5 shrink-0 items-center justify-center">
          <span className="h-1 w-24 rounded-full bg-zinc-600" />
        </div>
      </div>
    </div>
  );
}
