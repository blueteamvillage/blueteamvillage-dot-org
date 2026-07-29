import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
 * Section label. Replaces the old `.log-line` motif with the eyebrow the CTF
 * site uses above every heading — mint, uppercase, widely tracked.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-[0.25em] text-mint",
        className,
      )}
    >
      {children}
    </p>
  );
}
