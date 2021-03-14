import createFrame from "./createFrame";
import { Frame } from "./types";

// TODO: Test
export default function stackX(frames: Frame[], spacing: number): Frame[] {
  const firstFrame = frames[0];

  let newFrames: Frame[] = [];
  let totalWidth = 0;

  for (let index = 0; index < frames.length; index++) {
    const frame = frames[index];

    newFrames.push(
      createFrame(firstFrame.x + totalWidth, frame.y, frame.width, frame.height)
    );

    totalWidth += frame.width + spacing;
  }

  return newFrames;
}
