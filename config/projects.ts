// config/projects.ts
import rawConfig from "./projects.json";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

export type ProjectLinkType =
  | "github"
  | "live"
  | "docs"
  | "download"
  | "video"
  | "other";

export type ProjectLink = {
  label: string;
  href: string;
  type?: ProjectLinkType;
};

export type ProjectItem = {
  id: string;
  name: string;

  summary: string;
  description?: string[];

  start: string;
  end: string;

  technologies?: string[];
  links?: ProjectLink[];
  featured?: boolean;

  githubStars?: number;
  githubForks?: number;
  downloads?: number;

  // Cached README (client never fetches; rendered in modal only if present)
  readmePlainExcerpt?: string;
  readmePlainFull?: string;
  readmeHtmlExcerpt?: string;
  readmeHtmlFull?: string;

  // For locals, we may carry this to gate README usage in the modal
  githubRepoUrl?: string;
};

// ───────────────── raw JSON shapes ─────────────────
type RawGithubReadmeProject = {
  repo_url: string;
  priority?: number;
};

type RawLocalProject = ProjectItem & {
  priority?: number;
  stats?: {
    stars?: boolean;
    forks?: boolean;
    downloads?: boolean;
  };
};

type RawConfig = {
  github_readme_projects: RawGithubReadmeProject[];
  local_projects: RawLocalProject[];
};

const cfg: RawConfig = (rawConfig as RawConfig) ?? {
  github_readme_projects: [],
  local_projects: [],
};

// ───────────────── helpers ─────────────────
const MAX_README_BYTES = 150_000; // cap to keep builds lean

function mdToSafeHtml(md: string): string {
  // Newer `marked` no longer accepts { mangle, headerIds } on parse.
  // Just parse and let sanitize-html strip any unwanted attributes (like id).
  const raw = (marked.parse(md) as string) || "";
  return sanitizeHtml(raw, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "pre",
      "code",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "hr",
      "details",
      "summary",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      code: ["class"],
      pre: ["class"],
      th: ["colspan", "rowspan", "align"],
      td: ["colspan", "rowspan", "align"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}

function parseOwnerRepo(url: string): { owner: string; repo: string } {
  const cleaned = url
    .replace(/^git\+https?:\/\//i, "")
    .replace(/^https?:\/\//i, "")
    .replace(/#.*$/, "")
    .replace(/\?.*$/, "")
    .replace(/\.git$/i, "")
    .replace(/\/+$/, "");
  const m = cleaned.match(/github\.com\/([^/]+)\/([^/]+)/i);
  if (!m) throw new Error(`Invalid GitHub repo URL: ${url}`);
  return { owner: m[1], repo: m[2] };
}

/** Optional JSON blob in README:
 * <!-- devfoliox { "title": "...", "summary": "...", ... } -->
 */
function extractMetaFromReadme(readme: string) {
  const match = readme.match(
    /<!--\s*devfoliox(?:-project)?\s*([\s\S]*?)\s*-->/i
  );
  if (!match) return null;
  try {
    const meta = JSON.parse(match[1].trim()) as {
      title?: string;
      summary?: string;
      description?: string[];
      technologies?: string[];
      start?: string;
      end?: string;
      links?: ProjectLink[];
      githubStars?: number;
      githubForks?: number;
      downloads?: number;
      featured?: boolean;
      stats_stars?: boolean;
      stats_forks?: boolean;
      stats_downloads?: boolean;
    };
    return meta;
  } catch {
    return null;
  }
}

// Turn relative URLs into absolute GitHub links
function absolutizeHtml(html: string, owner: string, repo: string) {
  // Raw content host for images
  const RAW = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/`;
  // Web view for links
  const BLOB = `https://github.com/${owner}/${repo}/blob/HEAD/`;

  // Convert src/href that don't start with http(s), //, data:, mailto:, tel:, or #
  return html.replace(
    /\b(src|href)="(?!https?:|\/\/|data:|mailto:|tel:|#)([^"]+)"/g,
    (_m, attr, url) => {
      const clean = url.replace(/^\.?\//, ""); // strip leading ./ or /
      const base = attr === "src" ? RAW : BLOB;
      return `${attr}="${base}${clean}"`;
    }
  );
}

function sliceReadmeWithBase(md: string, owner?: string, repo?: string) {
  const trimmed = md.trim();
  const cutAt = trimmed.indexOf("\n## ");
  const excerptMd = trimmed.slice(0, cutAt > 0 ? cutAt : 1200).trim();
  const fullMd =
    trimmed.length > MAX_README_BYTES
      ? trimmed.slice(0, MAX_README_BYTES)
      : trimmed;

  let htmlExcerpt = mdToSafeHtml(excerptMd);
  let htmlFull = mdToSafeHtml(fullMd);

  if (owner && repo) {
    htmlExcerpt = absolutizeHtml(htmlExcerpt, owner, repo);
    htmlFull = absolutizeHtml(htmlFull, owner, repo);
  }

  return {
    plainExcerpt: excerptMd,
    plainFull: fullMd,
    htmlExcerpt,
    htmlFull,
  };
}

function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "devfoliox-projects",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchGithubStats(
  owner: string,
  repo: string,
  opts: {
    stats_stars?: boolean;
    stats_forks?: boolean;
    stats_downloads?: boolean;
  },
  revalidateSeconds: number
): Promise<{ stars?: number; forks?: number; downloads?: number }> {
  const wantStars = !!opts.stats_stars;
  const wantForks = !!opts.stats_forks;
  const wantDownloads = !!opts.stats_downloads;

  if (!wantStars && !wantForks && !wantDownloads) return {};

  let stars: number | undefined;
  let forks: number | undefined;
  let downloads: number | undefined;

  const [repoJson, releasesJson] = await Promise.all([
    wantStars || wantForks
      ? fetch(`https://api.github.com/repos/${owner}/${repo}`, {
          headers: githubHeaders(),
          next: { revalidate: revalidateSeconds },
        })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      : Promise.resolve(null),
    wantDownloads
      ? fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
          headers: githubHeaders(),
          next: { revalidate: revalidateSeconds },
        })
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      : Promise.resolve(null),
  ]);

  if (repoJson && (wantStars || wantForks)) {
    const s = Number(repoJson.stargazers_count);
    const f = Number(repoJson.forks_count);
    if (wantStars && Number.isFinite(s)) stars = s;
    if (wantForks && Number.isFinite(f)) forks = f;
  }

  if (Array.isArray(releasesJson) && wantDownloads) {
    downloads = releasesJson.reduce((sum: number, rel: any) => {
      const assets = Array.isArray(rel?.assets) ? rel.assets : [];
      const c = assets.reduce(
        (acc: number, a: any) => acc + (Number(a?.download_count) || 0),
        0
      );
      return sum + c;
    }, 0);
  }

  return { stars, forks, downloads };
}

function sortByPriority<T extends { _priority?: number }>(items: T[]) {
  return items.sort((a, b) => (a._priority ?? 9999) - (b._priority ?? 9999));
}

// ───────────────── main loader ─────────────────

export async function loadProjects(): Promise<ProjectItem[]> {
  const revalidateSeconds = 60 * 60 * 3; // 3h

  // 1) GitHub-backed (metadata from README)
  const fromGithub = await Promise.all(
    (cfg.github_readme_projects || []).map(async (entry, idx) => {
      try {
        const { owner, repo } = parseOwnerRepo(entry.repo_url);
        const id = `${owner}-${repo}`.toLowerCase();

        const readmeRes = await fetch(
          `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`,
          { headers: githubHeaders(), next: { revalidate: revalidateSeconds } }
        );

        if (!readmeRes.ok) {
          return {
            id,
            name: repo,
            summary: "GitHub project",
            start: "",
            end: "",
            _priority: entry.priority ?? idx + 1,
          } as ProjectItem & { _priority?: number };
        }

        const raw = await readmeRes.text();
        const clipped =
          raw.length > MAX_README_BYTES ? raw.slice(0, MAX_README_BYTES) : raw;

        const meta = extractMetaFromReadme(clipped) || undefined;

        // Build plain + HTML caches (fix relative URLs using owner/repo)
        const { plainExcerpt, plainFull, htmlExcerpt, htmlFull } =
          sliceReadmeWithBase(clipped, owner, repo);

        let stars: number | undefined;
        let forks: number | undefined;
        let downloads: number | undefined;

        if (meta) {
          const statResult = await fetchGithubStats(
            owner,
            repo,
            {
              stats_stars: meta.stats_stars,
              stats_forks: meta.stats_forks,
              stats_downloads: meta.stats_downloads,
            },
            revalidateSeconds
          );
          stars = statResult.stars;
          forks = statResult.forks;
          downloads = statResult.downloads;
        }

        return {
          id,
          name: meta?.title ?? repo,
          summary: meta?.summary ?? "GitHub project",
          description: meta?.description,
          start: meta?.start ?? "",
          end: meta?.end ?? "",
          technologies: meta?.technologies,
          links: meta?.links,
          featured: meta?.featured,

          githubStars:
            stars ??
            (typeof meta?.githubStars === "number" &&
            Number.isFinite(meta.githubStars)
              ? meta.githubStars
              : undefined),
          githubForks:
            forks ??
            (typeof meta?.githubForks === "number" &&
            Number.isFinite(meta.githubForks)
              ? meta.githubForks
              : undefined),
          downloads:
            downloads ??
            (typeof meta?.downloads === "number" &&
            Number.isFinite(meta.downloads)
              ? meta.downloads
              : undefined),

          // cached README (plain + HTML)
          readmePlainExcerpt: plainExcerpt,
          readmePlainFull: plainFull,
          readmeHtmlExcerpt: htmlExcerpt,
          readmeHtmlFull: htmlFull,

          _priority: entry.priority ?? idx + 1,
        } as ProjectItem & { _priority?: number };
      } catch {
        const fallbackName = entry.repo_url.split("/").pop() || "Project";
        return {
          id: fallbackName.toLowerCase(),
          name: fallbackName,
          summary: "Project",
          start: "",
          end: "",

          _priority: entry.priority ?? idx + 1,
        } as ProjectItem & { _priority?: number };
      }
    })
  );

  // 2) Local projects (optional GitHub stats + README via githubRepoUrl)
  const locals: (ProjectItem & { _priority?: number })[] = await Promise.all(
    (cfg.local_projects || []).map(async (p, idx) => {
      let stars: number | undefined;
      let forks: number | undefined;
      let downloads: number | undefined;

      // Defaults (so we can merge with any pre-filled values on p)
      let plainExcerpt: string | undefined;
      let plainFull: string | undefined;
      let htmlExcerpt: string | undefined;
      let htmlFull: string | undefined;

      if (p.githubRepoUrl) {
        try {
          const { owner, repo } = parseOwnerRepo(p.githubRepoUrl);

          // stats if requested
          if (p.stats) {
            const statResult = await fetchGithubStats(
              owner,
              repo,
              {
                stats_stars: !!p.stats.stars,
                stats_forks: !!p.stats.forks,
                stats_downloads: !!p.stats.downloads,
              },
              revalidateSeconds
            );
            stars = statResult.stars;
            forks = statResult.forks;
            downloads = statResult.downloads;
          }

          // README cache (optional)
          const readmeRes = await fetch(
            `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`,
            {
              headers: githubHeaders(),
              next: { revalidate: revalidateSeconds },
            }
          ).catch(() => null);

          if (readmeRes && readmeRes.ok) {
            const md = await readmeRes.text();
            const clipped =
              md.length > MAX_README_BYTES ? md.slice(0, MAX_README_BYTES) : md;

            const sliced = sliceReadmeWithBase(clipped, owner, repo);
            plainExcerpt = sliced.plainExcerpt;
            plainFull = sliced.plainFull;
            htmlExcerpt = sliced.htmlExcerpt;
            htmlFull = sliced.htmlFull;
          }
        } catch {
          // ignore errors for locals
        }
      }

      return {
        ...p,
        githubStars:
          stars ??
          (typeof p.githubStars === "number" && Number.isFinite(p.githubStars)
            ? p.githubStars
            : undefined),
        githubForks:
          forks ??
          (typeof p.githubForks === "number" && Number.isFinite(p.githubForks)
            ? p.githubForks
            : undefined),
        downloads:
          downloads ??
          (typeof p.downloads === "number" && Number.isFinite(p.downloads)
            ? p.downloads
            : undefined),

        // merge any pre-filled values with what we sliced
        readmePlainExcerpt: p.readmePlainExcerpt ?? plainExcerpt,
        readmePlainFull: p.readmePlainFull ?? plainFull,
        readmeHtmlExcerpt: p.readmeHtmlExcerpt ?? htmlExcerpt,
        readmeHtmlFull: p.readmeHtmlFull ?? htmlFull,

        _priority: p.priority ?? 500 + idx,
      };
    })
  );

  // 3) Merge + sort by priority, strip internal field
  const merged = [...fromGithub, ...locals];
  const sorted = sortByPriority(merged);
  return sorted.map(({ _priority, ...rest }) => rest);
}
