import { BackgroundGrid } from "@/components/BackgroundGrid";
import { FlightPathsProvider } from "@/components/FlightPaths";
import { AnimationRestartProvider, Reveal } from "@/components/Reveal";
import { SectionLayout } from "@/components/sections/SectionLayout";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const labelStyle =
  "font-martian text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400";

export default function NotFound() {
  return (
    <AnimationRestartProvider>
      <FlightPathsProvider>
        <main className="relative isolate min-h-dvh overflow-hidden bg-zinc-50 font-sans text-zinc-950 dark:bg-neutral-950 dark:text-white">
          <BackgroundGrid />

          <SectionLayout
            id="not-found"
            label="404 — Not Found"
            scrollScreens={0}
            showFooter={false}
          >
            <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16">
              <div className="relative z-10 mx-auto w-full max-w-3xl">
                <Reveal preset="blur" duration={0.75} delay={0.3}>
                  <p className={labelStyle}>
                    404 <span className="text-primary-500">—</span> Page not
                    found
                  </p>
                </Reveal>

                <Reveal preset="rise" duration={0.8} delay={0.4}>
                  <h1 className="mt-6 text-7xl leading-none font-medium tracking-tight sm:text-9xl">
                    404<span className="text-primary-500">.</span>
                  </h1>
                </Reveal>

                <Reveal preset="rise" duration={0.75} delay={0.55}>
                  <p className="mt-6 max-w-md text-sm leading-7 text-zinc-600 sm:text-base dark:text-zinc-400">
                    This page doesn't seem to exist. It may have been moved or
                    the link might be incorrect.
                  </p>
                </Reveal>

                <Reveal preset="rise" duration={0.75} delay={0.7}>
                  <Link
                    href="/"
                    className="group mt-8 inline-flex items-center gap-2 text-sm text-zinc-700 transition-colors hover:text-primary-600 dark:text-zinc-300 dark:hover:text-primary-400"
                  >
                    <ArrowLeft
                      size={15}
                      className="transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    Back to home
                  </Link>
                </Reveal>
              </div>
            </div>
          </SectionLayout>

          <div className="fixed right-5 top-5 z-50 hidden items-center gap-4 md:flex">
            <ThemeToggle />
          </div>
        </main>
      </FlightPathsProvider>
    </AnimationRestartProvider>
  );
}
