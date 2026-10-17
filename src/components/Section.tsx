import type { CSSProperties, ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  sticky?: boolean;
  scrollScreens?: number;
  className?: string;
  contentClassName?: string;
};

export function Section({
  id,
  children,
  sticky = false,
  scrollScreens = 1,
  className = "",
  contentClassName = "",
}: SectionProps) {
  const style = {
    "--section-height": `${100 * (1 + Math.max(0, scrollScreens))}svh`,
  } as CSSProperties;

  return (
    <section
      id={id}
      style={style}
      className={`relative z-10 min-h-dvh ${
        sticky ? "md:h-(--section-height) md:min-h-0" : ""
      } ${className}`}
    >
      <div
        className={`flex min-h-dvh ${
          sticky ? "md:sticky md:top-0 md:h-dvh" : ""
        } ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
