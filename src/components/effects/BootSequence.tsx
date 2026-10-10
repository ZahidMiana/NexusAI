"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";

const BOOT_LINES = ["Mounting neural mesh", "Linking 3 operators", "Warming inference fabric"] as const;

function finishBoot(): void {
  document.documentElement.dataset.boot = "done";
}

/**
 * First-visit boot intro. Visibility and timing are pure CSS (driven by
 * <html data-boot>, set before paint), so it can never trap the page even if
 * JavaScript fails. JS only adds "any key / click to skip".
 */
export function BootSequence() {
  useEffect(() => {
    if (document.documentElement.dataset.boot === "done") return;
    const timer = window.setTimeout(finishBoot, 2400);
    window.addEventListener("keydown", finishBoot, { once: true });
    window.addEventListener("pointerdown", finishBoot, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", finishBoot);
      window.removeEventListener("pointerdown", finishBoot);
    };
  }, []);

  return (
    <div aria-hidden className="boot-overlay fixed inset-0 z-[100] flex items-center justify-center bg-void px-6">
      <div className="w-full max-w-sm space-y-6">
        <p className="font-display text-2xl font-black tracking-[0.2em] text-fg">
          {siteConfig.brandMark.replace(" //", "")}
          <span className="text-cyber-pink"> {"//"}</span>
        </p>
        <ul className="space-y-1.5 font-mono text-sm">
          {BOOT_LINES.map((line, index) => (
            <li key={line} className="boot-line flex justify-between text-fg-soft" style={{ animationDelay: `${0.15 + index * 0.3}s` }}>
              <span>{line}</span>
              <span className="text-cyber-lime">[ OK ]</span>
            </li>
          ))}
        </ul>
        <div className="boot-bar h-1 overflow-hidden rounded-full bg-track">
          <span className="block h-full bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-lime" />
        </div>
        <p className="font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">Press any key to skip</p>
      </div>
    </div>
  );
}
