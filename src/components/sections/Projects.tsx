import projectsData from "@/data/projects.json";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "../Reveal";
import { SectionLayout } from "./SectionLayout";

type Project = {
  id: number;
  title: string;
  description: string;
  links?: Record<string, string>;
  image: string;
  stack: string[];
  tags: (
    | "archived"
    | "live"
    | "in progress"
    | "new"
    | "deprecated"
    | "open source"
    | "featured"
    | "experimental"
  )[];
};

const TAG_STYLES: Record<Project["tags"][number], string> = {
  archived:
    "border-zinc-300 bg-zinc-100 text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300",
  live: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400",
  "in progress":
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400",
  new: "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-400",
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

  if (!src || failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-zinc-100 dark:bg-[#111113]">
        <span className="absolute -right-3 -top-10 select-none text-[11rem] font-medium leading-none tracking-[-0.12em] text-zinc-200 dark:text-white/4.5">
          {String(number).padStart(2, "0")}
        </span>

        <div className="relative flex items-center gap-4">
          <span className="h-12 w-px rotate-25 bg-indigo-500/70" />
          <span className="font-martian text-[10px] uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400">
            Project {String(number).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute bottom-4 left-5 right-5 h-px bg-zinc-300/70 dark:bg-white/10" />
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

function ProjectCard({ project, index }: { project?: Project; index: number }) {
  if (!project) {
    return (
      <article className="relative flex min-h-48 flex-1 flex-col items-center justify-center overflow-hidden rounded-sm border border-zinc-200/80 dark:border-white/10">
        <div className="absolute inset-0 scale-105">
          <div className="absolute inset-0 bg-zinc-200/70 blur-xl dark:bg-white/6" />
        </div>

        <div className="absolute inset-0 bg-zinc-100/60 backdrop-blur-md dark:bg-neutral-950/60" />

        <div className="relative flex flex-1 flex-col items-center justify-center gap-2 p-5 text-center">
          <span className="font-martian text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            In the works
          </span>
          <h3 className="text-xl font-medium tracking-tight text-zinc-800 dark:text-zinc-100">
            More to come<span className="text-indigo-500">.</span>
          </h3>
        </div>
      </article>
    );
  }

  const isMain = index === 0;
  const isSecondary = index === 1 || index === 2;
  const showImage = Boolean(project.image) && (isMain || isSecondary);

  return (
    <article className="group relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-sm border border-zinc-200/80 bg-zinc-50/75 transition-colors hover:border-indigo-400/60 dark:border-white/10 dark:bg-neutral-950/75 dark:hover:border-indigo-400/40">
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
        <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`rounded-sm border px-2 py-1 font-martian text-[9px] uppercase tracking-[0.15em] ${TAG_STYLES[tag]}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
              {project.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
          </div>

          {project.stack.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-sm border border-zinc-200 px-2 py-1 text-[11px] text-zinc-600 dark:border-white/10 dark:text-zinc-400"
                >
                  {technology}
                </span>
              ))}
            </div>
          )}

          {Object.entries(project.links ?? {}).length > 0 && (
            <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-2">
              {Object.entries(project.links ?? {}).map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-600 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-indigo-500 dark:text-zinc-400 dark:decoration-zinc-700 dark:hover:text-indigo-400"
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
    <SectionLayout id="projects" label="03 — Projects" scrollScreens={1.5}>
      <div className="flex w-full flex-1 flex-col justify-center py-20 md:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <Reveal preset="blur" duration={0.75} delay={0.1}>
            <div className="mb-8">
              <h2 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                My projects
                <span className="text-indigo-500">.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:h-[min(62dvh,620px)] md:grid-cols-4 md:grid-rows-[1fr_1fr_0.66fr]">
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
