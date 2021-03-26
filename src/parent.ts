import createFrame from "./createFrame";
import { Frame } from "./types";

// TODO: Test!
export default function parent(
  targetFrames: Frame[],
  parentFrame: Frame,
  toRelativePositon?: boolean
): Frame[] {
  return targetFrames.map((frame) => {
    const offsetX = toRelativePositon
      ? parentFrame.x + (frame.x - parentFrame.x)
      : parentFrame.x + frame.x;
    const offsetY = toRelativePositon
      ? parentFrame.y + (frame.y - parentFrame.y)
      : parentFrame.y + frame.y;

    return createFrame(offsetX, offsetY, frame.width, frame.height);
  });
}
