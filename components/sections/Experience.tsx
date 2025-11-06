// components/sections/Experience.tsx
"use client";

import { useState } from "react";
import { FileText, Download } from "lucide-react";
import { experience } from "../../config/experience";

export function ExperienceSection() {
  if (!experience.length) return null;

  // default to first item
  const defaultActiveId = experience[0]?.id;
  const [activeId, setActiveId] = useState<string>(defaultActiveId);

  const activeItem =
    experience.find((item) => item.id === activeId) ?? experience[0];

  return (
    <section id="experience" className="py-16 scroll-mt-12">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          ~/Experience
        </h2>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-2xl font-semibold sm:text-3xl">
            My current/past relevant experience.
          </h3>

          {/* Resume buttons */}
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm">
            <a
              href="#resume"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-xs font-medium text-white transition hover:bg-accent/90"
            >
              <FileText className="h-4 w-4" />
              <span>View Resume</span>
            </a>
            <a
              href="#resume"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-xs text-foreground transition hover:border-accent hover:bg-white/5"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Sidebar + details, no outer card */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-start">
          {/* Left: roles list (slightly narrower) */}
          <div className="w-full border-b border-white/10 pb-4 md:w-60 md:border-b-0 md:pb-0 md:pr-4">
            <ul className="space-y-1">
              {experience.map((item) => {
                const isActive = item.id === activeItem.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className="w-full rounded-md px-3 py-2.5 text-left transition hover:bg-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <p
                            className={
                              isActive
                                ? "text-base font-semibold text-accent"
                                : "text-base font-semibold text-foreground"
                            }
                          >
                            {item.company}
                          </p>
                          <p className="text-[13px] text-muted-foreground">
                            {item.role}
                          </p>
                        </div>

                        {/* Right-side indicator bar (only active) */}
                        <div
                          className={`h-10 w-[2px] rounded-full transition ${
                            isActive ? "bg-accent" : "bg-transparent"
                          }`}
                        />
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: details with vertical divider on this side */}
          <article className="flex-1 border-t border-white/10 pt-4 text-sm text-muted-foreground md:border-t-0 md:border-l md:border-white/10 md:pl-4 md:pt-0">
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <div>
                <h4 className="text-lg font-semibold text-foreground sm:text-xl">
                  {activeItem.role} @ {activeItem.company}
                </h4>

                <p className="mt-1 text-sm text-muted-foreground">
                  {activeItem.start} — {activeItem.end}
                  {activeItem.location && ` · ${activeItem.location}`}
                  {activeItem.type && ` · ${capitalize(activeItem.type)}`}
                </p>
              </div>
            </div>

            {activeItem.description?.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {activeItem.description.map((line, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 leading-relaxed"
                  >
                    {/* Filled triangle pointing to the sentence */}
                    <span className="mt-[5px] inline-block h-0 w-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-accent" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}

function capitalize(s?: string) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
