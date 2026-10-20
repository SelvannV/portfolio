import type { HTMLAttributes } from "react";

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Divider({
  orientation = "horizontal",
  className = "",
  ...props
}: DividerProps) {
  const hasHeight = /\bh-/.test(className);
  const baseClasses =
    orientation === "vertical"
      ? `w-px shrink-0 ${hasHeight ? "" : "h-full"} bg-zinc-200/80 dark:bg-white/10`
      : "h-px w-full bg-zinc-200/80 dark:bg-white/10";

  return (
    <div
      aria-hidden="true"
      className={`${baseClasses} ${className}`.trim()}
      {...props}
    />
  );
}
