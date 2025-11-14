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
  GitCommit,
  Tag,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProjectItem, ProjectLink } from "../../config/projects";
import { Modal } from "../ui/Modal";

// Helper: format ISO date (e.g. repoCreatedAt) as "Mon YYYY"
function formatMonthYear(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// Helper: format ISO date as "Mon DD, YYYY"
function formatFullDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Helper: format ISO as "MM/DD/YY" for compact label
function formatShortDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

// Helper: compute displayable start/end labels respecting AUTO + threshold
function getDisplayDates(project: ProjectItem): {
  startLabel?: string;
  endLabel?: string;
} {
  const rawStart = project.start?.trim();
  const rawEnd = project.end?.trim();
  const thresholdDays =
    typeof project.autoInactiveThresholdDays === "number" &&
    Number.isFinite(project.autoInactiveThresholdDays)
      ? project.autoInactiveThresholdDays
      : 90;

  const isAuto = (value?: string) =>
    !!value && value.trim().toLowerCase() === "auto";

  let startLabel = rawStart || undefined;
  let endLabel = rawEnd || undefined;

  // AUTO start => use repoCreatedAt if available
  if (isAuto(rawStart) && project.repoCreatedAt) {
    const formatted = formatMonthYear(project.repoCreatedAt);
    if (formatted) startLabel = formatted;
  }

  // AUTO end => use repoPushedAt + threshold rule
  if (isAuto(rawEnd) && project.repoPushedAt) {
    const pushed = new Date(project.repoPushedAt);
    if (!Number.isNaN(pushed.getTime())) {
      const now = new Date();
      const diffMs = now.getTime() - pushed.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      if (diffDays <= thresholdDays) {
        endLabel = "Present";
      } else {
        const formatted = formatMonthYear(project.repoPushedAt);
        if (formatted) endLabel = formatted;
      }
    }
  }

  return { startLabel, endLabel };
}

// Helper: best GitHub repo URL (githubRepoUrl > github link > undefined)
function getGithubRepoUrl(project: ProjectItem): string | undefined {
  if (project.githubRepoUrl) return project.githubRepoUrl;
  const githubLink = project.links?.find((l) => l.type === "github");
  if (githubLink?.href) return githubLink.href;
  return undefined;
}

// Normalize repo URL to owner/repo form (strip .git, trailing slash, etc.)
function normalizeRepoUrl(url: string): string {
  return url.replace(/\.git$/i, "").replace(/\/+$/, "");
}

// Helper: display URL without protocol
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//i, "");
}

export function ProjectsSectionClient({
  projects,
}: {
  projects: ProjectItem[];
}) {
  if (!projects.length) return null;

  const [showAll, setShowAll] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedProjectId = searchParams.get("project");
  const selected = useMemo(
    () =>
      selectedProjectId
        ? projects.find((p) => p.id === selectedProjectId) ?? null
        : null,
    [selectedProjectId, projects]
  );

  const visibleProjects = showAll ? projects : projects.slice(0, 6);
  const showToggle = projects.length > 6;

  const openProject = (project: ProjectItem) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("project", project.id);
    const nextUrl = `${pathname}?${sp.toString()}`;
    router.replace(nextUrl, { scroll: false });
  };

  const closeProject = () => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.delete("project");
    const nextUrl = sp.toString() ? `${pathname}?${sp.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  };

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

  // Modal title: just the project name again
  const modalTitle: string | undefined = selected?.name ?? "Project";

  return (
    <section id="projects" className="py-16 scroll-mt-12">
      <div className="mx-auto w-full max-w-5xl px-4">
        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          ~/Projects
        </h2>

        <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">
          Some things I&apos;ve been working on.
        </h3>

        <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project: ProjectItem) => {
            const hasStats =
              project.githubStars !== undefined ||
              project.githubForks !== undefined ||
              project.downloads !== undefined;

            const { startLabel, endLabel } = getDisplayDates(project);

            return (
              <article
                key={project.id}
                className="group flex h-full flex-col rounded-lg border border-white/10 bg-white/5 p-4 text-sm transition-transform transition-colors transition-shadow hover:-translate-y-[2px] hover:border-accent/70 hover:bg-white/10 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-lg font-semibold text-foreground">
                    {project.name}
                  </h4>

                  <button
                    type="button"
                    onClick={() => openProject(project)}
                    className="inline-flex h-7 w-7 items-center justify-center text-accent/80 transition hover:scale-105 hover:text-accent"
                    aria-label={`Open details for ${project.name}`}
                    title={`View details for ${project.name}`}
                  >
                    <Info className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 h-px w-full bg-white/10" />

                <div className="mt-3 flex-1 space-y-2">
                  {(startLabel || endLabel) && (
                    <p className="text-[11px] text-muted-foreground">
                      {startLabel} {endLabel ? `- ${endLabel}` : ""}
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
                          className="rounded-full border border-white/10 px-2 py-1 text-xs text-muted-foreground transition-transform transition-colors duration-200 hover:-translate-y-[1px] hover:border-accent/60 hover:bg-white/5"
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
                        <span>Stars</span>
                      </span>
                    )}
                    {project.githubForks !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        <span>{project.githubForks}</span>
                        <span>Forks</span>
                      </span>
                    )}
                    {project.downloads !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        <span>{project.downloads}</span>
                        <span>Downloads</span>
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
      <Modal open={Boolean(selected)} onClose={closeProject} title={modalTitle}>
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

  const { startLabel, endLabel } = useMemo(
    () => getDisplayDates(project),
    [project]
  );

  const timeRange = useMemo(() => {
    if (!startLabel && !endLabel) return null;
    return [startLabel, endLabel].filter(Boolean).join(" – ");
  }, [startLabel, endLabel]);

  const repoCreatedFull = formatFullDate(project.repoCreatedAt);
  const repoPushedFull = formatFullDate(project.repoPushedAt);

  const githubRepoUrl = getGithubRepoUrl(project);
  const normalizedRepoUrl = githubRepoUrl
    ? normalizeRepoUrl(githubRepoUrl)
    : undefined;

  const hasDownloadsMeta =
    project.downloads !== undefined ||
    !!project.githubLatestReleaseTag ||
    !!project.githubLatestReleaseName ||
    !!project.githubLatestReleasePublishedAt;

  // Latest release pieces
  const latestReleaseTag = project.githubLatestReleaseTag;
  const latestReleaseName =
    project.githubLatestReleaseName ?? project.githubLatestReleaseTag;
  const latestReleaseDateShort = formatShortDate(
    project.githubLatestReleasePublishedAt
  );
  const latestReleaseUrl =
    normalizedRepoUrl && latestReleaseTag
      ? `${normalizedRepoUrl}/releases/tag/${encodeURIComponent(
          latestReleaseTag
        )}`
      : undefined;

  const latestReleaseButtonText = useMemo(() => {
    if (!latestReleaseName) return null;
    if (latestReleaseTag && !latestReleaseName.includes(latestReleaseTag)) {
      return `${latestReleaseName} – ${latestReleaseTag}`;
    }
    return latestReleaseName;
  }, [latestReleaseName, latestReleaseTag]);

  const hasStatsRow =
    project.githubStars !== undefined ||
    project.githubForks !== undefined ||
    project.downloads !== undefined;

  return (
    <div className="space-y-5">
      {/* Combined info row: time range, repo dates, stats (now gray) */}
      {(timeRange || repoCreatedFull || repoPushedFull || hasStatsRow) && (
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {timeRange && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium">{timeRange}</span>
            </span>
          )}

          {(repoCreatedFull || repoPushedFull) && (
            <span className="inline-flex items-center gap-1">
              <span className="font-medium">
                {repoCreatedFull && (
                  <>
                    Repo created: {repoCreatedFull}
                    {repoPushedFull ? " · " : ""}
                  </>
                )}
                {repoPushedFull && <>Last push: {repoPushedFull}</>}
              </span>
            </span>
          )}

          {hasStatsRow && (
            <span className="inline-flex flex-wrap items-center gap-4">
              {project.githubStars !== undefined && (
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  <span className="font-medium">
                    {project.githubStars} Stars
                  </span>
                </span>
              )}
              {project.githubForks !== undefined && (
                <span className="inline-flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  <span className="font-medium">
                    {project.githubForks} Forks
                  </span>
                </span>
              )}
              {project.downloads !== undefined && (
                <span className="inline-flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span className="font-medium">
                    {project.downloads} Downloads
                  </span>
                </span>
              )}
            </span>
          )}
        </div>
      )}

      {/* Badges row (static shields from config) */}
      {project.badges?.length ? (
        <div className="flex flex-wrap gap-2">
          {project.badges.map((src) => (
            <img key={src} src={src} alt="" className="h-6" loading="lazy" />
          ))}
        </div>
      ) : null}

      {/* Tech & tools */}
      {project.technologies?.length ? (
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-[13px] font-semibold text-foreground">
            <Tags className="h-3.5 w-3.5" />
            <span>Tech &amp; Tools</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-muted-foreground transition-transform transition-colors duration-200 hover:-translate-y-[1px] hover:border-accent/60 hover:bg-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Repo topics (if any) */}
      {project.repoTopics?.length ? (
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-[13px] font-semibold text-foreground">
            <Tag className="h-3.5 w-3.5" />
            <span>Topics</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.repoTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-1 text-xs text-muted-foreground transition-transform transition-colors duration-200 hover:-translate-y-[1px] hover:border-accent/60 hover:bg-white/5"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Website + Latest Release buttons (below topics) */}
      {(project.repoHomepage ||
        (hasDownloadsMeta && latestReleaseButtonText && latestReleaseUrl)) && (
        <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {project.repoHomepage && (
            <div className="flex flex-col items-start gap-1">
              <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/90">
                <Globe className="h-3.5 w-3.5 text-white/90" />
                <span>Website</span>
              </div>
              <a
                href={project.repoHomepage}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg border border-white/25 bg-white/5 px-3.5 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-accent hover:bg-white/10 hover:text-foreground"
              >
                <span className="truncate">
                  {displayUrl(project.repoHomepage)}
                </span>
              </a>
            </div>
          )}

          {hasDownloadsMeta && latestReleaseButtonText && latestReleaseUrl && (
            <div className="flex flex-col items-start gap-1">
              <div className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/90">
                <Tag className="h-3.5 w-3.5 text-white/90" />
                <span>
                  Latest Release
                  {latestReleaseDateShort ? ` (${latestReleaseDateShort})` : ""}
                </span>
              </div>
              <a
                href={latestReleaseUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg border border-white/25 bg-white/5 px-3.5 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-accent hover:bg-white/10 hover:text-foreground"
              >
                <span className="truncate">{latestReleaseButtonText}</span>
              </a>
            </div>
          )}
        </div>
      )}

      {/* Optional short description above README (last content block before README) */}
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
            <p className="text-[13px] font-semibold text-white/85">README</p>

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

      {/* Primary links + GitHub actions at the very end (left on desktop, full-width on mobile) */}
      {(project.links?.length || normalizedRepoUrl) && (
        <div className="mt-2 flex flex-wrap justify-start gap-2">
          {project.links?.map((l) => (
            <a
              key={`${project.id}-${l.label}`}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 shadow-sm transition-colors hover:border-accent hover:bg-white/10 hover:text-foreground sm:w-auto"
            >
              {iconFor(l.type)}
              <span>{l.label}</span>
            </a>
          ))}

          {normalizedRepoUrl && (
            <>
              {/* Commits button for any GitHub-backed project */}
              <a
                href={`${normalizedRepoUrl}/commits`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 shadow-sm transition-colors hover:border-accent hover:bg-white/10 hover:text-foreground sm:w-auto"
              >
                <GitCommit className="h-3.5 w-3.5" />
                <span>Commits</span>
              </a>

              {/* Releases button only when we have releases/downloads meta */}
              {hasDownloadsMeta && (
                <a
                  href={`${normalizedRepoUrl}/releases`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/90 shadow-sm transition-colors hover:border-accent hover:bg-white/10 hover:text-foreground sm:w-auto"
                >
                  <Tag className="h-3.5 w-3.5" />
                  <span>Releases</span>
                </a>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
