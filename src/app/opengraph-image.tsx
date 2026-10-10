import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { TEAM } from "@/data/team";

export const alt = `${siteConfig.name}: ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SERVICES = ["LLM apps", "RAG pipelines", "AI agents", "AI security"];
const INK = "#111111";

/** Social preview card (LinkedIn, WhatsApp, X) in the neo-brutalist style. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 48, background: "#fff4d6", fontFamily: "sans-serif", color: INK }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 48,
            background: "#ffffff",
            border: `6px solid ${INK}`,
            borderRadius: 12,
            boxShadow: `14px 14px 0 ${INK}`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 34, fontWeight: 900, letterSpacing: 6 }}>{siteConfig.brandMark}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 22, padding: "8px 18px", border: `3px solid ${INK}`, borderRadius: 999, background: "#ffe066" }}>
              <div style={{ width: 12, height: 12, borderRadius: 6, background: "#166534" }} />
              {siteConfig.availability}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 72, fontWeight: 900, lineHeight: 1.05, display: "flex", flexWrap: "wrap", textTransform: "uppercase" }}>
              <span>We Architect&nbsp;</span>
              <span style={{ color: "#1d4ed8" }}>Intelligent&nbsp;</span>
              <span style={{ color: "#be123c" }}>Ecosystems.</span>
            </div>
            <div style={{ fontSize: 28, color: "#1f1f1f" }}>We build production LLM apps, RAG pipelines and AI agents, and we secure them.</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 12 }}>
              {SERVICES.map((service) => (
                <div key={service} style={{ fontSize: 20, padding: "8px 16px", border: `3px solid ${INK}`, borderRadius: 6, background: "#fffaea", boxShadow: `4px 4px 0 ${INK}` }}>
                  {service}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 20, color: "#474747" }}>{TEAM.map((member) => member.name).join(" · ")}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
