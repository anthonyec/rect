import { Frame } from "./types";

/** Create a representation of a frame */
export default function createFrame(
  x: number,
  y: number,
  width: number = 0,
  height: number = 0
): Frame {
  return {
    x,
    y,
    width,
    height,
  };
}
