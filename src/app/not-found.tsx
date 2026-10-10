import Link from "next/link";
import { GridBackground } from "@/components/layout/GridBackground";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <GridBackground />
      <p className="font-tech text-xs tracking-[0.14em] text-cyber-pink uppercase">ERR::404 // sector not found</p>
      <h1 className="font-display text-5xl font-black text-fg">SIGNAL LOST</h1>
      <Link
        href="/"
        className="rounded-lg border border-cyber-cyan/50 px-5 py-2 font-tech text-xs tracking-[0.14em] text-cyber-cyan uppercase transition-all hover:glow-cyan"
      >
        Return to core
      </Link>
    </main>
  );
}
