"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Cloud, Square, Zap, type LucideIcon } from "lucide-react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { usePreferences } from "@/hooks/usePreferences";
import { cn } from "@/lib/cn";
import { preferenceStore } from "@/lib/preferences/store";
import { DESIGN_STYLES, DESIGN_STYLE_IDS, type DesignStyleId } from "@/lib/preferences/themes";

export const STYLE_ICONS: Record<DesignStyleId, LucideIcon> = { clay: Cloud, cyber: Zap, brutal: Square };

/**
 * Navbar button showing the active design style; opens a small menu of all
 * styles. Follows the WAI-ARIA menu-button pattern (menuitemradio items,
 * arrow keys, Escape returns focus to the button).
 */
export function StyleMenu() {
  const { style } = usePreferences();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();
  const ActiveIcon = STYLE_ICONS[style];
  const activeIndex = DESIGN_STYLE_IDS.indexOf(style);

  useEffect(() => {
    if (!open) return;
    itemRefs.current[activeIndex]?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
    // Focus the checked item only when the menu opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const choose = (id: DesignStyleId) => {
    preferenceStore.setStyle(id);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onItemKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = DESIGN_STYLE_IDS.length;
    const moves: Record<string, number> = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: count - 1 };
    if (event.key in moves) {
      event.preventDefault();
      itemRefs.current[(moves[event.key] + count) % count]?.focus();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            setOpen(true);
          }
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`Design style: ${DESIGN_STYLES[style].label}. Change style`}
        className="style-trigger flex h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 font-tech text-xs tracking-[0.12em] text-fg uppercase transition-colors hover:border-line-strong"
      >
        <ActiveIcon className="h-4 w-4 text-cyber-cyan" aria-hidden />
        <span className="hidden sm:inline">{DESIGN_STYLES[style].label}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 text-fg-muted transition-transform duration-200", open && "rotate-180")} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Design styles"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="popover-panel absolute top-full right-0 z-50 mt-2 w-72 origin-top-right rounded-xl border border-line bg-panel p-1.5 shadow-[0_20px_50px_rgb(0_0_0_/_0.35)]"
          >
            <p className="px-3 pt-2 pb-1.5 font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">Design style</p>
            {DESIGN_STYLE_IDS.map((id, index) => {
              const Icon = STYLE_ICONS[id];
              const checked = id === style;
              return (
                <button
                  key={id}
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={checked}
                  onClick={() => choose(id)}
                  onKeyDown={(event) => onItemKeyDown(event, index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors focus-visible:bg-cyber-cyan/10 hover:bg-cyber-cyan/10",
                    checked && "bg-cyber-cyan/10",
                  )}
                >
                  <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-md border", checked ? "border-cyber-cyan text-cyber-cyan" : "border-line text-fg-muted")}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-sm font-bold text-fg">{DESIGN_STYLES[id].label}</span>
                    <span className="block truncate font-mono text-xs text-fg-muted">{DESIGN_STYLES[id].description}</span>
                  </span>
                  {checked && <Check className="h-4 w-4 shrink-0 text-cyber-lime" aria-hidden />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
