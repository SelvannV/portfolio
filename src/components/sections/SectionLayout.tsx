import type { ReactNode } from "react";
import { Reveal } from "../Reveal";
import { Section } from "../Section";
import { SectionLabel } from "../ui";

type SectionLayoutProps = {
  id: string;
  label: string;
  scrollScreens?: number;
  children: ReactNode;
  indicatorText?: string;
  endText?: string;
  end?: string;
  showFooter?: boolean;
};

export function SectionLayout({
  id,
  label,
  scrollScreens = 1,
  children,
  indicatorText,
  end,
  endText,
  showFooter = true,
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
          <SectionLabel size="sm">{label}</SectionLabel>
        </Reveal>

        {children}

        {showFooter && (
          <Reveal
            preset="blur"
            duration={0.75}
            delay={0.75}
            className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-center md:bottom-16"
          >
            {(end || endText) && (
              <div className="flex items-center justify-center gap-3">
                {endText && <SectionLabel size="sm">{endText}</SectionLabel>}

                {end && (
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className="cursor-pointer font-martian text-xs uppercase tracking-widest text-zinc-500 underline decoration-zinc-500 decoration-1 underline-offset-4 transition-colors hover:text-primary-600 hover:decoration-primary-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-600 dark:text-zinc-400 dark:decoration-zinc-400 dark:hover:text-primary-400 dark:hover:decoration-primary-400 dark:focus-visible:outline-primary-400"
                  >
                    {end}
                  </button>
                )}
              </div>
            )}

            {indicatorText && (
              <SectionLabel size="sm" className="w-full">
                {indicatorText}
              </SectionLabel>
            )}

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
        )}
      </div>
    </Section>
  );
}
