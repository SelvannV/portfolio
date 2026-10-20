import { AccentDot } from "./AccentDot";
import type { ElementType, HTMLAttributes, ReactNode } from "react";

type HeadingProps<T extends ElementType = "h2"> = {
  as?: T;
  dot?: boolean;
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLHeadingElement>;

export function Heading<T extends ElementType = "h2">({
  as,
  dot = false,
  className = "",
  children,
  ...props
}: HeadingProps<T>) {
  const Component = as || "h2";

  return (
    <Component
      className={`font-medium tracking-tight ${className}`.trim()}
      {...props}
    >
      {children}
      {dot && <AccentDot />}
    </Component>
  );
}
