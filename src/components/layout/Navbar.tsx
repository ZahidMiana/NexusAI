"use client";

import { Menu, SquareTerminal } from "lucide-react";
import { NAV_SECTION_IDS } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useCommandPalette } from "@/context/CommandPaletteContext";
import { useTerminalLauncher } from "@/context/TerminalContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import { NavLinks } from "./NavLinks";
import { AvailabilityBadge } from "./AvailabilityBadge";

export function Navbar() {
  const { openTerminal } = useTerminalLauncher();
  const { open, openPalette } = useCommandPalette();
  const activeId = useActiveSection(NAV_SECTION_IDS);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 rounded-full border-2 border-[var(--nav-line)] bg-[var(--nav-bg)] px-5 shadow-[var(--shadow-nav)] backdrop-blur-xl sm:px-7"
      >
        <a href="#top" className="shrink-0 font-display text-sm font-black tracking-[0.2em] whitespace-nowrap text-fg sm:text-base" aria-label={`${siteConfig.brandMark} home`}>
          {siteConfig.brandMark}
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          <AvailabilityBadge className="xl:hidden 2xl:inline-flex" />
          <span aria-hidden className="hidden h-5 w-px bg-line-strong xl:block" />
          <div className="hidden xl:block">
            <NavLinks activeId={activeId} layout="row" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openTerminal()}
            className="group flex items-center gap-2 rounded-full border border-cyber-cyan/40 bg-cyber-cyan/5 px-3 py-1.5 font-tech text-xs tracking-[0.14em] text-cyber-cyan uppercase transition-all duration-300 ease-hardware hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:glow-cyan"
            aria-label="Open live AI terminal"
          >
            <SquareTerminal className="h-4 w-4 transition-transform group-hover:rotate-6" />
            <span className="hidden sm:inline">Terminal</span>
          </button>

          <button
            type="button"
            onClick={openPalette}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-label="Open menu and command palette ⌘K"
            className="flex h-9 items-center gap-2 rounded-full border border-line-strong px-3 text-fg-soft transition-colors hover:border-cyber-pink/70 hover:text-cyber-pink"
          >
            <Menu className="h-4 w-4" />
            <kbd className="hidden font-tech text-xs text-fg-muted lg:inline">⌘K</kbd>
          </button>
        </div>
      </nav>
    </header>
  );
}
