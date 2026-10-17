"use client";

import { BackgroundGrid } from "@/components/BackgroundGrid";
import { Menu } from "@/components/Menu";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main
      onMouseMove={(e) => {
        document.documentElement.style.setProperty("--x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--y", `${e.clientY}px`);
      }}
      className="relative isolate bg-zinc-50 font-sans dark:bg-neutral-950"
    >
      <BackgroundGrid />

      {/* Fixed menu */}
      <Menu />

      {/* Pinned introduction: stays in place while the page scrolls */}
      <section id="introduction" className="relative z-10 h-[200svh]">
        <div className="sticky top-0 flex h-dvh items-center px-8 md:px-24">
          <Reveal>
            <p className="font-martian text-sm uppercase tracking-widest text-zinc-500">
              Welcome to my portfolio
            </p>

            <h1 className="mt-6 max-w-5xl text-6xl font-medium tracking-tight md:text-8xl">
              Building things
              <br />
              for the web.
            </h1>

            <p className="mt-8 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
              Developer, creator, and curious mind.
            </p>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="relative z-10 flex min-h-dvh items-center px-8 md:px-24 "
      >
        <Reveal>
          <p className="font-martian text-sm uppercase tracking-widest text-zinc-500">
            01 — About
          </p>

          <h2 className="mt-6 max-w-4xl text-5xl font-medium tracking-tight md:text-7xl">
            Curious by nature.
            <br />
            Developer by choice.
          </h2>
        </Reveal>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="relative z-10 flex min-h-dvh items-center px-8 md:px-24"
      >
        <Reveal>
          <p className="font-martian text-sm uppercase tracking-widest text-zinc-500">
            02 — Selected work
          </p>

          <h2 className="mt-6 text-5xl font-medium tracking-tight md:text-8xl">
            Things I've built.
          </h2>
        </Reveal>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative z-10 flex min-h-dvh items-center px-8 md:px-24"
      >
        <Reveal>
          <p className="font-martian text-sm uppercase tracking-widest text-zinc-500">
            03 — Contact
          </p>

          <h2 className="mt-6 text-6xl font-medium tracking-tight md:text-8xl">
            Let's talk.
          </h2>
        </Reveal>
      </section>

      <ScrollProgress />
    </main>
  );
}
