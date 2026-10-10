import { siteConfig } from "@/config/site";
import { TEAM } from "@/data/team";

/** schema.org description of the studio and its team, for search engines. */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    areaServed: "Worldwide",
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
    knowsAbout: ["Large language models", "Retrieval-augmented generation", "AI agents", "LangGraph", "AI security", "OWASP Top 10 for LLMs"],
    employee: TEAM.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      sameAs: Object.values(member.socials ?? {}).filter(Boolean),
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
