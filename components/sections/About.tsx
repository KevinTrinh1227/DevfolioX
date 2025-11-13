// components/sections/About.tsx
"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import { siteConfig } from "../../config/siteConfig";
import {
  Github,
  Linkedin,
  Code2,
  PenSquare,
  Youtube,
  GraduationCap,
  ExternalLink,
  Globe,
  Mail,
} from "lucide-react";
import { Modal } from "../ui/Modal";
import { Tooltip } from "../ui/Tooltip";
import { useModalRoute } from "@/components/hooks/useModalRoute";

const SOCIAL_ICON_MAP: Record<string, ReactNode> = {
  GitHub: <Github className="h-4 w-4" />,
  LinkedIn: <Linkedin className="h-4 w-4" />,
  "Dev.to": <Code2 className="h-4 w-4" />,
  Medium: <PenSquare className="h-4 w-4" />,
  YouTube: <Youtube className="h-4 w-4" />,
  Handshake: <GraduationCap className="h-4 w-4" />,
  Telegram: <GraduationCap className="h-4 w-4" />, // placeholder icon
  Discord: <GraduationCap className="h-4 w-4" />, // placeholder icon
};

export function AboutSection() {
  // URL-synced modals with short flag params: /?about and /?avatar
  const aboutModal = useModalRoute({
    scheme: "flag",
    key: "about",
    scroll: false,
  });

  const avatarModal = useModalRoute({
    scheme: "flag",
    key: "avatar",
    scroll: false,
  });

  const about = siteConfig.about;
  const tools = about?.recentTools ?? [];
  const socials = siteConfig.socials ?? {};

  const socialLinks: { label: string; href?: string }[] = [
    { label: "GitHub", href: socials.github },
    { label: "LinkedIn", href: socials.linkedin },
    { label: "Dev.to", href: socials.devto },
    { label: "Medium", href: socials.medium },
    { label: "YouTube", href: socials.youtube },
    { label: "Handshake", href: socials.handshake },
    { label: "Telegram", href: socials.telegram },
    { label: "Discord", href: socials.discord },
  ].filter((s) => !!s.href);

  const stats = {
    leetTotal: 0,
    leetYear: 0,
    leetMonth: 0,
    commitsYear: 0,
    commitsMonth: 0,
    lastCommit: "N/A",
    openSourcePRs: 0,
    githubRepos: 0,
    githubStars: siteConfig.repo?.stars ?? 0,
    githubForks: siteConfig.repo?.forks ?? 0,
    githubDownloads: siteConfig.repo?.downloads ?? 0,
    githubFollowers: 0,
  };

  const helloLine = "Hello there, my name is ";
  const studentLine = (
    <>
      I&apos;m currently a student at{" "}
      <span className="font-semibold">University of Houston</span> with an
      interest in machine learning, operating systems, full-stack development,
      and building tools that actually help people.
    </>
  );

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

            {/* Short-flag URL trigger: /?about */}
            <a
              href={aboutModal.href}
              onClick={(e) => {
                e.preventDefault();
                aboutModal.open();
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-white/10 sm:text-sm"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>More about me, if you&apos;re curious.</span>
            </a>

            {tools.length > 0 && (
              <div className="mt-4 text-xs sm:text-sm">
                <p className="text-xs font-semibold text-muted-foreground sm:text-sm">
                  Recently Used Technologies
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/10 px-2 py-1 text-xs text-muted-foreground transition-transform transition-colors duration-200 hover:-translate-y-[1px] hover:border-accent/60 hover:bg-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="mt-6 text-xs sm:text-sm">
                <p className="mb-2 text-xs font-semibold text-muted-foreground sm:text-sm">
                  Social Quick Links
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
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-transparent px-3 py-1.5 text-xs text-foreground transition hover:border-accent hover:bg-white/5"
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

          {/* Right: portrait (click opens image modal) */}
          {about?.avatarUrl && (
            <a
              href={avatarModal.href} // => "/?avatar"
              onClick={(e) => {
                e.preventDefault();
                avatarModal.open();
              }}
              className="mx-auto w-full max-w-xs shrink-0 rounded-2xl outline-none sm:max-w-sm md:w-72"
            >
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-transform duration-200 hover:-translate-y-[2px] hover:border-accent/60">
                <Image
                  src={about.avatarUrl}
                  alt={siteConfig.name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </a>
          )}
        </div>
      </div>

      {/* More information modal (URL-synced: /?about) */}
      <Modal
        open={aboutModal.isActive}
        onClose={aboutModal.close}
        title="More Information About Me"
      >
        <div className="space-y-6">
          {/* 1) Info left, portrait right */}
          <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] md:items-start">
            <div className="space-y-4">
              <p className="text-base font-semibold text-foreground sm:text-lg">
                {helloLine}
                <span className="font-semibold">Kevin Trinh</span>.
              </p>
              <p className="text-sm sm:text-base">{studentLine}</p>

              <div className="space-y-3">
                {about?.moreDetails && Array.isArray(about.moreDetails)
                  ? about.moreDetails.map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))
                  : null}
              </div>
            </div>

            {about?.avatarUrl && (
              <div className="flex flex-col items-center gap-2">
                <div className="group w-full max-w-xs overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-transform duration-200 hover:-translate-y-[2px] hover:border-accent/60">
                  <Image
                    src={about.avatarUrl}
                    alt={siteConfig.name}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-center text-xs text-muted-foreground sm:text-sm">
                  Portrait image of me at my favorite coding cafe.
                </p>
              </div>
            )}
          </div>

          {/* 2) Tools */}
          {tools.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-foreground sm:text-base">
                Tools I&apos;ve Recently Used
              </p>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-muted-foreground transition-transform transition-colors duration-200 hover:-translate-y-[1px] hover:border-accent/70 hover:bg-white/10 hover:text-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3) What I'm working on */}
          <div>
            <p className="text-sm font-semibold text-foreground sm:text-base">
              What I&apos;m Currently Working On
            </p>
            <p className="mt-2 text-sm sm:text-base">
              I&apos;m focused on building tools that help students understand
              their degree plans and experiment with AI-assisted schedule
              planning. I&apos;m always open to{" "}
              <span className="font-semibold">
                internships, co-ops, early-career roles, and open source
                collaborations
              </span>
              .
            </p>
          </div>

          {/* 4) Featured projects */}
          {/* … (unchanged) … */}

          {/* 5) Dev stats */}
          {/* … (unchanged) … */}

          {/* 6) Socials & useful links */}
          {(socialLinks.length > 0 || socials.email) && (
            <div>
              <p className="mb-2 text-sm font-semibold text-foreground sm:text-base">
                Socials &amp; Useful Links
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
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-transparent px-3.5 py-2 text-sm text-foreground transition hover:border-accent hover:bg-white/5"
                    >
                      {icon}
                      <span>{social.label}</span>
                    </a>
                  );
                })}

                {socials.email && (
                  <a
                    href={`mailto:${socials.email}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-transparent px-3.5 py-2 text-sm text-foreground transition hover:border-accent hover:bg-white/5"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </a>
                )}

                {/* Pretty link to Resume modal (handled elsewhere) */}
                <a
                  href="/resume"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-transparent px-3.5 py-2 text-sm text-foreground transition hover:border-accent hover:bg-white/5"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Avatar image-only modal (URL-synced: /?avatar) */}
      {about?.avatarUrl && (
        <Modal
          open={avatarModal.isActive}
          onClose={avatarModal.close}
          title="Portrait"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <Image
                src={about.avatarUrl}
                alt={siteConfig.name}
                width={800}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground sm:text-sm">
              Portrait image of me at my favorite coding cafe.
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
}
