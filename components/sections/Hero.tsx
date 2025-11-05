// components/sections/Hero.tsx
import { siteConfig } from "../../config/siteConfig";
import { FileText, Mail } from "lucide-react";

export function HeroSection() {
  return (
    <section id="top" className="pt-16 pb-20">
      <div className="mx-auto w-full max-w-5xl px-4">
        <p className="text-base text-muted-foreground sm:text-lg">
          Hi, my name is
        </p>

        <h1 className="mt-3 text-5xl font-semibold sm:text-6xl">
          {siteConfig.name}
        </h1>

        <h2 className="mt-3 text-2xl text-muted-foreground sm:text-3xl">
          {siteConfig.title}
        </h2>

        <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
          {siteConfig.tagline}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="#resume"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-transform transition-colors hover:-translate-y-[1px] hover:bg-accent/90"
          >
            <FileText className="h-4 w-4" />
            <span>View Resume</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm text-foreground transition-transform transition-colors hover:-translate-y-[1px] hover:border-accent hover:bg-white/5"
          >
            <Mail className="h-4 w-4" />
            <span>Contact Me</span>
          </a>
        </div>
      </div>
    </section>
  );
}
