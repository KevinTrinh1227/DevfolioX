// config/projects.ts
import rawConfig from "./devfoliox.projects.json";

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
};

// raw JSON shapes
type RawGithubReadmeProject = {
  repo_url: string;
  priority?: number;
};

type RawLocalProject = ProjectItem & {
  priority?: number;
};

type RawConfig = {
  github_readme_projects: RawGithubReadmeProject[];
  local_projects: RawLocalProject[];
};

const cfg = rawConfig as RawConfig;

// helpers

function parseOwnerRepo(url: string): { owner: string; repo: string } {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/?/i);
  if (!match) throw new Error(`Invalid GitHub repo URL: ${url}`);
  return { owner: match[1], repo: match[2] };
}

function extractMetaFromReadme(readme: string) {
  const match = readme.match(
    /<!--\s*devfoliox(?:-project)?\s*([\s\S]*?)\s*-->/i
  );
  if (!match) return null;

  const jsonText = match[1].trim();
  try {
    return JSON.parse(jsonText) as {
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
  } catch {
    return null;
  }
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

  if (!wantStars && !wantForks && !wantDownloads) {
    return {};
  }

  let stars: number | undefined;
  let forks: number | undefined;
  let downloads: number | undefined;

  const promises: Promise<any>[] = [];

  // /repos for stars + forks
  if (wantStars || wantForks) {
    promises.push(
      fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: revalidateSeconds },
      }).then((res) => (res.ok ? res.json() : null))
    );
  } else {
    promises.push(Promise.resolve(null));
  }

  // /releases for downloads
  if (wantDownloads) {
    promises.push(
      fetch(`https://api.github.com/repos/${owner}/${repo}/releases`, {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: revalidateSeconds },
      }).then((res) => (res.ok ? res.json() : null))
    );
  } else {
    promises.push(Promise.resolve(null));
  }

  const [repoJson, releasesJson] = await Promise.all(promises);

  if (repoJson) {
    if (wantStars) stars = repoJson.stargazers_count;
    if (wantForks) forks = repoJson.forks_count;
  }

  if (Array.isArray(releasesJson) && wantDownloads) {
    downloads = releasesJson.reduce((sum, rel: any) => {
      const assets = rel.assets ?? [];
      return (
        sum +
        assets.reduce((s: number, a: any) => s + (a.download_count ?? 0), 0)
      );
    }, 0);
  }

  return { stars, forks, downloads };
}

function sortByPriority<T extends { _priority?: number }>(items: T[]) {
  return items.sort((a, b) => (a._priority ?? 999) - (b._priority ?? 999));
}

// main loader

export async function loadProjects(): Promise<ProjectItem[]> {
  const revalidateSeconds = 60 * 60 * 3; // 3h, you can keep or tweak

  const fromGithub = await Promise.all(
    cfg.github_readme_projects.map(async (entry, idx) => {
      const { owner, repo } = parseOwnerRepo(entry.repo_url);
      const id = `${owner}-${repo}`.toLowerCase();

      const readmeRes = await fetch(
        `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/README.md`,
        { next: { revalidate: revalidateSeconds } }
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

      const readme = await readmeRes.text();
      const meta = extractMetaFromReadme(readme);

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
        githubStars: stars ?? meta?.githubStars,
        githubForks: forks ?? meta?.githubForks,
        downloads: downloads ?? meta?.downloads,
        _priority: entry.priority ?? idx + 1,
      } as ProjectItem & { _priority?: number };
    })
  );

  // 👇 updated locals section
  const locals: (ProjectItem & { _priority?: number })[] = await Promise.all(
    cfg.local_projects.map(async (p, idx) => {
      let stars: number | undefined;
      let forks: number | undefined;
      let downloads: number | undefined;

      if (p.githubRepoUrl && p.stats) {
        const { owner, repo } = parseOwnerRepo(p.githubRepoUrl);
        const statResult = await fetchGithubStats(
          owner,
          repo,
          {
            stats_stars: p.stats.stars,
            stats_forks: p.stats.forks,
            stats_downloads: p.stats.downloads,
          },
          revalidateSeconds
        );
        stars = statResult.stars;
        forks = statResult.forks;
        downloads = statResult.downloads;
      }

      return {
        ...p,
        githubStars: stars ?? p.githubStars,
        githubForks: forks ?? p.githubForks,
        downloads: downloads ?? p.downloads,
        _priority: p.priority ?? 500 + idx,
      };
    })
  );

  const merged = [...fromGithub, ...locals];
  const sorted = sortByPriority(merged);

  return sorted.map(({ _priority, ...rest }) => rest);
}
