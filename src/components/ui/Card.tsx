import type { ElementType, HTMLAttributes, ReactNode } from "react";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  interactive?: boolean;
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function Card<T extends ElementType = "div">({
  as,
  interactive = false,
  className = "",
  children,
  ...props
}: CardProps<T>) {
  const Component = as || "div";

  const baseClasses =
    "rounded-xs border border-zinc-200/80 bg-zinc-50/75 dark:border-white/10 dark:bg-zinc-950/75";
  const interactiveClasses = interactive
    ? "transition-colors hover:border-primary-400/60 dark:hover:border-primary-400/40"
    : "";

  return (
    <Component
      className={`${baseClasses} ${interactiveClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
}
