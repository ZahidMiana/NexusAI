import { Footer } from "@/components/layout/Footer";
import { GridBackground } from "@/components/layout/GridBackground";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { TechStackSection } from "@/components/sections/stack/TechStackSection";
import { TeamSection } from "@/components/sections/team/TeamSection";
import { TerminalSection } from "@/components/sections/terminal/TerminalSection";
import { TerminalProvider } from "@/context/TerminalContext";

export default function HomePage() {
  return (
    <TerminalProvider>
      <GridBackground />
      <Navbar />
      <main>
        <HeroSection />
        <TeamSection />
        <TerminalSection />
        <TechStackSection />
      </main>
      <Footer />
    </TerminalProvider>
  );
}
