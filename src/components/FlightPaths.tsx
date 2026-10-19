"use client";

import { Point } from "@/types/common";
import { Flight, PlaneState } from "@/types/flightpaths";
import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type FlightPathsContextValue = {
  paused: boolean;
  pause: () => void;
  resume: () => void;
  toggle: () => void;
};

const FlightPathsContext = createContext<FlightPathsContextValue | null>(null);

export function FlightPathsProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);

  const pause = useCallback(() => setPaused(true), []);
  const resume = useCallback(() => setPaused(false), []);
  const toggle = useCallback(() => setPaused((value) => !value), []);

  return (
    <FlightPathsContext.Provider value={{ paused, pause, resume, toggle }}>
      {children}
    </FlightPathsContext.Provider>
  );
}

export function useFlightPaths() {
  const context = useContext(FlightPathsContext);

  if (!context) {
    throw new Error("useFlightPaths must be used within a FlightPathsProvider");
  }

  return context;
}

const PLANE_COUNT = 3;
const PLANE_SIZE = 32;
const TRAIL_LIFETIME = 3000;
const UPDATE_INTERVAL = 50;

function random(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createFlight(
  id: number,
  width: number,
  height: number,
  now: number,
): Flight {
  const leftToRight = Math.random() > 0.5;
  const margin = PLANE_SIZE * 2;
  const startX = leftToRight ? -margin : width + margin;
  const endX = leftToRight ? width + margin : -margin;

  return {
    id,
    start: { x: startX, y: random(0.12, 0.88) * height, time: 0 },
    control1: {
      x: random(0.2, 0.4) * width,
      y: random(0.12, 0.88) * height,
      time: 0,
    },
    control2: {
      x: random(0.6, 0.8) * width,
      y: random(0.12, 0.88) * height,
      time: 0,
    },
    end: { x: endX, y: random(0.12, 0.88) * height, time: 0 },
    duration: random(18000, 30000),
    startedAt: now - random(0, 3000),
  };
}

function positionAt(flight: Flight, t: number) {
  const { start: a, control1: b, control2: c, end: d } = flight;
  const u = 1 - t;

  return {
    x:
      u ** 3 * a.x + 3 * u ** 2 * t * b.x + 3 * u * t ** 2 * c.x + t ** 3 * d.x,
    y:
      u ** 3 * a.y + 3 * u ** 2 * t * b.y + 3 * u * t ** 2 * c.y + t ** 3 * d.y,
  };
}

function angleAt(flight: Flight, t: number) {
  const delta = 0.001;
  const before = positionAt(flight, Math.max(0, t - delta));
  const after = positionAt(flight, Math.min(1, t + delta));

  return (Math.atan2(after.y - before.y, after.x - before.x) * 180) / Math.PI;
}

export function FlightPaths() {
  const { paused } = useFlightPaths();
  const [planes, setPlanes] = useState<PlaneState[]>([]);

  useEffect(() => {
    if (paused) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let now = performance.now();

    let flights = Array.from({ length: PLANE_COUNT }, (_, i) =>
      createFlight(i, width, height, now),
    );

    const trails: Point[][] = flights.map(() => []);
    let lastUpdate = 0;
    let frame = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      now = performance.now();

      flights = flights.map((flight) =>
        createFlight(flight.id, width, height, now),
      );

      trails.forEach((trail) => {
        trail.length = 0;
      });
    };

    const tick = (timestamp: number) => {
      frame = requestAnimationFrame(tick);

      if (timestamp - lastUpdate < UPDATE_INTERVAL) return;
      lastUpdate = timestamp;

      const nextPlanes = flights.map((flight, i) => {
        let elapsed = timestamp - flight.startedAt;

        if (elapsed >= flight.duration) {
          flight = createFlight(flight.id, width, height, timestamp);
          flights[i] = flight;
          trails[i].length = 0;
          elapsed = 0;
        }

        const t = Math.min(1, elapsed / flight.duration);
        const position = positionAt(flight, t);
        const angle = angleAt(flight, t);

        trails[i].push({ ...position, time: timestamp });
        trails[i] = trails[i].filter(
          (point) => timestamp - point.time <= TRAIL_LIFETIME,
        );

        return {
          id: flight.id,
          ...position,
          angle,
          trail: [...trails[i]],
        };
      });

      setPlanes(nextPlanes);
    };

    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, [paused]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden text-primary-500"
    >
      <AnimatePresence>
        {!paused && (
          <motion.div
            key="flight-paths"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: {
                duration: 0.6,
                ease: "easeInOut",
              },
            }}
          >
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
            >
              <defs>
                {planes.map((plane) => (
                  <linearGradient
                    key={plane.id}
                    id={`trail-gradient-${plane.id}`}
                    gradientUnits="userSpaceOnUse"
                    x1={plane.trail[0]?.x ?? plane.x}
                    y1={plane.trail[0]?.y ?? plane.y}
                    x2={plane.x}
                    y2={plane.y}
                  >
                    <stop
                      offset="0%"
                      stopColor="currentColor"
                      stopOpacity="0"
                    />
                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      stopOpacity="0.55"
                    />
                  </linearGradient>
                ))}
              </defs>

              {planes.map((plane) => {
                const trailPath = plane.trail
                  .map(
                    (point, i) =>
                      `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`,
                  )
                  .join(" ");

                return (
                  <path
                    key={plane.id}
                    d={trailPath}
                    fill="none"
                    stroke={`url(#trail-gradient-${plane.id})`}
                    strokeWidth="3"
                    strokeDasharray="3 6"
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>

            {planes.map((plane) => (
              <div
                key={plane.id}
                className="absolute bg-primary-300 dark:bg-primary-700"
                style={{
                  width: PLANE_SIZE,
                  height: PLANE_SIZE,
                  left: plane.x,
                  top: plane.y,
                  transform: `translate(-50%, -50%) rotate(${plane.angle + 90}deg)`,
                  maskImage: "url('/airplane.svg')",
                  maskSize: "contain",
                  maskPosition: "center",
                  maskRepeat: "no-repeat",
                  WebkitMaskImage: "url('/airplane.svg')",
                  WebkitMaskSize: "contain",
                  WebkitMaskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
