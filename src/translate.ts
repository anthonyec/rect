import createFrame from "./createFrame";
import { Frame } from "./types";

// TODO: Test this!
export default function translate(frame: Frame, x: number, y?: number): Frame {
  return createFrame(
    frame.x + frame.width * x,
    frame.y + frame.height * y,
    frame.width,
    frame.height
  );
}
