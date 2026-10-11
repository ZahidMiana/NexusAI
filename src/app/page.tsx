import { Footer } from "@/components/layout/Footer";
import { GridBackground } from "@/components/layout/GridBackground";
import { Navbar } from "@/components/layout/Navbar";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { AppProviders } from "@/components/providers/AppProviders";
import { StructuredData } from "@/components/seo/StructuredData";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { FaqSection } from "@/components/sections/faq/FaqSection";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { ProofSection } from "@/components/sections/proof/ProofSection";
import { ServicesSection } from "@/components/sections/services/ServicesSection";
import { TechStackSection } from "@/components/sections/stack/TechStackSection";
import { TeamSection } from "@/components/sections/team/TeamSection";
import { CaseStudiesSection } from "@/components/sections/work/CaseStudiesSection";

export default function HomePage() {
  return (
    <AppProviders>
      <StructuredData />
      <GridBackground />
      <Navbar />
      <main>
        <HeroSection />
        <CaseStudiesSection />
        <ProofSection />
        <TeamSection />
        <ServicesSection />
        <TechStackSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileCta />
      <WhatsAppWidget />
      <ChatWidget />
    </AppProviders>
  );
}
