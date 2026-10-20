import type { ReactNode } from "react";

type AccentDotProps = {
  children?: ReactNode;
  char?: string;
  className?: string;
};

export function AccentDot({
  children,
  char = ".",
  className = "",
}: AccentDotProps) {
  return (
    <span className={`text-primary-500 ${className}`.trim()}>
      {children ?? char}
    </span>
  );
}
