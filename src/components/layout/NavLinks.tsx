import { NAV_LINKS } from "@/config/navigation";
import { cn } from "@/lib/cn";

export interface NavLinksProps {
  activeId: string | null;
  layout: "row" | "grid";
  onNavigate?: () => void;
}

export function NavLinks({ activeId, layout, onNavigate }: NavLinksProps) {
  const links = layout === "row" ? NAV_LINKS.filter((link) => link.primary) : NAV_LINKS;

  return (
    <ul className={cn(layout === "row" ? "flex items-center gap-5" : "grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3")}>
      {links.map((link) => {
        const active = link.id === activeId;
        return (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={onNavigate}
              aria-current={active ? "location" : undefined}
              className={cn(
                "relative font-tech tracking-[0.14em] uppercase transition-colors",
                layout === "row" && cn("py-1 text-xs", active ? "text-cyber-cyan text-glow-cyan" : "text-zinc-400 hover:text-cyber-cyan"),
                layout === "grid" &&
                  cn(
                    "flex items-center justify-between rounded-lg border px-4 py-3 text-sm",
                    active ? "border-cyber-cyan/50 bg-cyber-cyan/10 text-cyber-cyan" : "border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white",
                  ),
              )}
            >
              {layout === "grid" && <span className="text-zinc-400">{link.code}</span>}
              <span>{link.label}</span>
              {layout === "row" && active && <span aria-hidden className="absolute -bottom-1 left-0 h-px w-full bg-cyber-cyan shadow-[0_0_8px_#00F0FF]" />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
