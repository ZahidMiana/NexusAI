import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { TechItem } from "@/types";

export interface TechBadgeProps {
  item: TechItem;
  selected: boolean;
  onSelect: (item: TechItem) => void;
}

/** Compact technology chip; selecting it explains the tech in the terminal. */
export function TechBadge({ item, selected, onSelect }: TechBadgeProps) {
  const tokens = accentTokens(item.accent);
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-pressed={selected}
      aria-controls="terminal"
      className={cn(
        "group flex items-center gap-2 rounded-lg border bg-inset px-3 py-2 text-left transition-all duration-200 ease-hardware hover:-translate-y-0.5",
        selected ? cn(tokens.border, tokens.glow) : cn("border-line", tokens.hoverBorder),
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", tokens.text)} aria-hidden />
      <span className="font-tech text-xs tracking-[0.08em] text-fg uppercase">{item.name}</span>
    </button>
  );
}
