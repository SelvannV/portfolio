"use client";

import { FlightPaths } from "./FlightPaths";

export function BackgroundGrid() {
  return (
    <>
      {/* Base grid */}
      <FlightPaths />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 25%, transparent 80%)",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-size-[48px_48px] sm:bg-size-[72px_72px] md:bg-size-[100px_100px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]" />
      </div>

      {/* Cursor spotlight — desktop pointers only */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 hidden bg-[linear-gradient(to_right,rgb(var(--glow-color)/var(--glow-opacity))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--glow-color)/var(--glow-opacity))_1px,transparent_1px)] bg-size-[100px_100px] [@media(hover:hover)_and_(pointer:fine)]:md:block"
        style={
          {
            "--glow-opacity": 0.25,
            maskImage: `
              radial-gradient(
                circle clamp(120px, 15vw, 240px) at var(--x, -1000px) var(--y, -1000px),
                black,
                transparent
              ),
              radial-gradient(
                ellipse at center,
                black 25%,
                transparent 85%
              )
            `,
            WebkitMaskImage: `
              radial-gradient(
                circle clamp(120px, 15vw, 240px) at var(--x, -1000px) var(--y, -1000px),
                black,
                transparent
              ),
              radial-gradient(
                ellipse at center,
                black 25%,
                transparent 85%
              )
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          } as React.CSSProperties
        }
      />
    </>
  );
}
