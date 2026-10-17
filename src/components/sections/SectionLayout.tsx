import type { ReactNode } from "react";
import { Reveal } from "../Reveal";
import { Section } from "../Section";

type SectionLayoutProps = {
  id: string;
  label: string;
  scrollScreens?: number;
  children: ReactNode;
  indicatorText?: string;
  endText?: string;
  end?: string;
};

const labelStyle =
  "font-martian text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400";

export function SectionLayout({
  id,
  label,
  scrollScreens = 1,
  children,
  indicatorText,
  end,
  endText,
}: SectionLayoutProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasEnd = Boolean(end || endText);
  const hasIndicator = Boolean(indicatorText);

  return (
    <Section
      id={id}
      sticky
      scrollScreens={scrollScreens}
      contentClassName="relative w-full items-center justify-center px-5 sm:px-8 md:px-16 lg:px-24"
    >
      <div className="relative flex min-h-dvh w-full flex-col md:min-h-0 md:h-full">
        <Reveal
          preset="blur"
          duration={0.75}
          delay={0.2}
          className="absolute top-8 hidden md:flex"
        >
          <p className={labelStyle}>{label}</p>
        </Reveal>

        {children}

        <Reveal
          preset="blur"
          duration={0.75}
          delay={0.75}
          className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-center md:bottom-16"
        >
          {(end || endText) && (
            <div className="flex items-center justify-center gap-3">
              {endText && <p className={labelStyle}>{endText}</p>}

              {end && (
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="cursor-pointer font-martian text-xs uppercase tracking-widest text-zinc-500 underline decoration-zinc-500 decoration-1 underline-offset-4 transition-colors hover:text-indigo-500 hover:decoration-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500 dark:text-zinc-400 dark:decoration-zinc-400 dark:hover:text-indigo-400 dark:hover:decoration-indigo-400"
                >
                  {end}
                </button>
              )}
            </div>
          )}

          {/* Show indicator text whenever provided */}
          {indicatorText && (
            <p className="w-full font-martian text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {indicatorText}
            </p>
          )}

          {/*
            Arrow visibility:
            - Never show when end or endText exists.
            - Show when indicatorText exists, on mobile and desktop.
            - Without indicatorText, show only on desktop.
          */}
          <svg
            aria-hidden="true"
            width="16"
            height="28"
            viewBox="0 0 16 28"
            fill="none"
            className={`text-zinc-400 dark:text-zinc-500 ${
              hasEnd ? "hidden" : hasIndicator ? "block" : "hidden md:block"
            }`}
          >
            <path
              d="M8 1V26M2 20L8 26L14 20"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Reveal>
      </div>
    </Section>
  );
}
