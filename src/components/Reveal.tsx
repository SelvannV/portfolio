"use client";

import { motion, type Transition, type Variants } from "motion/react";
import { createContext, useContext, useState, type ReactNode } from "react";

const AnimationRestartContext = createContext<{
  restartKey: number;
  restart: () => void;
} | null>(null);

export function AnimationRestartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [restartKey, setRestartKey] = useState(0);

  const restart = () => setRestartKey((key) => key + 1);

  return (
    <AnimationRestartContext.Provider value={{ restartKey, restart }}>
      {children}
    </AnimationRestartContext.Provider>
  );
}

export function useRestartAnimations() {
  const context = useContext(AnimationRestartContext);

  if (!context) {
    throw new Error(
      "useRestartAnimations must be used within AnimationRestartProvider",
    );
  }

  return context.restart;
}

const PRESETS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  rise: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  drop: {
    initial: { opacity: 0, y: -40 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
  blur: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  none: {
    initial: {},
    animate: {},
  },
} satisfies Record<
  string,
  {
    initial: Variants["hidden"];
    animate: Variants["visible"];
  }
>;

export type RevealPreset = keyof typeof PRESETS;

type RevealProps = {
  children: ReactNode;
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
  transition?: Transition;
  className?: string;
};

export function Reveal({
  children,
  preset = "rise",
  delay = 0,
  duration = 0.7,
  distance,
  once = false,
  amount = 0.2,
  transition,
  className,
}: RevealProps) {
  const context = useContext(AnimationRestartContext);
  const animation = PRESETS[preset];

  const initial = { ...animation.initial };
  const animate = { ...animation.animate };

  if (distance !== undefined) {
    if ("y" in initial) {
      initial.y = Math.sign(initial.y as number) * distance;
    }
    if ("y" in animate) animate.y = 0;

    if ("x" in initial) {
      initial.x = Math.sign(initial.x as number) * distance;
    }
    if ("x" in animate) animate.x = 0;
  }

  return (
    <motion.div
      key={context?.restartKey ?? 0}
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={
        transition ?? {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }
      }
    >
      {children}
    </motion.div>
  );
}
