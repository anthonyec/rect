import createPoint from "./createPoint";
import { Frame, Point } from "./types";

export default function getCenter(frame: Frame): Point {
  return createPoint(frame.x + frame.width / 2, frame.y + frame.height / 2);
}
