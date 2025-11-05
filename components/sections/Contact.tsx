// components/sections/Contact.tsx
"use client";

import { FormEvent, useState, ReactNode } from "react";
import { siteConfig } from "../../config/siteConfig";
import {
  Mail,
  MessageCircle,
  Send,
  Github,
  Linkedin,
  Youtube,
} from "lucide-react";

export function ContactSection() {
  const socials = siteConfig.socials ?? {};
  const primaryEmail = socials.email;
  const discord = socials.discord;
  const telegram = socials.telegram;
  const github = socials.github;
  const linkedin = socials.linkedin;
  const youtube = socials.youtube;

  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("done"), 600);
  }

  return (
    <section id="contact" className="py-16 scroll-mt-12">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          ~/Contact
        </h2>

        <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
          Let&apos;s get in touch.
        </h3>

        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Reach out about internships, full-time roles, collaborations, or
          questions about any of my projects. I try to keep replies focused and
          intentional, in the same spirit as this portfolio.
        </p>

        <div className="mt-8 space-y-6">
          {/* Form stretches full width */}
          <form
            onSubmit={handleSubmit}
            suppressHydrationWarning
            className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4 text-sm sm:text-base"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs font-medium text-foreground sm:text-sm"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="h-10 w-full rounded-md border border-white/15 bg-transparent px-2 text-sm text-foreground outline-none ring-0 placeholder:text-xs placeholder:text-muted-foreground/60 focus:border-accent"
                  placeholder="Your name"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-medium text-foreground sm:text-sm"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="h-10 w-full rounded-md border border-white/15 bg-transparent px-2 text-sm text-foreground outline-none ring-0 placeholder:text-xs placeholder:text-muted-foreground/60 focus:border-accent"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="reason"
                className="mb-1 block text-xs font-medium text-foreground sm:text-sm"
              >
                Reason
              </label>
              <select
                id="reason"
                name="reason"
                className="h-10 w-full rounded-md border border-white/15 bg-transparent px-2 text-sm text-foreground outline-none ring-0 focus:border-accent"
                defaultValue="general"
              >
                <option value="general" className="bg-[#020817]">
                  General message
                </option>
                <option value="opportunity" className="bg-[#020817]">
                  Role / opportunity
                </option>
                <option value="project" className="bg-[#020817]">
                  Question about a project
                </option>
                <option value="other" className="bg-[#020817]">
                  Other
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-xs font-medium text-foreground sm:text-sm"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full rounded-md border border-white/15 bg-transparent px-2 py-2 text-sm text-foreground outline-none ring-0 placeholder:text-xs placeholder:text-muted-foreground/60 focus:border-accent"
                placeholder="Write a short message..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-xs font-medium text-white transition hover:bg-accent/90 disabled:opacity-70 sm:text-sm"
              >
                <Send className="h-4 w-4" />
                {status === "submitting"
                  ? "Sending..."
                  : status === "done"
                  ? "Sent (demo)"
                  : "Send message"}
              </button>

              {primaryEmail && (
                <a
                  href={`mailto:${primaryEmail}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-3 py-1.5 text-xs text-muted-foreground transition hover:border-accent hover:bg-white/5 hover:text-foreground sm:text-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>Or email me directly</span>
                </a>
              )}
            </div>
          </form>

          <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm">
            <p className="text-xs font-medium text-foreground sm:text-sm">
              Other ways to reach me
            </p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Prefer not to use a form? Here are a few other places where you
              can reach me.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {primaryEmail && (
                <ContactLink
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  href={`mailto:${primaryEmail}`}
                  detail={primaryEmail}
                />
              )}

              {discord && (
                <ContactLink
                  icon={<MessageCircle className="h-4 w-4" />}
                  label="Discord"
                  href={discord}
                  detail="DM / contact server"
                />
              )}

              {telegram && (
                <ContactLink
                  icon={<Send className="h-4 w-4" />}
                  label="Telegram"
                  href={telegram}
                  detail="@username"
                />
              )}

              {github && (
                <ContactLink
                  icon={<Github className="h-4 w-4" />}
                  label="GitHub"
                  href={github}
                  detail="Profile & projects"
                />
              )}

              {linkedin && (
                <ContactLink
                  icon={<Linkedin className="h-4 w-4" />}
                  label="LinkedIn"
                  href={linkedin}
                  detail="Professional profile"
                />
              )}

              {youtube && (
                <ContactLink
                  icon={<Youtube className="h-4 w-4" />}
                  label="YouTube"
                  href={youtube}
                  detail="Channel"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ContactLinkProps = {
  icon: ReactNode;
  label: string;
  href: string;
  detail?: string;
};

function ContactLink({ icon, label, href, detail }: ContactLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-2 rounded-md border border-white/10 bg-transparent px-3 py-2 text-xs text-muted-foreground transition hover:border-accent hover:bg-white/5 hover:text-foreground sm:text-sm"
    >
      <span className="inline-flex items-center gap-2">
        {icon}
        <span className="font-medium">{label}</span>
      </span>
      {detail && (
        <span className="text-[11px] text-muted-foreground sm:text-xs">
          {detail}
        </span>
      )}
    </a>
  );
}
