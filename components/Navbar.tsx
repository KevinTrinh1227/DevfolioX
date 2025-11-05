// components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "../config/siteConfig";
import { Menu, X } from "lucide-react";

const navItems: { id: keyof typeof siteConfig.sections; label: string }[] = [
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const enabledNavItems = navItems.filter(
    (item) => siteConfig.sections[item.id]
  );

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="z-20 border-b border-white/10 bg-background/80 backdrop-blur sm:sticky sm:top-0">
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="flex items-center justify-between py-4">
          {/* Brand */}
          <Link href="#top" className="flex items-baseline gap-2">
            <span className="text-base font-semibold tracking-tight sm:text-lg">
              kevintrinh.dev
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:inline sm:text-xs">
              {siteConfig.title}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-4 hidden flex-1 justify-end gap-3 text-[11px] text-muted-foreground sm:flex md:gap-4 md:text-xs">
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

          {/* Right side: My Resume shortcut (desktop / tablet only) */}
          <div className="ml-4 hidden items-center gap-3 text-[11px] sm:flex md:text-xs">
            <a
              href="#resume"
              className="rounded-full border border-white/20 px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground underline-offset-2 transition hover:border-accent hover:bg-white/5 hover:text-foreground md:text-xs"
            >
              My Resume
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="ml-2 inline-flex items-center justify-center rounded-md border border-white/15 p-1.5 text-muted-foreground hover:border-accent hover:text-foreground sm:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {isOpen && (
          <div className="pb-4 sm:hidden">
            <nav className="flex flex-col gap-2 text-[13px] text-muted-foreground">
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
