import type { Project } from "@/types/projects";
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export type ProjectTag = Project["tags"][number];

const TAG_STYLES: Record<ProjectTag, string> = {
  archived:
    "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400",
  live: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400",
  "in progress":
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400",
  new: "border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-900 dark:bg-primary-950/50 dark:text-primary-400",
  deprecated:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400",
  "open source":
    "border-lime-200 bg-lime-50 text-lime-700 dark:border-lime-900 dark:bg-lime-950/50 dark:text-lime-400",
  featured:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400",
  experimental:
    "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-400",
};

const SIZE_STYLES = {
  xs: "px-2 py-1 text-[9px] font-martian uppercase tracking-[0.15em]",
  sm: "px-2 py-1 text-[11px]",
  md: "px-2.5 py-1.5 text-xs",
} as const;

type BaseBadgeProps = {
  size?: keyof typeof SIZE_STYLES;
  tag?: ProjectTag;
  variant?: "default" | "subtle";
  interactive?: boolean;
  children: ReactNode;
  className?: string;
};

type SpanBadgeProps = BaseBadgeProps & {
  as?: "span";
} & HTMLAttributes<HTMLSpanElement>;

type ButtonBadgeProps = BaseBadgeProps & {
  as: "button";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type BadgeProps = SpanBadgeProps | ButtonBadgeProps;

export function Badge({
  as = "span",
  size = "sm",
  tag,
  variant = "default",
  interactive = false,
  children,
  className = "",
  ...props
}: BadgeProps) {
  const sizeClasses = SIZE_STYLES[size];

  let colorClasses = "";
  if (tag) {
    colorClasses = TAG_STYLES[tag];
  } else if (variant === "subtle") {
    colorClasses =
      "border-zinc-200/80 bg-zinc-50 font-martian text-zinc-500 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-400";
  } else {
    colorClasses =
      "border-zinc-200/80 text-zinc-600 dark:border-white/10 dark:text-zinc-400";
  }

  const interactiveClasses = interactive
    ? "transition-colors duration-200 hover:border-primary-500/50 hover:text-primary-600 dark:hover:border-primary-400/40 dark:hover:text-primary-400 cursor-pointer"
    : "";

  const classes =
    `shrink-0 rounded-xs border ${sizeClasses} ${colorClasses} ${interactiveClasses} ${className}`.trim();

  if (as === "button") {
    const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }

  const spanProps = props as HTMLAttributes<HTMLSpanElement>;
  return (
    <span className={classes} {...spanProps}>
      {children}
    </span>
  );
}
