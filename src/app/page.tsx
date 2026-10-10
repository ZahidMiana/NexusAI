import { Footer } from "@/components/layout/Footer";
import { GridBackground } from "@/components/layout/GridBackground";
import { Navbar } from "@/components/layout/Navbar";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { AppProviders } from "@/components/providers/AppProviders";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { ProcessSection } from "@/components/sections/process/ProcessSection";
import { ProofSection } from "@/components/sections/proof/ProofSection";
import { ServicesSection } from "@/components/sections/services/ServicesSection";
import { TechStackSection } from "@/components/sections/stack/TechStackSection";
import { TeamSection } from "@/components/sections/team/TeamSection";
import { TerminalSection } from "@/components/sections/terminal/TerminalSection";
import { CaseStudiesSection } from "@/components/sections/work/CaseStudiesSection";

export default function HomePage() {
  return (
    <AppProviders>
      <GridBackground />
      <Navbar />
      <main>
        <HeroSection />
        <CaseStudiesSection />
        <ProofSection />
        <TeamSection />
        <ProcessSection />
        <ServicesSection />
        <TerminalSection />
        <TechStackSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCta />
    </AppProviders>
  );
}
