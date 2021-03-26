import boundingBox from "./boundingBox";
import createFrame from "./createFrame";
import { Frame } from "./types";

// TODO: Test!
export default function alignCenterX(frames: Frame[]): Frame[] {
  const bounds = boundingBox(frames);

  return frames.map((frame) => {
    return createFrame(
      frame.x,
      bounds.y + bounds.height / 2 - frame.height / 2,
      frame.width,
      frame.height
    );
  });
}
