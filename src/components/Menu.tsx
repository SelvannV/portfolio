"use client";

import { useState } from "react";

const MENU = ["introduction", "about", "projects", "contact"];

export function MenuButton({
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
      className={`group relative isolate overflow-hidden p-2 text-base uppercase transition-transform duration-150 ease-in-out active:scale-95 select-none ${
        active ? "text-white" : "text-black dark:text-white"
      }`}
    >
      <span
        className={`absolute inset-0 -z-10 origin-left bg-black transition-transform duration-300 ease-out dark:bg-white ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />

      <span className={`relative z-10 ${active ? "dark:text-black" : ""}`}>
        {String(index).padStart(2, "0")}. {label}
      </span>

      <span
        className={`absolute bottom-1 left-2 h-0.5 w-[calc(100%-1rem)] origin-left bg-current transition-transform duration-300 ease-out ${
          active ? "scale-x-0" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </button>
  );
}

export function Menu() {
  const [activeItem, setActiveItem] = useState("introduction");

  const navigateTo = (label: string) => {
    setActiveItem(label);

    document.getElementById(label)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="fixed right-0 top-0 z-30 flex h-dvh flex-col justify-center">
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
  );
}
