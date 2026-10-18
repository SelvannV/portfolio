import { Reveal } from "../Reveal";
import { SectionLayout } from "./SectionLayout";

export function Introduction() {
  return (
    <SectionLayout
      id="introduction"
      label="01 — Introduction"
      scrollScreens={1.5}
      indicatorText="Start scrolling"
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center text-center">
        <Reveal preset="scale" duration={0.75} delay={0.3} className="w-full">
          <p className="font-martian text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 sm:text-sm">
            Welcome to my portfolio
          </p>

          <h1 className="mx-auto mt-6 max-w-5xl select-text text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Hello, I'm{" "}
            <span className="whitespace-nowrap bg-linear-to-b from-primary-500 to-primary-700 bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-600">
              Selvann V
            </span>
          </h1>

          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 sm:mt-8 sm:text-lg">
            French student & Developper
          </p>
        </Reveal>
      </div>
    </SectionLayout>
  );
}
