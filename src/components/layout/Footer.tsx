import { Globe, Mail, MapPin } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { NAV_LINKS } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { TEAM } from "@/data/team";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { BookCallButton } from "./BookCallButton";
import { CopyEmailButton } from "./CopyEmailButton";

const SOCIAL_ICONS = {
  github: <BrandIcon brand="github" className="h-4 w-4" />,
  linkedin: <BrandIcon brand="linkedin" className="h-4 w-4" />,
  website: <Globe className="h-4 w-4" aria-hidden />,
} as const;

const SOCIAL_LABELS = { github: "GitHub", linkedin: "LinkedIn", website: "website" } as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 md:pt-36 md:pb-10">
      <div className="bento grid gap-10 rounded-2xl border border-line bg-panel p-6 sm:p-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="font-display text-lg font-black tracking-[0.2em] text-fg">{siteConfig.brandMark}</p>
          <p className="max-w-sm font-mono text-sm leading-relaxed text-fg-soft">{siteConfig.description}</p>
          <AvailabilityBadge />
        </div>

        <div className="space-y-4">
          <h2 className="font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">Contact</h2>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-cyber-cyan" aria-hidden />
            <a href={`mailto:${siteConfig.contact.email}`} className="truncate font-mono text-sm text-fg underline-offset-4 hover:underline">
              {siteConfig.contact.email}
            </a>
            <CopyEmailButton />
          </div>
          <p className="flex items-center gap-2 font-mono text-sm text-fg-soft">
            <MapPin className="h-4 w-4 shrink-0 text-cyber-cyan" aria-hidden />
            {siteConfig.location.city} · {siteConfig.location.utcOffset}
          </p>
          <p className="font-mono text-sm text-fg-muted">{siteConfig.responseTime}.</p>
          <BookCallButton accent="pink" variant="solid" />
        </div>

        <div className="space-y-4">
          <h2 className="font-tech text-xs tracking-[0.14em] text-fg-muted uppercase">Team</h2>
          <ul className="space-y-3">
            {TEAM.map((member) => (
              <li key={member.id} className="flex items-center justify-between gap-3">
                <span>
                  <span className="block font-mono text-sm text-fg">{member.name}</span>
                  <span className="block font-mono text-xs text-fg-muted">{member.role}</span>
                </span>
                <span className="flex gap-1.5">
                  {(Object.entries(member.socials ?? {}) as [keyof typeof SOCIAL_ICONS, string | undefined][])
                    .filter(([, url]) => Boolean(url))
                    .map(([kind, url]) => (
                      <a
                        key={kind}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} on ${SOCIAL_LABELS[kind]}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                      >
                        {SOCIAL_ICONS[kind]}
                      </a>
                    ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="font-tech text-xs tracking-[0.12em] text-fg-muted uppercase transition-colors hover:text-fg">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-mono text-xs text-fg-muted">
          © {year} {siteConfig.name}. Built in {siteConfig.location.city.split(",")[0]}.
        </p>
      </div>
    </footer>
  );
}
