"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { Accent } from "@/types";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  accent?: Accent;
  ariaLabel: string;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  accent = "cyan",
  ariaLabel,
  className,
}: SegmentedControlProps<T>) {
  const layoutId = useId();
  const tokens = accentTokens(accent);

  return (
    <div role="tablist" aria-label={ariaLabel} className={cn("inline-flex rounded-lg border border-zinc-800 bg-black/50 p-1", className)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative rounded-md px-3 py-1.5 font-tech text-xs tracking-[0.12em] uppercase transition-colors duration-300",
              selected ? tokens.text : "text-zinc-400 hover:text-zinc-200",
            )}
          >
            {selected && (
              <motion.span
                layoutId={layoutId}
                className={cn("absolute inset-0 rounded-md border", tokens.borderSoft, tokens.bgSoft)}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
