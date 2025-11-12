// components/sections/ProjectsClient.tsx
"use client";

import { useState } from "react";
import {
  Github,
  Globe,
  FileText,
  Download,
  PlayCircle,
  ExternalLink,
  Star,
  GitFork,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import type { ProjectItem, ProjectLink } from "../../config/projects";

export function ProjectsSectionClient({
  projects,
}: {
  projects: ProjectItem[];
}) {
  if (!projects.length) return null;

  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 6);
  const showToggle = projects.length > 6;

  return (
    <section id="projects" className="py-16 scroll-mt-12">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          ~/Projects
        </h2>

        <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
          Some things I&apos;ve been working on.
        </h3>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project: ProjectItem) => {
            const hasStats =
              project.githubStars !== undefined ||
              project.githubForks !== undefined ||
              project.downloads !== undefined;

            return (
              <article
                key={project.id}
                className="group flex flex-col rounded-lg border border-white/10 bg-white/5 p-4 text-sm transition-transform transition-colors transition-shadow hover:-translate-y-[2px] hover:border-accent/70 hover:bg-white/10 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-lg font-semibold text-foreground">
                    {project.name}
                  </h4>
                  <button
                    type="button"
                    className="inline-flex h-7 w-7 items-center justify-center text-accent/80 transition hover:scale-105 hover:text-accent"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 h-px w-full bg-white/10" />

                <div className="mt-3 flex-1 space-y-2">
                  <p className="text-[11px] text-muted-foreground">
                    {project.start} - {project.end}
                  </p>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    {project.description && project.description.length > 0 ? (
                      project.description.map((para: string, idx: number) => (
                        <p key={idx}>{para}</p>
                      ))
                    ) : (
                      <p>{project.summary}</p>
                    )}
                  </div>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 px-2 py-1 text-[12px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {(project.links && project.links.length > 0) || hasStats ? (
                  <div className="mt-2 h-px w-full bg-white/10" />
                ) : null}

                {project.links && project.links.length > 0 && (
                  <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
                    {project.links.map((link: ProjectLink) => {
                      const icon = getLinkIcon(link.type);
                      return (
                        <a
                          key={`${project.id}-${link.label}`}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-transparent px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-accent hover:text-foreground sm:text-xs"
                        >
                          {icon}
                          <span>{link.label}</span>
                        </a>
                      );
                    })}
                  </div>
                )}

                {hasStats && (
                  <div className="mt-3 flex flex-wrap justify-center gap-3 text-[11px] text-muted-foreground transition-colors duration-500 ease-out group-hover:text-white/90">
                    {project.githubStars !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        <span>{project.githubStars}</span>
                        <span>stars</span>
                      </span>
                    )}
                    {project.githubForks !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        <span>{project.githubForks}</span>
                        <span>forks</span>
                      </span>
                    )}
                    {project.downloads !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>{project.downloads}</span>
                        <span>downloads</span>
                      </span>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {showToggle && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <span>{showAll ? "Show less" : "View more"}</span>
              {showAll ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function getLinkIcon(type?: string) {
  switch (type) {
    case "github":
      return <Github className="h-3.5 w-3.5" />;
    case "live":
      return <Globe className="h-3.5 w-3.5" />;
    case "docs":
      return <FileText className="h-3.5 w-3.5" />;
    case "download":
      return <Download className="h-3.5 w-3.5" />;
    case "video":
      return <PlayCircle className="h-3.5 w-3.5" />;
    default:
      return <ExternalLink className="h-3.5 w-3.5" />;
  }
}
