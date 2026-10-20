import projectsData from "@/data/projects.json";
import { Project } from "@/types/projects";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "../Reveal";
import { Badge, Card, Divider, Heading, SectionLabel } from "../ui";
import { SectionLayout } from "./SectionLayout";

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
          <SectionLabel size="xs" className="tracking-[0.25em]">
            Project {String(number).padStart(2, "0")}
          </SectionLabel>
        </div>

        <Divider className="absolute bottom-4 left-5 right-5" />
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
          <Badge key={technology} size="sm">
            {technology}
          </Badge>
        ))}

        {hiddenStack.length > 0 && (
          <Badge
            as="button"
            type="button"
            size="sm"
            interactive
            className="cursor-help text-zinc-500"
            aria-label={`Show hidden technologies: ${hiddenStack.join(", ")}`}
            onClick={() => setShowTooltip((visible) => !visible)}
          >
            +{hiddenStack.length}
          </Badge>
        )}
      </div>

      <AnimatePresence>
        {showTooltip && hiddenStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bottom-full left-0 z-50 mb-2 max-w-64"
          >
            <Card className="p-2 shadow-lg dark:bg-zinc-900">
              <div className="flex flex-wrap gap-1.5">
                {hiddenStack.map((technology) => (
                  <Badge key={technology} size="sm">
                    {technology}
                  </Badge>
                ))}
              </div>
            </Card>
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
      <Card
        as="article"
        className="relative flex min-h-48 flex-1 flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 scale-105">
          <div className="absolute inset-0 bg-zinc-200/70 blur-xl dark:bg-white/6" />
        </div>

        <div className="absolute inset-0 bg-zinc-100/60 backdrop-blur-md dark:bg-zinc-950/60" />

        <div className="relative flex flex-1 flex-col items-center justify-center gap-2 p-5 text-center">
          <SectionLabel size="xs" className="tracking-[0.2em]">
            In the works
          </SectionLabel>
          <Heading
            as="h3"
            dot
            className="text-xl text-zinc-800 dark:text-zinc-100"
          >
            More to come
          </Heading>
        </div>
      </Card>
    );
  }

  const links = unique(Object.entries(project.links ?? {}));

  const isMain = index === 0;
  const isSecondary = index === 1 || index === 2;
  const showImage = Boolean(project.image) && (isMain || isSecondary);

  return (
    <Card
      as="article"
      interactive
      className="group relative flex min-w-0 flex-1 flex-col overflow-hidden"
    >
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
              <Badge key={tag} tag={tag} size="xs">
                {tag}
              </Badge>
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
    </Card>
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
              <Heading as="h2" dot className="text-3xl sm:text-4xl md:text-5xl">
                My projects
              </Heading>
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
