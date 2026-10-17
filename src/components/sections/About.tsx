import { Reveal } from "../Reveal";
import { SectionLayout } from "./SectionLayout";

const labelStyle =
  "font-martian text-[10px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400";

export function About() {
  return (
    <SectionLayout id="about" label="02 — About" scrollScreens={1.5}>
      <div className="flex w-full flex-1 flex-col justify-center py-20 md:py-16">
        <div className="mx-auto w-full max-w-5xl">
          {/* Introduction */}
          <Reveal preset="blur" duration={0.75} delay={0.3}>
            <div className="max-w-3xl">
              <h2 className="mt-5 text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
                Hello<span className="text-indigo-500">.</span>
              </h2>

              <div className="mt-7 rounded-sm border border-zinc-200/80 bg-zinc-50/75 p-5 sm:p-7 md:p-9 dark:border-white/10 dark:bg-neutral-950/75">
                {/* Letter heading */}
                <div className="flex items-center justify-between gap-4 border-b border-zinc-200/70 pb-4 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-0.5 rounded-full bg-indigo-500" />
                    <p className={labelStyle}>A little about me</p>
                  </div>

                  <span className="font-martian text-[10px] text-zinc-400 dark:text-zinc-500">
                    NOTE <span className="text-indigo-500">No. 01</span>
                  </span>
                </div>

                {/* Letter body */}
                <div className="mt-6 select-text space-y-4 text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8 dark:text-zinc-400">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Rerum blanditiis eaque adipisci molestias dolorum? Culpa,
                    perspiciatis tempora itaque nam quos, architecto ratione
                    veniam nihil esse nostrum voluptatibus consectetur
                    asperiores vitae?
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Beatae temporibus corporis odit repellat sapiente architecto
                    hic corrupti, ab maxime vero laudantium dignissimos dolore
                    accusantium adipisci veniam cum amet tenetur aspernatur.
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-8 flex justify-end border-t border-zinc-200/70 pt-5 dark:border-white/10">
                  <div className="text-right">
                    <p className="font-serif text-3xl italic tracking-tight text-zinc-800 dark:text-zinc-200">
                      Selvann<span className="text-indigo-500">.</span>
                    </p>

                    <p className="mt-2 font-martian text-[9px] uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                      17 · 10 · 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Personal details */}
          <div className="mt-10 grid grid-cols-1 gap-8 border-t border-zinc-200/70 pt-6 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 dark:border-white/10">
            <Reveal preset="blur" duration={0.75} delay={0.4}>
              <div>
                <p className={labelStyle}>Things I enjoy</p>

                <div className="mt-4 space-y-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                  {[
                    "Building things from scratch",
                    "Exploring new ideas",
                    "Getting the details right",
                  ].map((interest) => (
                    <p key={interest} className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-full bg-indigo-500/70"
                      />
                      {interest}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal preset="blur" duration={0.75} delay={0.5}>
              <div>
                <p className={labelStyle}>Languages</p>

                <ul className="mt-4 divide-y divide-zinc-200/70 text-sm dark:divide-white/10">
                  {[
                    ["French", "Native"],
                    ["English", "Fluent"],
                    ["German", "Learning"],
                  ].map(([language, level]) => (
                    <li
                      key={language}
                      className="flex items-center justify-between gap-3 py-2 first:pt-0"
                    >
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {language}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal preset="blur" duration={0.75} delay={0.6}>
              <div>
                <p className={labelStyle}>A few tools I use</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "TypeScript",
                    "React",
                    "Next.js",
                    "React Native",
                    "Tailwind CSS",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-sm border border-zinc-200/80 px-2.5 py-1.5 text-xs text-zinc-600 transition-colors duration-200 hover:border-indigo-500/50 hover:text-indigo-600 dark:border-white/10 dark:text-zinc-400 dark:hover:text-indigo-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
