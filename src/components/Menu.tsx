"use client";

import { Card } from "@/components/ui";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const MENU = ["introduction", "about", "projects", "contact"];

function MenuButton({
  label,
  index,
  active,
  onClick,
}: {
  label: string;
  index: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "location" : undefined}
      className={`cursor-pointer group relative isolate w-fit shrink-0 overflow-hidden px-2 py-2 text-left text-[clamp(0.65rem,0.8vw,1rem)] uppercase tracking-wide transition-transform duration-150 ease-in-out active:scale-95 ${
        active
          ? "text-white dark:text-zinc-950"
          : "text-zinc-950 dark:text-white"
      }`}
    >
      <span
        className={`absolute inset-0 -z-10 origin-left bg-zinc-950 transition-transform duration-300 ease-out dark:bg-white ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />

      <span className="relative z-10">
        {String(index).padStart(2, "0")} — {label}
      </span>

      <span
        className={`absolute bottom-1 left-2 h-0.5 w-[calc(100%-1rem)] origin-left bg-current transition-transform duration-300 ease-out rounded-full ${
          active ? "scale-x-0" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </button>
  );
}

export function Menu() {
  const [activeItem, setActiveItem] = useState("introduction");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = MENU.map((id) => document.getElementById(id)).filter(
        (section): section is HTMLElement => section !== null,
      );

      if (sections.length === 0) return;

      // Ensure the final section becomes active at the bottom of the page.
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveItem(sections[sections.length - 1].id);
        return;
      }

      // Use a fixed point in the viewport to identify the active section.
      const referenceY = window.innerHeight * 0.35;

      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= referenceY && rect.bottom > referenceY;
      });

      if (currentSection) {
        setActiveItem(currentSection.id);
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const navigateTo = (id: string) => {
    setActiveItem(id);
    setMenuOpen(false);

    const section = document.getElementById(id);
    if (!section) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionHeight = section.offsetHeight;

    const targetTop = isMobile
      ? sectionTop + sectionHeight / 2 - window.innerHeight / 2
      : sectionTop;

    window.scrollTo({
      top: Math.max(
        0,
        Math.min(
          targetTop,
          document.documentElement.scrollHeight - window.innerHeight,
        ),
      ),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const activeIndex = MENU.indexOf(activeItem) + 1;
  const activeLabel = activeItem;

  return (
    <>
      {/* Mobile navigation */}
      <div className="fixed inset-x-0 top-3 z-40 px-4 md:hidden">
        <div className="relative mx-auto max-w-md">
          <Card className="flex items-center justify-between px-2 py-2 shadow-xs">
            <button
              type="button"
              onClick={() => navigateTo(activeItem)}
              className="flex min-w-0 items-center gap-3 px-2 py-2 text-left font-martian text-xs uppercase tracking-wider"
              aria-label={`Current section: ${activeLabel}`}
            >
              <span className="text-zinc-500 dark:text-zinc-400">
                {String(activeIndex).padStart(2, "0")}
              </span>
              <span className="truncate text-zinc-950 dark:text-white">
                {activeLabel}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="group flex size-10 shrink-0 items-center justify-center text-zinc-950 transition-transform duration-200 active:scale-90 dark:text-white"
            >
              <span className="relative flex h-4 w-5 flex-col items-center justify-center">
                <span
                  className={`absolute h-px w-5 bg-current transition-transform duration-300 ease-in-out ${
                    menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                  }`}
                />
                <span
                  className={`absolute h-px w-5 bg-current transition-all duration-200 ease-in-out ${
                    menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-px w-5 bg-current transition-transform duration-300 ease-in-out ${
                    menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                  }`}
                />
              </span>
            </button>
          </Card>

          {/* Animated dropdown */}
          <div
            id="mobile-navigation"
            aria-hidden={!menuOpen}
            className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
              menuOpen
                ? "mt-2 grid-rows-[1fr] opacity-100"
                : "pointer-events-none mt-0 grid-rows-[0fr] opacity-0"
            }`}
          >
            <nav className="overflow-hidden">
              <Card className="p-3 shadow-lg">
                <div className="flex flex-col items-start gap-1 font-martian">
                  {MENU.map((label, index) => (
                    <MenuButton
                      key={label}
                      label={label}
                      index={index + 1}
                      active={activeItem === label}
                      onClick={() => navigateTo(label)}
                    />
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <ThemeToggle onChange={() => setMenuOpen(false)} />
                </div>
              </Card>
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop navigation — original vertical style */}
      <div className="fixed right-0 top-0 z-40 hidden h-dvh flex-col justify-center md:flex">
        <nav className="flex flex-col items-end justify-center gap-6 px-8 font-martian">
          {MENU.map((label, index) => (
            <MenuButton
              key={label}
              label={label}
              index={index + 1}
              active={activeItem === label}
              onClick={() => navigateTo(label)}
            />
          ))}
        </nav>
      </div>
    </>
  );
}
