"use client";

import { useCopyToClipboard } from "./useCopyToClipboard";
import { Check, Copy } from "lucide-react";
import { type ReactNode } from "react";

type Props = {
  text: string;
  className?: string;
  children?: ReactNode; // optional label/content
  iconOnly?: boolean;
  ariaLabel?: string;
};

export function CopyButton({
  text,
  className = "",
  children,
  iconOnly = false,
  ariaLabel = "Copy to clipboard",
}: Props) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-1.5 rounded-md border border-white/20 px-3 py-1.5 text-xs text-foreground transition hover:border-accent hover:bg-white/5 ${className}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {!iconOnly && <span>{copied ? "Copied!" : children ?? "Copy"}</span>}
    </button>
  );
}
