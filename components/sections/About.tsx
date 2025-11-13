// components/sections/About.tsx
"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { siteConfig } from "../../config/siteConfig";
import {
  Github,
  Linkedin,
  Code2,
  PenSquare,
  Youtube,
  GraduationCap,
  ExternalLink,
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";
import { Modal } from "../ui/Modal";
import { useModalRoute } from "@/components/hooks/useModalRoute";

/** Map label/icon keys from JSON -> lucide icons */
const SOCIAL_ICON_MAP: Record<string, ReactNode> = {
  GitHub: <Github className="h-4 w-4" />,
  Github: <Github className="h-4 w-4" />,
  LinkedIn: <Linkedin className="h-4 w-4" />,
  Linkedin: <Linkedin className="h-4 w-4" />,
  "Dev.to": <Code2 className="h-4 w-4" />,
  Devto: <Code2 className="h-4 w-4" />,
  Medium: <PenSquare className="h-4 w-4" />,
  YouTube: <Youtube className="h-4 w-4" />,
  Handshake: <GraduationCap className="h-4 w-4" />,
  Telegram: <Send className="h-4 w-4" />,
  Discord: <MessageCircle className="h-4 w-4" />,
  Mail: <Mail className="h-4 w-4" />,
};

type SocialItem = {
  key?: string;
  label: string;
  href?: string; // can be "copy:VALUE" to trigger clipboard
  icon?: string;
  detail?: string;
  showIn?: { footer?: boolean; about?: boolean; contact?: boolean };
};

/** Build the socials that should show in the About section */
function getAboutSocials(): SocialItem[] {
  // Preferred: socialsList[] with showIn.about === true
  const list = (siteConfig as any).socialsList as SocialItem[] | undefined;

  if (Array.isArray(list) && list.length) {
    return list
      .filter((s) => s?.href && s?.showIn?.about)
      .map((s) => ({
        key: s.key,
        label: s.label,
        href: s.href,
        icon: s.icon,
        detail: s.detail,
        showIn: s.showIn,
      }));
  }

  // Fallback: legacy socials object
  const legacy = siteConfig.socials ?? {};
  const fallback: SocialItem[] = [
    legacy.github && { label: "GitHub", href: legacy.github, icon: "Github" },
    legacy.linkedin && {
      label: "LinkedIn",
      href: legacy.linkedin,
      icon: "Linkedin",
    },
    legacy.devto && { label: "Dev.to", href: legacy.devto, icon: "Code2" },
    legacy.medium && {
      label: "Medium",
      href: legacy.medium,
      icon: "PenSquare",
    },
    legacy.youtube && {
      label: "YouTube",
      href: legacy.youtube,
      icon: "Youtube",
    },
    legacy.handshake && {
      label: "Handshake",
      href: legacy.handshake,
      icon: "GraduationCap",
    },
    legacy.telegram && {
      label: "Telegram",
      href: legacy.telegram,
      icon: "Send",
    },
    legacy.discord && {
      label: "Discord",
      href: legacy.discord,
      icon: "MessageCircle",
    },
    legacy.email && {
      label: "Email",
      href: legacy.email.startsWith("mailto:")
        ? legacy.email
        : `mailto:${legacy.email}`,
      icon: "Mail",
    },
  ].filter(Boolean) as SocialItem[];

  return fallback;
}

function SocialButton({
  item,
  onCopied,
}: {
  item: SocialItem;
  onCopied?: () => void;
}) {
  const icon = (item.icon && SOCIAL_ICON_MAP[item.icon]) ||
    SOCIAL_ICON_MAP[item.label] || <ExternalLink className="h-4 w-4" />;

  const isCopy = typeof item.href === "string" && item.href.startsWith("copy:");
  const copyValue = isCopy ? item.href!.slice(5) : "";

  if (isCopy) {
    return (
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(copyValue);
            onCopied?.();
          } catch {
            // best-effort fallback
            onCopied?.();
          }
        }}
        className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-transparent px-3 py-1.5 text-xs text-foreground transition hover:border-accent hover:bg-white/5"
        title={`Copy ${item.label}`}
      >
        {icon}
        <span>{item.label}</span>
      </button>
    );
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-transparent px-3 py-1.5 text-xs text-foreground transition hover:border-accent hover:bg-white/5"
    >
      {icon}
      <span>{item.label}</span>
    </a>
  );
}

export function AboutSection() {
  // Render only if enabled in JSON
  const enabled = (siteConfig as any)?.sections?.about === true;
  if (!enabled) return null;

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

  const socialsAbout = getAboutSocials();

  const [copiedBlink, setCopiedBlink] = useState(false);
  function triggerCopiedBlink() {
    setCopiedBlink(true);
    setTimeout(() => setCopiedBlink(false), 1200);
  }

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
              {about?.intro?.map((paragraph: string, idx: number) => (
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
                  {tools.map((tool: string) => (
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

            {socialsAbout.length > 0 && (
              <div className="mt-6 text-xs sm:text-sm">
                <div className="mb-2 flex items-center gap-2">
                  <p className="text-xs font-semibold text-muted-foreground sm:text-sm">
                    Social Quick Links
                  </p>
                  {/* ephemeral copied badge */}
                  {copiedBlink && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-[2px] text-[11px] text-green-300">
                      <CheckCircle2 className="h-3 w-3" />
                      Copied!
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {socialsAbout.map((item) => (
                    <SocialButton
                      key={`${item.key || item.label}-${item.href}`}
                      item={item}
                      onCopied={triggerCopiedBlink}
                    />
                  ))}
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
                Hello there, my name is{" "}
                <span className="font-semibold">Kevin Trinh</span>.
              </p>
              <p className="text-sm sm:text-base">
                I&apos;m currently a student at{" "}
                <span className="font-semibold">University of Houston</span>{" "}
                with an interest in machine learning, operating systems,
                full-stack development, and building tools that actually help
                people.
              </p>

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
                {tools.map((tool: string) => (
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

          {/* 4) Socials & useful links in the modal */}
          {socialsAbout.length > 0 && (
            <div>
              <div className="mb-2 flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground sm:text-base">
                  Socials &amp; Useful Links
                </p>
                {copiedBlink && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-[2px] text-[11px] text-green-300">
                    <CheckCircle2 className="h-3 w-3" />
                    Copied!
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {socialsAbout.map((item) => (
                  <SocialButton
                    key={`modal-${item.key || item.label}-${item.href}`}
                    item={item}
                    onCopied={triggerCopiedBlink}
                  />
                ))}
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
