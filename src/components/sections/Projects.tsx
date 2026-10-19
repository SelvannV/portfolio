import projectsData from "@/data/projects.json";
import { Project } from "@/types/projects";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "../Reveal";
import { SectionLayout } from "./SectionLayout";

const TAG_STYLES: Record<Project["tags"][number], string> = {
  archived:
    "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400",
  live: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400",
  "in progress":
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400",
  new: "border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-900 dark:bg-primary-950/50 dark:text-primary-400",
  deprecated:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400",
  "open source":
    "border-lime-200 bg-lime-50 text-lime-700 dark:border-lime-900 dark:bg-lime-950/50 dark:text-lime-400",
  featured:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-400",
  experimental:
    "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/50 dark:text-cyan-400",
};

const projects = projectsData as unknown as Project[];
const TOTAL_PROJECT_SLOTS = 7;

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function ProjectImage({
  src,
  alt,
  number,
}: {
  src?: string;
  alt: string;
  number: number;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || src === "__FORCE_PLACEHOLDER__" || failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <span className="absolute -right-3 -top-10 select-none text-[11rem] font-medium leading-none tracking-[-0.12em] text-zinc-200 dark:text-white/5">
          {String(number).padStart(2, "0")}
        </span>

        <div className="relative flex items-center gap-4">
          <span className="h-12 w-px rotate-25 bg-primary-500/70" />
          <span className="font-martian text-[10px] uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
            Project {String(number).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute bottom-4 left-5 right-5 h-px bg-zinc-200/70 dark:bg-white/10" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      onError={(e) => {
        setFailed(true);
        console.error(e);
      }}
    />
  );
}

function ProjectStack({ stack }: { stack: string[] }) {
  const uniqueStack = unique(stack);

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(uniqueStack.length);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;

    if (!container || !measure) return;

    const update = () => {
      const availableWidth = container.clientWidth;
      const items = Array.from(measure.children) as HTMLElement[];
      const gap = 6;
      let usedWidth = 0;
      let count = 0;

      for (let i = 0; i < items.length; i++) {
        const itemWidth = items[i].offsetWidth;
        const remaining = uniqueStack.length - i - 1;
        const moreWidth =
          remaining > 0
            ? ((measure.querySelector("[data-more]") as HTMLElement)
                ?.offsetWidth ?? 0)
            : 0;

        const requiredWidth =
          usedWidth +
          (count > 0 ? gap : 0) +
          itemWidth +
          (remaining > 0 ? gap + moreWidth : 0);

        if (requiredWidth > availableWidth) break;

        usedWidth += (count > 0 ? gap : 0) + itemWidth;
        count++;
      }

      setVisibleCount(count);
    };

    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(measure);
    update();

    return () => observer.disconnect();
  }, [uniqueStack]);

  const hiddenStack = uniqueStack.slice(visibleCount);

  return (
    <div
      ref={containerRef}
      className="relative min-w-0"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <div className="flex flex-nowrap items-center gap-1.5 overflow-hidden">
        {uniqueStack.slice(0, visibleCount).map((technology) => (
          <span
            key={technology}
            className="shrink-0 rounded-xs border border-zinc-200/80 px-2 py-1 text-[11px] text-zinc-600 dark:border-white/10 dark:text-zinc-400"
          >
            {technology}
          </span>
        ))}

        {hiddenStack.length > 0 && (
          <button
            type="button"
            className="shrink-0 cursor-help rounded-xs border border-zinc-200/80 px-2 py-1 text-[11px] text-zinc-500 transition-colors hover:border-primary-500/50 hover:text-primary-600 dark:border-white/10 dark:text-zinc-400 dark:hover:border-primary-400/40 dark:hover:text-primary-400"
            aria-label={`Show hidden technologies: ${hiddenStack.join(", ")}`}
            onClick={() => setShowTooltip((visible) => !visible)}
          >
            +{hiddenStack.length}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showTooltip && hiddenStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-full left-0 z-50 mb-2 max-w-64 rounded-xs border border-zinc-200/80 bg-zinc-50 p-2 shadow-lg dark:border-white/10 dark:bg-zinc-900"
          >
            <div className="flex flex-wrap gap-1.5">
              {hiddenStack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-xs border border-zinc-200/80 px-2 py-1 text-[11px] text-zinc-600 dark:border-white/10 dark:text-zinc-400"
                >
                  {technology}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 flex w-max items-center gap-1.5"
      >
        {uniqueStack.map((technology) => (
          <span
            key={technology}
            className="shrink-0 rounded-xs border px-2 py-1 text-[11px]"
          >
            {technology}
          </span>
        ))}
        <span
          data-more
          className="shrink-0 rounded-xs border px-2 py-1 text-[11px]"
        >
          +{uniqueStack.length}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project?: Project; index: number }) {
  if (!project) {
    return (
      <article className="relative flex min-h-48 flex-1 flex-col items-center justify-center overflow-hidden rounded-xs border border-zinc-200/80 dark:border-white/10">
        <div className="absolute inset-0 scale-105">
          <div className="absolute inset-0 bg-zinc-200/70 blur-xl dark:bg-white/6" />
        </div>

        <div className="absolute inset-0 bg-zinc-100/60 backdrop-blur-md dark:bg-zinc-950/60" />

        <div className="relative flex flex-1 flex-col items-center justify-center gap-2 p-5 text-center">
          <span className="font-martian text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            In the works
          </span>
          <h3 className="text-xl font-medium tracking-tight text-zinc-800 dark:text-zinc-100">
            More to come<span className="text-primary-500">.</span>
          </h3>
        </div>
      </article>
    );
  }

  const links = unique(Object.entries(project.links ?? {}));

  const isMain = index === 0;
  const isSecondary = index === 1 || index === 2;
  const showImage = Boolean(project.image) && (isMain || isSecondary);

  return (
    <article className="group relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-xs border border-zinc-200/80 bg-zinc-50/75 transition-colors hover:border-primary-400/60 dark:border-white/10 dark:bg-zinc-950/75 dark:hover:border-primary-400/40">
      {showImage && isMain && (
        <div className="relative min-h-28 flex-1 overflow-hidden border-b border-zinc-200/80 bg-zinc-100/70 dark:border-white/10 dark:bg-white/3">
          <ProjectImage
            src={project.image}
            alt={`${project.title} preview`}
            number={project.id}
          />
        </div>
      )}

      <div className="flex min-w-0 flex-1 items-stretch">
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4 lg:p-5">
          <div className="flex flex-nowrap items-center gap-2 overflow-hidden">
            {unique(project.tags).map((tag) => (
              <span
                key={tag}
                className={`shrink-0 rounded-xs border px-2 py-1 font-martian text-[9px] uppercase tracking-[0.15em] ${TAG_STYLES[tag]}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div>
            <h3 className="line-clamp-1 text-base font-medium tracking-tight text-zinc-900 dark:text-zinc-100 lg:text-lg">
              {project.title}
            </h3>

            {(isMain || isSecondary) && (
              <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                {project.description}
              </p>
            )}
          </div>
          {project.stack.length > 0 && <ProjectStack stack={project.stack} />}
          {links.length > 0 && (
            <div className="mt-auto flex min-w-0 flex-nowrap gap-x-4 overflow-hidden pt-2">
              {links.map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 whitespace-nowrap text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-primary-600 hover:decoration-primary-600 dark:text-zinc-400 dark:decoration-zinc-700 dark:hover:text-primary-400 dark:hover:decoration-primary-400"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {showImage && isSecondary && (
          <div className="relative w-[30%] shrink-0 overflow-hidden border-l border-zinc-200/80 bg-zinc-100/70 dark:border-white/10 dark:bg-white/3">
            <ProjectImage
              src={project.image}
              alt={`${project.title} preview`}
              number={project.id}
            />
          </div>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const projectsById = new Map(
    projects.map((project) => [project.id, project]),
  );

  const slots = Array.from(
    {
      length: Math.max(
        TOTAL_PROJECT_SLOTS,
        ...projects.map((project) => project.id),
        0,
      ),
    },
    (_, index) => projectsById.get(index + 1),
  );

  return (
    <SectionLayout id="projects" label="03 — Projects" scrollScreens={2}>
      <div className="flex w-full flex-1 flex-col justify-center py-10 sm:py-14 md:py-10 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal preset="blur" duration={0.75} delay={0.1}>
            <div className="mb-8">
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                My projects
                <span className="text-primary-500">.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:h-[min(62dvh,620px)] md:min-h-105 md:grid-cols-4 md:grid-rows-[1fr_1fr_0.66fr]">
            {slots.map((project, index) => {
              const layout =
                index === 0
                  ? "sm:col-span-2 md:row-span-2"
                  : index === 1 || index === 2
                    ? "sm:col-span-1 md:col-span-2"
                    : "";

              return (
                <div
                  key={project?.id ?? `placeholder-${index + 1}`}
                  className={`flex min-h-48 min-w-0 ${layout}`}
                >
                  <Reveal
                    preset="blur"
                    duration={0.75}
                    delay={0.2 + index * 0.1}
                    className="flex min-w-0 flex-1"
                  >
                    <ProjectCard project={project} index={index} />
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
