import createFrame from "./createFrame";
import getCenter from "./getCenter";
import { Frame } from "./types";

export default function center(targetFrame: Frame, parentFrame: Frame): Frame {
  const centerPoint = getCenter(parentFrame);

  return createFrame(
    centerPoint.x - targetFrame.width / 2,
    centerPoint.y - targetFrame.height / 2,
    targetFrame.width,
    targetFrame.height
  );
}
