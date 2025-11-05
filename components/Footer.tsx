// components/Footer.tsx
import type { ReactNode } from "react";
import { siteConfig } from "../config/siteConfig";
import {
  LayoutTemplate,
  Heart,
  Github,
  Linkedin,
  Code2,
  PenSquare,
  Youtube,
  Mail,
  Send,
  MessageCircle,
  GraduationCap,
  FileDown,
} from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const repo = (siteConfig as any).repo ?? {};
  const socials = siteConfig.socials ?? {};

  const socialLinks = [
    socials.github && {
      label: "GitHub",
      href: socials.github,
      icon: <Github className="h-4 w-4" />,
    },
    socials.linkedin && {
      label: "LinkedIn",
      href: socials.linkedin,
      icon: <Linkedin className="h-4 w-4" />,
    },
    socials.devto && {
      label: "Dev.to",
      href: socials.devto,
      icon: <Code2 className="h-4 w-4" />,
    },
    socials.medium && {
      label: "Medium",
      href: socials.medium,
      icon: <PenSquare className="h-4 w-4" />,
    },
    socials.youtube && {
      label: "YouTube",
      href: socials.youtube,
      icon: <Youtube className="h-4 w-4" />,
    },
    socials.email && {
      label: "Email",
      href: socials.email,
      icon: <Mail className="h-4 w-4" />,
    },
    socials.telegram && {
      label: "Telegram",
      href: socials.telegram,
      icon: <Send className="h-4 w-4" />,
    },
    socials.discord && {
      label: "Discord",
      href: socials.discord,
      icon: <MessageCircle className="h-4 w-4" />,
    },
    socials.handshake && {
      label: "Handshake",
      href: socials.handshake,
      icon: <GraduationCap className="h-4 w-4" />,
    },
  ].filter(Boolean) as { label: string; href: string; icon: ReactNode }[];

  return (
    <footer className="mt-16 border-t border-white/15 bg-background/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:text-base">
        {/* Left: site + repo info */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <LayoutTemplate className="h-6 w-6 text-accent" />
            <span className="text-lg font-semibold text-accent sm:text-xl">
              kevintrinh.dev
            </span>
          </div>

          <div className="space-y-2 text-sm sm:text-base">
            {repo.lastUpdated && (
              <p className="text-muted-foreground">
                Portfolio last updated: {repo.lastUpdated}
              </p>
            )}

            <p className="text-muted-foreground">
              Quick links to more of my work and profiles:
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-1 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-foreground transition hover:border-accent hover:bg-white/5 hover:text-accent"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: actions + text */}
        <div className="flex flex-col items-center gap-3 text-center sm:items-end sm:text-right">
          <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
            {/* My Resume button */}
            <a
              href="#resume"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-accent hover:bg-white/5 hover:text-foreground sm:text-sm"
            >
              <FileDown className="h-4 w-4" />
              <span>My Resume</span>
            </a>

            {/* Sponsor button (same style) */}
            {siteConfig.sponsor?.enabled && siteConfig.sponsor.url && (
              <a
                href={siteConfig.sponsor.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-accent hover:bg-white/5 hover:text-foreground sm:text-sm"
              >
                <Heart className="h-4 w-4" />
                <span>Sponsor me</span>
              </a>
            )}
          </div>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Want to collaborate or contribute? Visit my GitHub!
          </p>

          <p className="text-xs text-muted-foreground sm:text-sm">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
