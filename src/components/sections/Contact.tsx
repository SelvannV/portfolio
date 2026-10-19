"use client";

import { Reveal } from "@/components/Reveal";
import contact from "@/data/contact.json";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Copy,
  Mail,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useState } from "react";
import type { SimpleIcon } from "simple-icons";
import {
  siAndroid,
  siApple,
  siBehance,
  siBluesky,
  siDiscord,
  siDribbble,
  siFacebook,
  siFigma,
  siGit,
  siGithub,
  siGitlab,
  siGmail,
  siGoogle,
  siInstagram,
  siJavascript,
  siMastodon,
  siMedium,
  siNotion,
  siNpm,
  siPinterest,
  siReddit,
  siSnapchat,
  siSoundcloud,
  siSpotify,
  siStackoverflow,
  siSteam,
  siTelegram,
  siThreads,
  siTiktok,
  siTwitch,
  siX,
  siYoutube,
} from "simple-icons/icons";
import { SectionLayout } from "./SectionLayout";

const BRAND_ICONS: Record<string, SimpleIcon> = {
  android: siAndroid,
  apple: siApple,
  behance: siBehance,
  bluesky: siBluesky,
  discord: siDiscord,
  dribbble: siDribbble,
  facebook: siFacebook,
  figma: siFigma,
  git: siGit,
  github: siGithub,
  gitlab: siGitlab,
  gmail: siGmail,
  google: siGoogle,
  instagram: siInstagram,
  javascript: siJavascript,
  mastodon: siMastodon,
  medium: siMedium,
  notion: siNotion,
  npm: siNpm,
  pinterest: siPinterest,
  reddit: siReddit,
  snapchat: siSnapchat,
  soundcloud: siSoundcloud,
  spotify: siSpotify,
  stackoverflow: siStackoverflow,
  steam: siSteam,
  telegram: siTelegram,
  threads: siThreads,
  tiktok: siTiktok,
  twitch: siTwitch,
  x: siX,
  youtube: siYoutube,
};

const PROFESSIONAL_LINKS = contact.professional;
const SOCIAL_LINKS = contact.socials;

function BrandIcon({ icon, size = 16 }: { icon: SimpleIcon; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  }

  return (
    <SectionLayout
      id="contact"
      label="04 — Contact"
      scrollScreens={0}
      endText="The end."
      end="Back to top ↑"
    >
      <div className="flex w-full flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl">
          <Reveal preset="blur" delay={0.1}>
            <h2 className="text-4xl font-medium tracking-tight text-zinc-950 sm:text-6xl dark:text-white">
              Get in touch
              <span className="text-primary-600 dark:text-primary-400">.</span>
            </h2>
          </Reveal>

          <Reveal preset="blur" delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
              Have a project in mind or simply want to talk?
            </p>
          </Reveal>

          <Reveal preset="blur" delay={0.3}>
            <button
              type="button"
              onClick={copyEmail}
              className="select-text group mt-8 inline-flex cursor-pointer items-center gap-3 border-b border-zinc-300 pb-3 text-lg font-medium text-zinc-950 transition-colors hover:border-primary-500 hover:text-primary-600 dark:border-zinc-700 dark:text-white dark:hover:border-primary-400 dark:hover:text-primary-400"
              aria-label={
                copied ? "Email copied" : `Copy email address ${contact.email}`
              }
            >
              <Mail size={19} strokeWidth={1.7} />
              <span>{contact.email}</span>
              {copied ? (
                <Check size={18} strokeWidth={1.7} />
              ) : (
                <Copy size={18} strokeWidth={1.7} />
              )}
            </button>
          </Reveal>

          {PROFESSIONAL_LINKS.length > 0 && (
            <Reveal preset="blur" delay={0.4}>
              <div className="mt-16">
                <h3 className="mb-4 font-martian text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                  Professional
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PROFESSIONAL_LINKS.map((item, index) => {
                    const Icon = item.icon
                      ? BRAND_ICONS[item.icon.toLowerCase()]
                      : undefined;

                    const Wrapper = item.link ? "a" : "div";

                    return (
                      <Wrapper
                        key={`${item.text}-${index}`}
                        {...(item.link
                          ? {
                              href: item.link,
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                        className={`group flex min-w-0 items-center gap-3 rounded-sm border border-zinc-200/80 bg-zinc-50/75 p-3 transition-colors sm:gap-4 sm:p-4 dark:border-white/10 dark:bg-neutral-950/75 ${
                          item.link
                            ? "hover:border-primary-400/60 dark:hover:border-primary-400/40"
                            : "cursor-default"
                        }`}
                      >
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-zinc-200/80 bg-zinc-100/70 text-zinc-600 transition-colors group-hover:border-primary-300/60 group-hover:bg-primary-50 group-hover:text-primary-700 dark:border-white/10 dark:bg-white/3 dark:text-zinc-300 dark:group-hover:border-primary-400/30 dark:group-hover:bg-primary-400/10 dark:group-hover:text-primary-300">
                          {Icon ? (
                            <BrandIcon icon={Icon} size={18} />
                          ) : (
                            <BriefcaseBusiness size={18} strokeWidth={1.7} />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                            {item.text}
                          </p>
                          <p className="mt-1 truncate text-xs leading-relaxed text-zinc-600 sm:text-sm dark:text-zinc-400">
                            {item.description || "None"}
                          </p>
                        </div>

                        {item.link && (
                          <ArrowUpRight
                            size={18}
                            strokeWidth={1.8}
                            className="shrink-0 text-zinc-400 transition-colors group-hover:text-primary-500 dark:text-zinc-500 dark:group-hover:text-primary-400"
                          />
                        )}
                      </Wrapper>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}

          {SOCIAL_LINKS.length > 0 && (
            <Reveal preset="blur" delay={0.5}>
              <div className="mt-10">
                <h3 className="mb-4 font-martian text-xs uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400">
                  Socials
                </h3>

                <div className="flex flex-wrap items-center gap-3">
                  {SOCIAL_LINKS.map((item, index) => {
                    const Icon = item.icon
                      ? BRAND_ICONS[item.icon.toLowerCase()]
                      : undefined;

                    const Wrapper = item.link ? "a" : "div";

                    return (
                      <Wrapper
                        key={`${item.text}-${index}`}
                        {...(item.link
                          ? {
                              href: item.link,
                              target: "_blank",
                              rel: "noopener noreferrer",
                            }
                          : {})}
                        aria-label={item.text || undefined}
                        title={item.text || undefined}
                        style={
                          {
                            "--social-color": item.accent || "#ffffff",
                          } as CSSProperties
                        }
                        className={`inline-flex items-center gap-2 rounded-xs border border-zinc-300 bg-white/50 p-2 text-sm font-medium text-zinc-800 transition-colors dark:border-white/20 dark:bg-white/5 dark:text-zinc-200 ${
                          item.link
                            ? "hover:border-(--social-color) hover:bg-[color-mix(in_srgb,var(--social-color)_10%,transparent)] hover:text-(--social-color) dark:hover:bg-[color-mix(in_srgb,var(--social-color)_15%,transparent)]"
                            : "cursor-default"
                        }`}
                      >
                        {Icon && <BrandIcon icon={Icon} size={16} />}
                        {item.text && <span>{item.text}</span>}
                      </Wrapper>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </SectionLayout>
  );
}
