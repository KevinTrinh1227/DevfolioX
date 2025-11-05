// components/sections/About.tsx
import Image from "next/image";
import type { ReactNode } from "react";
import { siteConfig } from "../../config/siteConfig";
import {
  Github,
  Linkedin,
  Code2,
  PenSquare,
  Youtube,
  Mail,
  GraduationCap,
  Send,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const SOCIAL_ICON_MAP: Record<string, ReactNode> = {
  GitHub: <Github className="h-4 w-4" />,
  LinkedIn: <Linkedin className="h-4 w-4" />,
  "Dev.to": <Code2 className="h-4 w-4" />,
  Medium: <PenSquare className="h-4 w-4" />,
  YouTube: <Youtube className="h-4 w-4" />,
  Email: <Mail className="h-4 w-4" />,
  Handshake: <GraduationCap className="h-4 w-4" />,
  Telegram: <Send className="h-4 w-4" />,
  Discord: <MessageCircle className="h-4 w-4" />,
};

export function AboutSection() {
  const about = siteConfig.about;
  const tools = about?.recentTools ?? [];
  const socials = siteConfig.socials ?? {};

  const socialLinks: { label: string; href?: string }[] = [
    { label: "GitHub", href: socials.github },
    { label: "LinkedIn", href: socials.linkedin },
    { label: "Dev.to", href: socials.devto },
    { label: "Medium", href: socials.medium },
    { label: "YouTube", href: socials.youtube },
    { label: "Email", href: socials.email },
    { label: "Handshake", href: socials.handshake },
    { label: "Telegram", href: socials.telegram },
    { label: "Discord", href: socials.discord },
  ].filter((s) => !!s.href);

  return (
    <section id="about" className="py-16 scroll-mt-12">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          {/* Left: text */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              ~/About
            </h2>

            <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
              A quick overview of who I am.
            </h3>

            <div className="mt-5 space-y-3 text-sm text-muted-foreground sm:text-base">
              {about?.intro?.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {tools.length > 0 && (
              <div className="mt-6 text-xs">
                <p className="mb-2 text-[11px] font-medium text-foreground">
                  Some technologies I&apos;ve worked with recently:
                </p>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-muted-foreground"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social links as compact icon buttons */}
            {socialLinks.length > 0 && (
              <div className="mt-6 text-xs">
                <p className="mb-2 text-[11px] font-medium text-foreground">
                  You can also find me here:
                </p>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social) => {
                    const icon = SOCIAL_ICON_MAP[social.label] ?? (
                      <ExternalLink className="h-4 w-4" />
                    );

                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-transparent px-3 py-1.5 text-[11px] text-foreground transition hover:border-accent hover:bg-white/5"
                      >
                        {icon}
                        <span>{social.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: portrait */}
          {about?.avatarUrl && (
            <div className="mx-auto w-52 shrink-0 sm:w-64 md:w-80">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <Image
                  src={about.avatarUrl}
                  alt={siteConfig.name}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
