"use client";

import styles from "@/css/scroll.module.css";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

      setScrollProgress(Math.round(progress));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <div
      className={`${styles.scrollProgress} pointer-events-none fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-4 sm:px-6`}
    >
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-300/60 dark:bg-zinc-700">
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-zinc-300/60 dark:bg-zinc-700">
          <div
            className="absolute inset-y-0 left-0 z-10 overflow-hidden rounded-full transition-[width] duration-150"
            style={{ width: `${scrollProgress}%` }}
          >
            <div className="absolute inset-y-0 left-0 w-[100cqw] bg-linear-90 from-primary-950 to-primary-600 dark:from-primary-200 dark:to-primary-500" />
          </div>
        </div>
      </div>

      <span className="min-w-10 text-right font-martian text-xs tabular-nums text-zinc-600 dark:text-zinc-300">
        {String(scrollProgress).padStart(2, "0")}%
      </span>
    </div>
  );
}
