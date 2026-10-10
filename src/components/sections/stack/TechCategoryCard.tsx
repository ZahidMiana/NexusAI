import { BentoCard } from "@/components/ui/BentoCard";
import { accentTokens } from "@/lib/accent";
import { cn } from "@/lib/cn";
import type { TechCategory, TechItem } from "@/types";
import { TechBadge } from "./TechBadge";

export interface TechCategoryCardProps {
  category: TechCategory;
  selectedId: string;
  onSelect: (item: TechItem) => void;
}

export function TechCategoryCard({ category, selectedId, onSelect }: TechCategoryCardProps) {
  const tokens = accentTokens(category.accent);

  return (
    <BentoCard accent={category.accent} className="h-full p-5">
      <header className="mb-5 flex items-center justify-between">
        <h3 className={cn("font-tech text-sm tracking-[0.12em] uppercase", tokens.text, tokens.textGlow)}>[{category.label}]</h3>
        <span className="font-mono text-xs text-fg-muted">{String(category.items.length).padStart(2, "0")} modules</span>
      </header>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
        {category.items.map((item, index) => (
          <TechBadge key={item.id} item={item} selected={item.id === selectedId} floatDelay={index * 0.45} onSelect={onSelect} />
        ))}
      </div>
    </BentoCard>
  );
}
