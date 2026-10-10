"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Plus } from "lucide-react";
import { useState } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useContactLauncher } from "@/context/ContactContext";
import { FAQ_ITEMS } from "@/data/faq";
import { cn } from "@/lib/cn";
import type { FaqItem } from "@/types";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const { openContact } = useContactLauncher();

  return (
    <section id="faq" aria-labelledby="faq-heading" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 md:pt-36">
      <SectionHeading headingId="faq-heading" index="07" eyebrow="FAQ" title="Common Questions" accent="pink" subtitle="Straight answers to what clients ask us most." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <BentoCard accent="pink" scaleOnHover={false} className="divide-y divide-line px-2 sm:px-4">
            {FAQ_ITEMS.map((item) => (
              <FaqRow key={item.id} item={item} open={openId === item.id} onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))} />
            ))}
          </BentoCard>
        </Reveal>
        <Reveal delay={0.1}>
          <BentoCard accent="cyan" className="flex h-full flex-col gap-5 p-6">
            <BentoLabel index="07.B">Still unsure?</BentoLabel>
            <MessageSquare className="h-8 w-8 text-cyber-cyan" />
            <p className="font-display text-xl font-black tracking-wide text-fg uppercase">Ask us anything</p>
            <p className="font-mono text-sm leading-relaxed text-fg-soft">
              Send a short note about your project. A real engineer replies within one business day.
            </p>
            <NeonButton accent="cyan" className="mt-auto w-full" onClick={() => openContact()}>
              Send a question
            </NeonButton>
          </BentoCard>
        </Reveal>
      </div>
    </section>
  );
}

function FaqRow({ item, open, onToggle }: { item: FaqItem; open: boolean; onToggle: () => void }) {
  const panelId = `faq-panel-${item.id}`;
  const buttonId = `faq-button-${item.id}`;

  return (
    <div>
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-2 py-5 text-left"
        >
          <span className="flex gap-3 font-mono text-sm text-fg sm:text-base">
            <span aria-hidden className="text-cyber-pink">{">"}</span>
            {item.question}
          </span>
          <Plus className={cn("h-4 w-4 shrink-0 text-cyber-pink transition-transform duration-300", open && "rotate-45")} />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pr-8 pb-5 pl-7 font-mono text-sm leading-relaxed text-fg-soft">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
