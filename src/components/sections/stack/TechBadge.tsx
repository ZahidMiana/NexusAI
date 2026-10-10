import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { TechItem } from "@/types";

export interface TechBadgeProps {
  item: TechItem;
  selected: boolean;
  floatDelay: number;
  onSelect: (item: TechItem) => void;
}

/** A floating icon inside its own neon containment cell. */
export function TechBadge({ item, selected, floatDelay, onSelect }: TechBadgeProps) {
  const tokens = accentTokens(item.accent);
  const Icon = item.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      aria-pressed={selected}
      aria-controls="tech-detail"
      className={cn(
        "group relative flex flex-col items-center gap-3 rounded-xl border bg-inset px-3 pt-5 pb-3 transition-all duration-300 ease-hardware hover:-translate-y-1",
        selected ? cn(tokens.border, tokens.glow) : cn("border-line", tokens.hoverBorder),
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 animate-float items-center justify-center rounded-lg border bg-panel",
          selected ? tokens.border : "border-line",
        )}
        style={{ animationDelay: `${floatDelay}s`, boxShadow: `0 0 18px rgb(${tokens.rgb} / ${selected ? 0.45 : 0.15})` }}
      >
        <Icon className={cn("h-6 w-6", tokens.text)} />
      </span>
      <span className="text-center font-tech text-xs tracking-wider text-fg-soft">{item.name}</span>
      <span className="h-0.5 w-full overflow-hidden rounded-full bg-track">
        <span className={cn("block h-full", tokens.bg)} style={{ width: `${item.proficiency}%` }} />
      </span>
    </button>
  );
}
