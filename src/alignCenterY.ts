import boundingBox from "./boundingBox";
import createFrame from "./createFrame";
import { Frame } from "./types";

// TODO: Test!
export default function alignCenterY(frames: Frame[]): Frame[] {
  const bounds = boundingBox(frames);

  return frames.map((frame) => {
    return createFrame(
      bounds.x + bounds.width / 2 - frame.width / 2,
      frame.y,
      frame.width,
      frame.height
    );
  });
}
