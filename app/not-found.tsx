// app/not-found.tsx
import Link from "next/link";
import { Home, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center text-foreground">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          ~/404
        </p>

        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm text-muted-foreground sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-transform transition-colors hover:-translate-y-[1px] hover:bg-accent/90"
          >
            <Home className="h-4 w-4" />
            <span>Back to home</span>
          </Link>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm text-foreground transition-transform transition-colors hover:-translate-y-[1px] hover:border-accent hover:bg-white/5"
          >
            <Mail className="h-4 w-4" />
            <span>Contact me</span>
          </a>
        </div>
      </div>
    </main>
  );
}
