"use client";
import { type ReactNode } from "react";

interface CollapsibleSectionProps {
  title: string;
  icon?: ReactNode;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function CollapsibleSection({ title, icon, open, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="rounded-2xl bg-card/80 backdrop-blur-xl ring-1 ring-border/30 shadow-lg shadow-black/10 dark:shadow-black/30 overflow-visible">
      <button
        type="button"
        onClick={onToggle}
        className="sticky top-0 z-10 flex w-full items-center justify-between rounded-t-2xl px-4 py-2.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground bg-card/95 backdrop-blur-md transition-colors"
        style={{ borderBottom: open ? "1px solid oklch(0.5 0 0 / 10%)" : "none" }}
      >
        <span className="flex items-center gap-1.5">
          {icon && <span className="text-muted-foreground/60">{icon}</span>}
          {title}
        </span>
        <svg
          viewBox="0 0 10 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-2 w-2.5 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
        >
          <path d="M1 1L5 5L9 1" />
        </svg>
      </button>
      {open && (
        <div className="px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
}

export const CollapsibleCard = CollapsibleSection;
