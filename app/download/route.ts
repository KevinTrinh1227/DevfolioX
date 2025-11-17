// app/download/route.ts
import { NextResponse } from "next/server";

function parseGithubRepo(
  input: string
): { owner: string; repo: string } | null {
  const trimmed = input.trim();

  // Case 1: plain "owner/repo"
  if (!trimmed.includes("://") && !trimmed.includes("github.com")) {
    const clean = trimmed.replace(/^\/+|\/+$/g, ""); // trim leading/trailing slashes
    const parts = clean.split("/");
    if (parts.length >= 2) {
      let repo = parts[1];
      if (repo.endsWith(".git")) repo = repo.slice(0, -4);
      return { owner: parts[0], repo };
    }
    return null;
  }

  // Case 2: full URL or "github.com/owner/repo"
  try {
    const url = trimmed.includes("://")
      ? new URL(trimmed)
      : new URL(`https://${trimmed}`);

    if (!url.hostname.includes("github.com")) return null;

    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;

    const owner = parts[0];
    let repo = parts[1];

    if (repo.endsWith(".git")) repo = repo.slice(0, -4);

    return { owner, repo };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // support both ?repo= and ?url=
  const repoParam = searchParams.get("repo") ?? searchParams.get("url");

  if (!repoParam) {
    return new NextResponse(
      'Missing "repo" query param. Example: /download?repo=OWNER/REPO',
      { status: 400 }
    );
  }

  const parsed = parseGithubRepo(repoParam);
  if (!parsed) {
    return new NextResponse(
      `Invalid GitHub value "${repoParam}". Expected something like OWNER/REPO or https://github.com/OWNER/REPO`,
      { status: 400 }
    );
  }

  const { owner, repo } = parsed;
  const fallbackZip = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;

  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      {
        headers: { Accept: "application/vnd.github+json" },
        cache: "no-store", // always fresh
      }
    );

    if (!res.ok) {
      return NextResponse.redirect(fallbackZip, 302);
    }

    const data = (await res.json()) as any;
    const tag = data.tag_name as string | undefined;
    const assets = (data.assets ?? []) as any[];

    let downloadUrl: string | undefined;

    // 1) Prefer real release asset
    if (assets.length > 0 && assets[0].browser_download_url) {
      downloadUrl = assets[0].browser_download_url as string;
    }
    // 2) Else use tag archive
    else if (tag) {
      downloadUrl = `https://github.com/${owner}/${repo}/archive/refs/tags/${tag}.zip`;
    }

    // 3) Fallback: main branch zip
    if (!downloadUrl) {
      downloadUrl = fallbackZip;
    }

    return NextResponse.redirect(downloadUrl, 302);
  } catch {
    return NextResponse.redirect(fallbackZip, 302);
  }
}
