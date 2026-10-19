"use client";

type SplitFlapProps = {
  text: string;
  size?: "xs" | "sm" | "md";
  className?: string;
};

const SIZES = {
  xs: {
    tileWidth: 24,
    tileHeight: 34,
    fontSize: 19,
    gap: 2,
  },
  sm: {
    tileWidth: 32,
    tileHeight: 44,
    fontSize: 25,
    gap: 2,
  },
  md: {
    tileWidth: 40,
    tileHeight: 56,
    fontSize: 32,
    gap: 3,
  },
} as const;

export function SplitFlap({
  text,
  size = "md",
  className = "",
}: SplitFlapProps) {
  const characters = Array.from(text.toUpperCase());
  const { tileWidth, tileHeight, fontSize, gap } = SIZES[size];

  return (
    <div
      role="img"
      aria-label={text}
      className={`flex ${className}`}
      style={{ gap }}
    >
      {characters.map((character, index) => (
        <div
          key={`${character}-${index}`}
          aria-hidden="true"
          className="relative shrink-0 overflow-hidden rounded-xs border border-zinc-900 text-white shadow-sm"
          style={{
            width: tileWidth,
            height: tileHeight,
          }}
        >
          {/* Background halves */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-zinc-800" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-zinc-900" />

          {/* Character — drawn once */}
          <span
            className="absolute inset-0 flex items-center justify-center font-mono font-semibold leading-none"
            style={{ fontSize }}
          >
            {character === " " ? "\u00a0" : character}
          </span>

          {/* Central cut */}
          <div className="absolute inset-x-0 top-1/2 z-10 h-[0.5px] -translate-y-1/2 bg-black" />
        </div>
      ))}
    </div>
  );
}
