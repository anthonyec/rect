import createFrame from "./createFrame";
import { Frame } from "./types";

// TODO: Test
export default function stackY(frames: Frame[], spacing: number): Frame[] {
  const firstFrame = frames[0];

  let newFrames: Frame[] = [];
  let totalHeight = 0;

  for (let index = 0; index < frames.length; index++) {
    const frame = frames[index];

    newFrames.push(
      createFrame(
        frame.x,
        firstFrame.y + totalHeight,
        frame.width,
        frame.height
      )
    );

    totalHeight += frame.height + spacing;
  }

  return newFrames;
}
