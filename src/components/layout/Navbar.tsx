"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, SquareTerminal, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { GlitchText } from "@/components/ui/GlitchText";
import { NAV_SECTION_IDS } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { useTerminalLauncher } from "@/context/TerminalContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useHotkey } from "@/hooks/useHotkey";
import { NavLinks } from "./NavLinks";
import { TelemetryReadout } from "./TelemetryReadout";

const MOBILE_MENU_ID = "mobile-menu";

export function Navbar() {
  const { openTerminal } = useTerminalLauncher();
  const activeId = useActiveSection(NAV_SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useHotkey("k", () => openTerminal());

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const launchTerminal = () => {
    closeMenu();
    openTerminal();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/50 px-4 shadow-[0_8px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-5"
      >
        <a href="#top" onClick={closeMenu} className="font-display text-sm font-black tracking-[0.12em] text-white sm:text-base" aria-label="NexusAI home">
          <GlitchText text={siteConfig.brandMark} />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <TelemetryReadout />
          <span aria-hidden className="hidden h-5 w-px bg-zinc-800 xl:block" />
          <div className="hidden xl:block">
            <NavLinks activeId={activeId} layout="row" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={launchTerminal}
            className="group flex items-center gap-2 rounded-lg border border-cyber-cyan/40 bg-cyber-cyan/5 px-3 py-1.5 font-tech text-xs tracking-[0.14em] text-cyber-cyan uppercase transition-all duration-300 ease-hardware hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:glow-cyan"
            aria-label="Open live AI terminal (Ctrl+K)"
          >
            <SquareTerminal className="h-4 w-4 drop-glow-cyan transition-transform group-hover:rotate-6" />
            <span className="hidden sm:inline">Terminal</span>
            <kbd className="hidden rounded border border-cyber-cyan/30 px-1.5 text-xs text-cyber-cyan/80 lg:inline">⌘K</kbd>
          </button>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            title="All sectors"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 text-zinc-200 transition-colors hover:border-cyber-pink/70 hover:text-cyber-pink"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id={MOBILE_MENU_ID}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/10 bg-black/85 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          >
            <NavLinks activeId={activeId} layout="grid" onNavigate={closeMenu} />
            <div className="mt-4 border-t border-zinc-800 pt-4 md:hidden">
              <TelemetryReadout layout="stack" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
