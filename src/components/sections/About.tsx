"use client";

import aboutJson from "@/data/about.json";
import type {
  AboutData,
  TimelineEvent as TimelineEventType,
} from "@/types/about";
import { Reveal } from "../Reveal";
import { AccentDot, Badge, Card, Divider, Heading, SectionLabel } from "../ui";
import { SectionLayout } from "./SectionLayout";

const aboutData: AboutData = aboutJson;

function formatDate(date: string) {
  const [day, month, year] = date.split("-");
  return `${day} · ${month} · ${year}`;
}

function SectionTitle({
  children,
  count,
}: {
  children: React.ReactNode;
  count: number;
}) {
  return (
    <SectionLabel size="xs" count={count}>
      {children}
    </SectionLabel>
  );
}

function TimelineEvent({
  event,
  last = false,
}: {
  event: TimelineEventType;
  last?: boolean;
}) {
  return (
    <div className={`relative flex gap-4 ${last ? "" : "pb-6"}`}>
      <div className="flex w-3 shrink-0 flex-col items-center">
        <span className="mt-1 size-2.5 shrink-0 rounded-full border-2 border-primary-500 bg-white dark:bg-zinc-950" />
        {!last && (
          <span className="mt-2 w-px flex-1 bg-zinc-200 dark:bg-white/10" />
        )}
      </div>

      <div className="min-w-0 pb-1">
        <p className="font-martian text-[10px] tracking-wide text-primary-600 dark:text-primary-400">
          {event.start} — {event.end}
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
          {event.text}
        </p>
      </div>
    </div>
  );
}

function Timeline({ events }: { events: TimelineEventType[] }) {
  const maxVisible = 4;
  const visibleEvents =
    events.length > maxVisible
      ? [...events.slice(0, maxVisible - 1), events[events.length - 1]]
      : events;
  const hiddenCount = events.length - visibleEvents.length;

  return (
    <div className="relative mt-5">
      {visibleEvents.map((event, index) => (
        <div key={event.id}>
          {index === visibleEvents.length - 1 && hiddenCount > 0 && (
            <div className="relative ml-1.5 flex items-center gap-3 pb-6">
              <span className="h-5 w-px shrink-0 bg-zinc-200 dark:bg-white/10" />
              <Badge variant="subtle" size="xs">
                +{hiddenCount} other elements
              </Badge>
            </div>
          )}

          <TimelineEvent
            event={event}
            last={index === visibleEvents.length - 1}
          />
        </div>
      ))}
    </div>
  );
}

function InterestsList({ items }: { items: string[] }) {
  return (
    <div>
      <SectionTitle count={items.length}>Things I enjoy</SectionTitle>

      <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
        {items.slice(0, 3).map((item) => (
          <li key={item} className="flex items-baseline gap-3">
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-primary-500/70"
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LanguagesList({ languages }: { languages: [string, string][] }) {
  return (
    <div>
      <SectionTitle count={languages.length}>Languages</SectionTitle>

      <ul className="mt-4 divide-y divide-zinc-200/70 text-sm dark:divide-white/10">
        {languages.slice(0, 3).map(([language, level], index) => (
          <li
            key={language}
            className={`flex items-center justify-between gap-3 py-2 ${
              index === 0 ? "first:pt-0" : ""
            }`}
          >
            <span className="text-zinc-700 dark:text-zinc-300">{language}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {level}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ToolTags({ tools }: { tools: string[] }) {
  return (
    <div>
      <SectionTitle count={tools.length}>A few tools I use</SectionTitle>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {tools.map((tool) => (
          <Badge key={tool} size="md" interactive>
            {tool}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const sortedTimeline = [...aboutData.timeline].sort((a, b) => {
    const yearA = a.end.toLowerCase() === "present" ? Infinity : Number(a.end);
    const yearB = b.end.toLowerCase() === "present" ? Infinity : Number(b.end);

    return yearB - yearA || Number(b.start) - Number(a.start);
  });

  const languages = Object.entries(aboutData.languages);

  return (
    <SectionLayout id="about" label="02 — About" scrollScreens={1.5}>
      <div className="flex w-full flex-1 flex-col justify-center py-10 sm:py-14 md:py-10 lg:py-14">
        <div className="mx-auto w-full max-w-5xl">
          {/* Introduction and timeline */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
            <Reveal
              preset="blur"
              duration={0.75}
              delay={0.3}
              className="lg:col-span-2"
            >
              <div>
                <Heading
                  as="h2"
                  dot
                  className="mt-3 text-3xl leading-[1.1] sm:mt-5 sm:text-4xl lg:text-5xl xl:text-6xl"
                >
                  Hello
                </Heading>

                <Card className="mt-5 p-4 sm:mt-7 sm:p-6 xl:p-8">
                  {/* Letter heading */}
                  <div className="flex items-center justify-between gap-4 border-b border-zinc-200/70 pb-4 dark:border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="h-4 w-0.5 rounded-full bg-primary-500" />
                      <SectionLabel size="xs">A little about me</SectionLabel>
                    </div>

                    <span className="font-martian text-[10px] text-zinc-400 dark:text-zinc-500">
                      NOTE <AccentDot>No. 01</AccentDot>
                    </span>
                  </div>

                  {/* Letter content */}
                  <div className="mt-6 select-text space-y-4 text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8 dark:text-zinc-400">
                    {aboutData.letter.content.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Signature */}
                  <div className="mt-8 flex justify-end border-t border-zinc-200/70 pt-5 dark:border-white/10">
                    <div className="text-right">
                      <p className="font-serif text-3xl italic tracking-tight text-zinc-800 dark:text-zinc-200">
                        Selvann<AccentDot />
                      </p>

                      <p className="mt-2 font-martian text-[9px] uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">
                        {formatDate(aboutData.letter.modifiedAt)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </Reveal>
            {sortedTimeline.length > 0 && (
              <Reveal
                preset="blur"
                duration={0.75}
                delay={0.4}
                className="lg:col-start-3"
              >
                <div className="lg:pt-5">
                  <SectionLabel size="xs">Timeline</SectionLabel>
                  <Timeline events={sortedTimeline} />
                </div>
              </Reveal>
            )}
          </div>

          {/* Personal details */}
          <div className="mt-7 grid grid-cols-1 gap-6 pt-5 sm:mt-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
            <Reveal
              preset="blur"
              duration={0.75}
              delay={0.3}
              className="col-span-full"
            >
              <Divider className="origin-left" />
            </Reveal>{" "}
            <Reveal preset="blur" duration={0.75} delay={0.4}>
              <InterestsList items={aboutData.interests} />
            </Reveal>
            <Reveal preset="blur" duration={0.75} delay={0.5}>
              <LanguagesList languages={languages} />
            </Reveal>
            <Reveal preset="blur" duration={0.75} delay={0.6}>
              <ToolTags tools={aboutData.tools} />
            </Reveal>
          </div>
        </div>
      </div>
    </SectionLayout>
  );
}
