import type { Metadata, Viewport } from "next";
import { Archivo_Black, JetBrains_Mono, Space_Grotesk, Space_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { siteConfig } from "@/config/site";
import Script from "next/script";
import { preferenceBootScript } from "@/lib/preferences/effects";
import "./globals.css";
import "./design-styles.css";

const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-jetbrains", display: "swap", preload: false });
// Brutal design fonts load eagerly; the terminal font is only needed further down the page.
const archivo = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-archivo", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-grotesk", display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono", display: "swap" });

const FONT_VARIABLES = [jetbrains, archivo, grotesk, spaceMono].map((font) => font.variable).join(" ");

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · AI engineering & AI security studio`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["AI engineering", "LLM applications", "RAG pipelines", "AI agents", "LangGraph", "AI security", "LLM red teaming", "OWASP LLM Top 10", "Lahore"],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff4d6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The preference script sets data-fx before hydration, hence suppressHydrationWarning.
    <html lang="en" suppressHydrationWarning className={FONT_VARIABLES}>
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
