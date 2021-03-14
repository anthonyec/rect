import createFrame from "./createFrame";
import { Frame } from "./types";

// https://github.com/anthonyec/scenery/blob/master/src/Scene.js#L161
export default function intersect(frameA: Frame, frameB: Frame): Frame {
  const rightA = frameA.x + frameA.width;
  const bottomA = frameA.y + frameA.height;

  const rightB = frameB.x + frameB.width;
  const bottomB = frameB.y + frameB.height;

  const maxLeft = Math.max(frameA.x, frameB.x);
  const minRight = Math.min(rightA, rightB);

  const maxTop = Math.max(frameA.y, frameB.y);
  const minBottom = Math.min(bottomA, bottomB);

  const x = maxLeft;
  const y = maxTop;
  const width = minRight - maxLeft;
  const height = minBottom - maxTop;

  const noOverlap = width <= 0 || height <= 0;

  if (noOverlap) {
    return null;
  }

  return createFrame(x, y, width, height);
}
