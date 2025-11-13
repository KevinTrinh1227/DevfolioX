// components/sections/ProjectsClient.tsx
"use client";

import { useMemo, useState, type ReactNode } from "react";
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
  Calendar,
  Tags,
} from "lucide-react";
import type { ProjectItem, ProjectLink } from "../../config/projects";
import { Modal } from "../ui/Modal";

export function ProjectsSectionClient({
  projects,
}: {
  projects: ProjectItem[];
}) {
  if (!projects.length) return null;

  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  const visibleProjects = showAll ? projects : projects.slice(0, 6);
  const showToggle = projects.length > 6;

  const iconFor = (type?: string): ReactNode => {
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
  };

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
                    onClick={() => setSelected(project)}
                    className="inline-flex h-7 w-7 items-center justify-center text-accent/80 transition hover:scale-105 hover:text-accent"
                    aria-label={`Open details for ${project.name}`}
                    title="More info"
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 h-px w-full bg-white/10" />

                <div className="mt-3 flex-1 space-y-2">
                  {(project.start || project.end) && (
                    <p className="text-[11px] text-muted-foreground">
                      {project.start} {project.end ? `- ${project.end}` : ""}
                    </p>
                  )}

                  <div className="space-y-2 text-sm text-muted-foreground">
                    {project.description?.length ? (
                      project.description.map((para, idx) => (
                        <p key={idx}>{para}</p>
                      ))
                    ) : project.summary ? (
                      <p>{project.summary}</p>
                    ) : null}
                  </div>

                  {project.technologies?.length ? (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 px-2 py-1 text-[12px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                {(project.links?.length || hasStats) && (
                  <div className="mt-2 h-px w-full bg-white/10" />
                )}

                {project.links?.length ? (
                  // ⬇️ Reverted to original small buttons on project cards
                  <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
                    {project.links.map((link: ProjectLink) => (
                      <a
                        key={`${project.id}-${link.label}`}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-transparent px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-accent hover:text-foreground sm:text-xs"
                      >
                        {iconFor(link.type)}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                ) : null}

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

      {/* Info Modal – cached data only */}
      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.name ?? "Project"}
      >
        {selected && <ProjectDetails project={selected} iconFor={iconFor} />}
      </Modal>
    </section>
  );
}

function ProjectDetails({
  project,
  iconFor,
}: {
  project: ProjectItem;
  iconFor: (type?: string) => ReactNode;
}) {
  // Prefer cached HTML, fall back to plain text — all provided by the server loader
  const htmlExcerpt = (project as any).readmeHtmlExcerpt as string | undefined;
  const htmlFull = (project as any).readmeHtmlFull as string | undefined;
  const plainExcerpt = (project as any).readmePlainExcerpt as
    | string
    | undefined;
  const plainFull = (project as any).readmePlainFull as string | undefined;

  const selectedHtml = htmlFull ?? htmlExcerpt;
  const selectedPlain = plainFull ?? plainExcerpt;

  const hasHtml = Boolean(selectedHtml);
  const hasPlain = Boolean(selectedPlain);

  // Single toggle: show/hide entire README (default visible)
  const [showReadme, setShowReadme] = useState(true);

  const timeRange = useMemo(() => {
    if (!project.start && !project.end) return null;
    return [project.start, project.end].filter(Boolean).join(" – ");
  }, [project.start, project.end]);

  return (
    <div className="space-y-5">
      {timeRange && (
        <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>{timeRange}</span>
        </p>
      )}

      {/* Tech up top */}
      {project.technologies?.length ? (
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-medium text-foreground">
            <Tags className="h-3.5 w-3.5" />
            <span>Tech &amp; Tools</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[12px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Stats next — make it white for readability in the modal */}
      {(project.githubStars !== undefined ||
        project.githubForks !== undefined ||
        project.downloads !== undefined) && (
        <div className="flex flex-wrap gap-3 text-[12px] text-white/90">
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

      {/* Optional short description above README */}
      {(project.description?.length || project.summary) && (
        <div className="space-y-2 text-sm leading-6 text-muted-foreground">
          {project.description?.length
            ? project.description.map((p, i) => <p key={i}>{p}</p>)
            : project.summary && <p>{project.summary}</p>}
        </div>
      )}

      {/* README wrapper with ONE control button (collapse/show) */}
      {(hasHtml || hasPlain) && (
        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-medium text-white/85">README</p>

            <button
              type="button"
              onClick={() => setShowReadme((s) => !s)}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/85 shadow-sm transition hover:border-accent hover:bg-white/10 hover:text-foreground"
            >
              {showReadme ? (
                <>
                  <ChevronUp className="h-3.5 w-3.5" />
                  Hide README
                </>
              ) : (
                <>
                  <ChevronDown className="h-3.5 w-3.5" />
                  Show README
                </>
              )}
            </button>
          </div>

          {/* README content (hidden entirely when collapsed) */}
          {showReadme && (
            <>
              {hasHtml ? (
                <div
                  className="prose prose-invert max-w-none prose-a:underline prose-img:rounded-lg prose-code:px-1 prose-code:py-0.5 prose-pre:my-3"
                  dangerouslySetInnerHTML={{ __html: selectedHtml! }}
                />
              ) : (
                <div className="space-y-2 rounded-md border border-white/10 bg-white/5 p-3 text-sm text-muted-foreground">
                  <div className="whitespace-pre-wrap">{selectedPlain}</div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {project.links?.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {project.links.map((l) => (
            <a
              key={`${project.id}-${l.label}`}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 shadow-sm transition-colors hover:border-accent hover:bg-white/10 hover:text-foreground"
            >
              {iconFor(l.type)}
              <span>{l.label}</span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
