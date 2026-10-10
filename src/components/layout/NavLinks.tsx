import { NAV_LINKS } from "@/config/navigation";
import { cn } from "@/lib/cn";

export interface NavLinksProps {
  activeId: string | null;
  layout: "row" | "stack";
  onNavigate?: () => void;
}

export function NavLinks({ activeId, layout, onNavigate }: NavLinksProps) {
  return (
    <ul className={cn(layout === "row" ? "flex items-center gap-5" : "flex flex-col gap-1")}>
      {NAV_LINKS.map((link, index) => {
        const active = link.id === activeId;
        return (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={onNavigate}
              aria-current={active ? "location" : undefined}
              className={cn(
                "relative font-tech tracking-[0.14em] uppercase transition-colors",
                layout === "row"
                  ? "py-1 text-xs"
                  : "flex items-center justify-between rounded-lg border px-4 py-3 text-sm",
                layout === "row" && (active ? "text-cyber-cyan text-glow-cyan" : "text-zinc-400 hover:text-cyber-cyan"),
                layout === "stack" &&
                  (active
                    ? "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan"
                    : "border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white"),
              )}
            >
              {layout === "stack" && <span className="text-zinc-400">0{index + 2}</span>}
              <span>{link.label}</span>
              {layout === "row" && active && <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full bg-cyber-cyan shadow-[0_0_8px_#00F0FF]" />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
