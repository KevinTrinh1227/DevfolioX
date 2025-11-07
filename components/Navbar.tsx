// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "../config/siteConfig";
import { Menu, X } from "lucide-react";

const navItems: { id: keyof typeof siteConfig.sections; label: string }[] = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "blog", label: "Blogs" },
  { id: "youtube", label: "YouTube" },
  { id: "certifications", label: "Certifications" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const enabledNavItems = navItems.filter(
    (item) => siteConfig.sections[item.id]
  );

  const showSubtitle = enabledNavItems.length <= 5;

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-background/80 backdrop-blur">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/favicon.png"
              alt="kevintrinh.dev logo"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight sm:text-lg">
                kevintrinh.dev
              </span>
              {showSubtitle && (
                <span className="hidden text-[11px] text-muted-foreground lg:inline lg:text-sm">
                  {siteConfig.title}
                </span>
              )}
            </div>
          </Link>

          <nav className="ml-4 hidden flex-1 justify-end gap-1.5 text-xs text-muted-foreground sm:flex md:gap-2 md:text-sm">
            {enabledNavItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full px-3 py-1.5 font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-4 hidden items-center gap-2 text-xs sm:flex md:text-sm">
            {siteConfig.sections.resume && (
              <a
                href="#resume"
                className="rounded-full border border-white/20 px-3.5 py-1.5 text-xs font-medium text-muted-foreground underline-offset-2 transition hover:border-accent hover:bg-white/5 hover:text-foreground md:text-sm"
              >
                My Resume
              </a>
            )}
          </div>

          <button
            type="button"
            className="ml-2 inline-flex items-center justify-center rounded-md border border-white/15 p-1.5 text-muted-foreground hover:border-accent hover:text-foreground sm:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="pb-4 sm:hidden">
            <nav className="flex flex-col gap-1 text-sm text-muted-foreground">
              {enabledNavItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleNavClick}
                  className="rounded-full px-3 py-2 font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}

              {siteConfig.sections.resume && (
                <a
                  href="#resume"
                  onClick={handleNavClick}
                  className="rounded-full px-3 py-2 font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                >
                  My Resume
                </a>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
