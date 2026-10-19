"use client";

import { useFlightPaths } from "@/components/FlightPaths";
import { useRestartAnimations } from "@/components/Reveal";
import {
  MonitorSmartphone,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Sun,
} from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";

const STORAGE_KEY = "portfolio-theme";
const THEME_CHANGE_EVENT = "portfolio-theme-change";

const themes: {
  value: Theme;
  label: string;
  icon: typeof MonitorSmartphone;
}[] = [
  { value: "system", label: "System", icon: MonitorSmartphone },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

function isTheme(value: string | null): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

function getThemeSnapshot(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY);
  return isTheme(saved) ? saved : "system";
}

function getServerThemeSnapshot(): Theme {
  return "system";
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function applyTheme(theme: Theme) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);

  document.documentElement.classList.toggle("dark", isDark);
}

function setThemePreference(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function ThemeToggle({
  className = "",
  onChange,
}: {
  className?: string;
  onChange?: () => void;
}) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const restartAnimations = useRestartAnimations();
  const { paused, toggle } = useFlightPaths();

  const systemPrefersDark = useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      media.addEventListener("change", callback);

      return () => media.removeEventListener("change", callback);
    },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme, systemPrefersDark]);

  return (
    <div
      className={`inline-flex w-fit self-start items-center gap-1 border rounded-xs border-zinc-200 bg-white/80 p-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/80 ${className}`}
      role="group"
      aria-label="Display preferences"
    >
      <button
        type="button"
        onClick={() => {
          restartAnimations();
          onChange?.();
        }}
        aria-label="Restart animations"
        title="Restart animations"
        className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-xs text-zinc-500 transition-colors hover:bg-primary-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-primary-600/15 dark:hover:text-white"
      >
        <RotateCcw size={16} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        onClick={() => {
          toggle();
          onChange?.();
        }}
        aria-label={paused ? "Resume animations" : "Pause animations"}
        aria-pressed={paused}
        title={paused ? "Resume animations" : "Pause animations"}
        className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-xs text-zinc-500 transition-colors hover:bg-primary-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-primary-600/15 dark:hover:text-white"
      >
        {paused ? (
          <Play size={16} strokeWidth={1.8} />
        ) : (
          <Pause size={16} strokeWidth={1.8} />
        )}
      </button>

      <div className="mx-1 h-5 w-px bg-zinc-200 dark:bg-white/10" />

      {themes.map(({ value, label, icon: Icon }) => {
        const selected = theme === value;

        return (
          <button
            key={value}
            type="button"
            onClick={() => {
              setThemePreference(value);
              onChange?.();
            }}
            aria-label={`${label} theme`}
            aria-pressed={selected}
            title={`${label} theme`}
            className={`cursor-pointer flex h-9 w-9 items-center justify-center rounded-xs transition-colors ${
              selected
                ? "bg-zinc-200 text-zinc-950 dark:bg-white/15 dark:text-white"
                : "text-zinc-500 hover:bg-primary-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-primary-600/15 dark:hover:text-white"
            }`}
          >
            <Icon size={16} strokeWidth={1.8} />
          </button>
        );
      })}
    </div>
  );
}
