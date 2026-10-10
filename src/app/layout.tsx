import type { Metadata, Viewport } from "next";
import { Archivo_Black, JetBrains_Mono, Nunito, Share_Tech_Mono, Space_Grotesk, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { siteConfig } from "@/config/site";
import Script from "next/script";
import { DEFAULT_STYLE, preferenceBootScript } from "@/lib/preferences/styles";
import "./globals.css";
import "./design-styles.css";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jetbrains", display: "swap", preload: false });
const shareTech = Share_Tech_Mono({ subsets: ["latin"], weight: "400", variable: "--font-share-tech", display: "swap", preload: false });
// Clay (default) fonts load eagerly; Brutal fonts load only when that style is used.
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "800", "900"], variable: "--font-nunito", display: "swap" });
const archivo = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-archivo", display: "swap", preload: false });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-grotesk", display: "swap", preload: false });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono", display: "swap", preload: false });

const FONT_VARIABLES = [jetbrains, shareTech, nunito, archivo, grotesk, spaceMono].map((font) => font.variable).join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: ["AI engineering agency", "LLM deployment", "agentic AI", "on-device AI", "MLOps", "Next.js"],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ece7f8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The preference script sets data-style/data-fx before hydration, hence suppressHydrationWarning.
    <html lang="en" data-style={DEFAULT_STYLE} suppressHydrationWarning className={FONT_VARIABLES}>
      <body className="min-h-screen overflow-x-hidden">
        {/* beforeInteractive: injected by Next outside React hydration, runs before paint. */}
        <Script id="nexus-preferences" strategy="beforeInteractive">
          {preferenceBootScript()}
        </Script>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
