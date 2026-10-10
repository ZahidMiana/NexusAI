"use client";

import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
  className?: string;
}

/**
 * Thin wrapper over the native <dialog>: the browser provides focus trapping,
 * Escape-to-close and an inert background. Clicking the backdrop also closes.
 */
export function Dialog({ open, onClose, labelledBy, children, className }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className={cn(
        "neon-dialog m-auto max-h-[90dvh] w-[min(56rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-zinc-800 bg-panel p-0 text-zinc-200 shadow-[0_0_80px_rgba(0,240,255,0.15)]",
        className,
      )}
    >
      {open && (
        <div className="relative max-h-[90dvh] overflow-y-auto">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-black/60 text-zinc-300 transition-colors hover:border-cyber-pink hover:text-cyber-pink"
          >
            <X className="h-4 w-4" />
          </button>
          {children}
        </div>
      )}
    </dialog>
  );
}
