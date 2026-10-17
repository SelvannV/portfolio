"use client";

import { BackgroundGrid } from "@/components/BackgroundGrid";
import { Menu } from "@/components/Menu";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main
      onMouseMove={(e) => {
        if (e.pointerType === "touch") return;

        document.documentElement.style.setProperty("--x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--y", `${e.clientY}px`);
      }}
      className="relative isolate min-h-dvh bg-zinc-50 font-sans dark:bg-neutral-950"
    >
      <BackgroundGrid />
      <Menu />

      {/* Introduction */}

      <section
        id="introduction"
        className="relative z-10 min-h-dvh md:h-[200svh] md:min-h-0"
      >
        <div className="flex min-h-dvh items-center px-5 pt-20 sm:px-8 md:sticky md:top-0 md:h-dvh md:px-16 md:pt-0 lg:px-24">
          <Reveal>
            <p className="font-martian text-xs uppercase tracking-widest text-zinc-500 sm:text-sm">
              Welcome to my portfolio
            </p>

            <h1 className="mt-6 max-w-5xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Building things
              <br />
              for the web.
            </h1>

            <p className="mt-6 max-w-lg text-base text-zinc-600 dark:text-zinc-400 sm:mt-8 sm:text-lg">
              Developer, creator, and curious mind.
            </p>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative z-10 flex min-h-dvh scroll-mt-20 items-center px-5 py-24 sm:px-8 md:px-16 lg:px-24"
      >
        <Reveal>
          <p className="font-martian text-xs uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
            01 — About
          </p>

          <h2 className="mt-5 max-w-4xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:mt-6 md:text-6xl lg:text-7xl">
            Curious by nature.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Developer by choice.
          </h2>
        </Reveal>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="relative z-10 flex min-h-dvh scroll-mt-20 items-center px-5 py-24 sm:px-8 md:px-16 lg:px-24"
      >
        <Reveal>
          <p className="font-martian text-xs uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
            02 — Selected work
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:mt-6 md:text-7xl lg:text-8xl">
            Things I've built.
          </h2>
        </Reveal>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative z-10 flex min-h-dvh scroll-mt-20 items-center px-5 py-24 sm:px-8 md:px-16 lg:px-24"
      >
        <Reveal>
          <p className="font-martian text-xs uppercase tracking-[0.2em] text-zinc-500 sm:text-sm">
            03 — Contact
          </p>

          <h2 className="mt-5 text-5xl font-medium leading-tight tracking-tight sm:text-6xl md:mt-6 md:text-7xl lg:text-8xl">
            Let's talk.
          </h2>
        </Reveal>
      </section>

      <ScrollProgress />
    </main>
  );
}
