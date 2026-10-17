"use client";

import { BackgroundGrid } from "@/components/BackgroundGrid";
import { Menu } from "@/components/Menu";
import { AnimationRestartProvider } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Introduction } from "@/components/sections/Introduction";
import { Projects } from "@/components/sections/Projects";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <AnimationRestartProvider>
      <main
        onMouseMove={(e: React.PointerEvent<HTMLElement>) => {
          if (e.pointerType === "touch") return;

          document.documentElement.style.setProperty("--x", `${e.clientX}px`);
          document.documentElement.style.setProperty("--y", `${e.clientY}px`);
        }}
        className="relative isolate min-h-dvh bg-zinc-50 font-sans text-zinc-950 transition-colors duration-300 dark:bg-neutral-950 dark:text-white"
      >
        <BackgroundGrid />
        <Menu />

        <div className="fixed right-5 top-5 z-50 hidden items-center gap-4 md:flex">
          <ThemeToggle />
        </div>

        <Introduction />
        <About />
        <Projects />
        <Contact />

        <ScrollProgress />
      </main>
    </AnimationRestartProvider>
  );
}
