import { Point } from "./types";

/** Create a representation of a point */
export default function createPoint(x: number, y: number): Point {
  return { x, y };
}
