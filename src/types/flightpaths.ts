import { Point } from "./common";

export type Flight = {
  id: number;
  start: Point;
  control1: Point;
  control2: Point;
  end: Point;
  duration: number;
  startedAt: number;
};

export type PlaneState = {
  id: number;
  x: number;
  y: number;
  angle: number;
  trail: Point[];
};
