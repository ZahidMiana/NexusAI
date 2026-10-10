import { Globe, KeyRound, Radio } from "lucide-react";
import type { ReactNode } from "react";
import { BentoCard, BentoLabel } from "@/components/ui/BentoCard";
import { GlitchText } from "@/components/ui/GlitchText";
import { siteConfig } from "@/config/site";
import { CoordinationLog } from "./CoordinationLog";
import { EncryptedMail } from "./EncryptedMail";
import { OpenContactButton } from "./OpenContactButton";
import { SystemSignature } from "./SystemSignature";

export function Footer() {
  return (
    <footer className="relative mx-auto max-w-7xl px-4 pt-24 pb-10 sm:px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <BentoCard accent="pink" className="p-6 xl:col-span-2">
          <FooterBlockTitle icon={<KeyRound className="h-4 w-4" />} index="11.A">
            Encrypted Uplinks
          </FooterBlockTitle>
          <p className="mt-4 font-display text-2xl font-black tracking-wider text-white uppercase">
            Open a <span className="text-cyber-pink text-glow-pink">secure channel</span>
          </p>
          <p className="mt-2 font-mono text-sm text-zinc-400">Hover to decrypt · click to copy to clipboard.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <EncryptedMail label="General uplink" address={siteConfig.contact.email} accent="cyan" />
            <EncryptedMail label="Secure / PGP" address={siteConfig.contact.secureEmail} accent="pink" />
          </div>
          <p className="mt-4 break-all font-mono text-xs text-zinc-400">PGP_FP :: {siteConfig.contact.pgpFingerprint}</p>
          <OpenContactButton className="mt-5" />
        </BentoCard>

        <BentoCard accent="cyan" className="p-6">
          <FooterBlockTitle icon={<Globe className="h-4 w-4" />} index="11.B">
            Global Coordination
          </FooterBlockTitle>
          <div className="mt-5">
            <CoordinationLog />
          </div>
        </BentoCard>

        <BentoCard accent="lime" className="p-6">
          <FooterBlockTitle icon={<Radio className="h-4 w-4" />} index="11.C">
            System Signature
          </FooterBlockTitle>
          <div className="mt-5">
            <SystemSignature />
          </div>
        </BentoCard>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-6 sm:flex-row">
        <span className="font-display text-sm font-black tracking-[0.14em] text-white">
          <GlitchText text={siteConfig.brandMark} />
        </span>
        <span className="font-tech text-xs tracking-[0.14em] text-zinc-400 uppercase">
          End of transmission {"//"} all systems nominal
        </span>
      </div>
    </footer>
  );
}

function FooterBlockTitle({ icon, index, children }: { icon: ReactNode; index: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <BentoLabel index={index}>{children}</BentoLabel>
      <span className="text-zinc-400">{icon}</span>
    </div>
  );
}
