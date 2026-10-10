"use client";

import { Check, CornerDownLeft, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AvailabilityBadge } from "@/components/layout/AvailabilityBadge";
import { useCommandPalette } from "@/context/CommandPaletteContext";
import { useCanHover } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";
import { GROUP_ORDER, matchesQuery, usePaletteItems, type PaletteItem } from "./usePaletteItems";

const LISTBOX_ID = "command-palette-list";

/** ⌘K command palette on a native <dialog> (focus trap + Escape for free). */
export function CommandPalette() {
  const { open, session, closePalette } = useCommandPalette();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const canHover = useCanHover();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      // showModal() focuses the [autofocus] element. Desktop gets the search box for instant typing;
      // touch devices get the close button so the on-screen keyboard does not cover the menu.
      dialog.querySelectorAll("[autofocus]").forEach((element) => element.removeAttribute("autofocus"));
      dialog.querySelector(canHover ? "[data-palette-search]" : "[data-palette-close]")?.setAttribute("autofocus", "");
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
  }, [open, canHover]);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onClose={closePalette}
      onClick={(event) => {
        if (event.target === dialogRef.current) closePalette();
      }}
      className="neon-dialog mx-auto mt-[10vh] mb-auto w-[min(40rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-line-strong bg-panel p-0 text-fg-soft shadow-[0_0_80px_rgb(var(--accent-cyan)_/_0.18)]"
    >
      {open && <PaletteBody key={session} onClose={closePalette} />}
    </dialog>
  );
}

function PaletteBody({ onClose }: { onClose: () => void }) {
  const items = usePaletteItems();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(
    () => GROUP_ORDER.flatMap((group) => items.filter((item) => item.group === group && matchesQuery(item, query))),
    [items, query],
  );
  const safeIndex = Math.min(activeIndex, Math.max(0, filtered.length - 1));
  const activeItem = filtered[safeIndex];

  useEffect(() => {
    if (!activeItem) return;
    listRef.current?.querySelector(`#${optionId(activeItem)}`)?.scrollIntoView({ block: "nearest" });
  }, [activeItem]);

  const run = (item: PaletteItem) => {
    onClose();
    // Let the dialog release its scroll lock before actions that scroll the page.
    window.requestAnimationFrame(() => item.run());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (filtered.length === 0) return;
    const moves: Record<string, () => number> = {
      ArrowDown: () => (safeIndex + 1) % filtered.length,
      ArrowUp: () => (safeIndex - 1 + filtered.length) % filtered.length,
      Home: () => 0,
      End: () => filtered.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      setActiveIndex(moves[event.key]());
    } else if (event.key === "Enter" && activeItem) {
      event.preventDefault();
      run(activeItem);
    }
  };

  return (
    <div className="flex max-h-[75dvh] flex-col">
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="h-4 w-4 shrink-0 text-cyber-cyan" />
        <input
          data-palette-search
          role="combobox"
          aria-expanded="true"
          aria-controls={LISTBOX_ID}
          aria-activedescendant={activeItem ? optionId(activeItem) : undefined}
          aria-autocomplete="list"
          aria-label="Search sections and actions"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search sections, actions, themes…"
          className="h-14 min-w-0 flex-1 bg-transparent font-mono text-sm text-fg outline-none placeholder:text-fg-muted"
        />
        <button
          type="button"
          data-palette-close
          onClick={onClose}
          className="rounded border border-line-strong px-2 py-1 font-tech text-xs text-fg-muted transition-colors hover:text-fg"
        >
          ESC
        </button>
      </div>

      <ul ref={listRef} id={LISTBOX_ID} role="listbox" aria-label="Results" className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 && (
          <li className="px-3 py-10 text-center font-mono text-sm text-fg-muted">No matches. Try another word, or /help in the terminal.</li>
        )}
        {filtered.map((item, index) => {
          const header = index === 0 || filtered[index - 1].group !== item.group ? item.group : null;
          const active = index === safeIndex;
          return (
            <li key={item.id} role="presentation">
              {header && <p className="px-3 pt-3 pb-1.5 font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">{header}</p>}
              <div
                id={optionId(item)}
                role="option"
                aria-selected={active}
                onMouseMove={() => setActiveIndex(index)}
                onClick={() => run(item)}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                  active ? "bg-cyber-cyan/10 text-fg" : "text-fg-soft",
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-cyber-cyan" : "text-fg-muted")} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-mono text-sm">{item.label}</span>
                  {item.hint && <span className="block truncate font-mono text-xs text-fg-muted">{item.hint}</span>}
                </span>
                {item.selected && <Check className="h-4 w-4 shrink-0 text-cyber-lime" aria-label="Current" />}
                {active && <CornerDownLeft className="hidden h-3.5 w-3.5 shrink-0 text-fg-muted sm:block" aria-hidden />}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3">
        <AvailabilityBadge className="lg:hidden" />
        <p className="hidden font-mono text-xs text-fg-muted md:block">
          <kbd className="text-fg-soft">↑↓</kbd> move · <kbd className="text-fg-soft">↵</kbd> select · <kbd className="text-fg-soft">esc</kbd> close
        </p>
        <p className="hidden font-tech text-xs tracking-[0.12em] text-fg-muted uppercase md:block">⌘K anywhere</p>
      </div>
    </div>
  );
}

function optionId(item: PaletteItem): string {
  return `palette-option-${item.id}`;
}
