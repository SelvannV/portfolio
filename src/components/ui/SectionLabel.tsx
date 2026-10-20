import type { ElementType, HTMLAttributes, ReactNode } from "react";

type SectionLabelProps<T extends ElementType = "p"> = {
  as?: T;
  size?: "xs" | "sm";
  count?: number;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

export function SectionLabel<T extends ElementType = "p">({
  as,
  size = "sm",
  count,
  className = "",
  children,
  ...props
}: SectionLabelProps<T>) {
  const Component = as || "p";

  const sizeClasses =
    size === "xs"
      ? "text-[10px] tracking-[0.18em]"
      : "text-xs tracking-[0.2em]";

  const baseClasses =
    "font-martian uppercase text-zinc-500 dark:text-zinc-400";

  return (
    <Component
      className={`${baseClasses} ${sizeClasses} ${className}`.trim()}
      {...props}
    >
      {children}
      {typeof count === "number" && (
        <>
          {" "}
          <span className="text-primary-500">({count})</span>
        </>
      )}
    </Component>
  );
}
