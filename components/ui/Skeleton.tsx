// components/ui/Skeleton.tsx
import type { HTMLAttributes } from "react";

export function Skeleton(props: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`skeleton ${props.className ?? ""}`} />;
}
