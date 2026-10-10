import type { CSSProperties } from "react";
import { HeroHeadline } from "./HeroHeadline";
import { HeroStats } from "./HeroStats";
import { NeuralTopology } from "./NeuralTopology";

/** Stagger for the CSS entrance animation (see .hero-rise in globals.css). */
const rise = (delay: number) => ({ "--rise-delay": `${delay}s` }) as CSSProperties;

/**
 * Hero entrance uses a pure CSS animation that starts on first paint, so it
 * looks like the original fade-in without waiting for JavaScript (keeps the
 * headline's Largest Contentful Paint fast).
 */
export function HeroSection() {
  return (
    <section id="top" aria-label="Introduction" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 pt-28 sm:px-6 sm:pt-32">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="hero-rise md:col-span-2 lg:col-span-2 xl:col-span-2" style={rise(0)}>
          <HeroHeadline />
        </div>
        <div className="hero-rise md:col-span-2 lg:col-span-1 xl:col-span-2" style={rise(0.1)}>
          <NeuralTopology />
        </div>
      </div>
      <div className="hero-rise mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4" style={rise(0.2)}>
        <HeroStats />
      </div>
    </section>
  );
}
