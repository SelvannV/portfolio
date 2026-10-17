import type { ReactNode } from "react";

type AboutCardProps = {
  label: string;
  index: string;
  children: ReactNode;
  className?: string;
};

const cardStyle =
  "rounded-xs border border-zinc-200/70 bg-white/70 p-5 shadow-sm backdrop-blur-xl sm:p-6 dark:border-white/10 dark:bg-neutral-900/60";

export function AboutCard({
  label,
  index,
  children,
  className = "",
}: AboutCardProps) {
  return (
    <div className={`${cardStyle} h-full ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="font-martian text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {label}
        </span>

        <span className="font-martian text-[10px] tracking-widest text-zinc-400">
          {index}
        </span>
      </div>

      {children}
    </div>
  );
}
