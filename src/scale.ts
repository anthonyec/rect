import createFrame from "./createFrame";
import { Frame } from "./types";

// TODO: Test
export default function scale(frames: Frame[], x: number, y: number): Frame[] {
  return frames.map((frame) => {
    return createFrame(
      frame.x * x,
      frame.y * y,
      frame.width * x,
      frame.height * y
    );
  });
}
