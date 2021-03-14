import createFrame from "./createFrame";
import { Frame } from "./types";

/** Inset frame by a certain amount */
export default function inset(frame: Frame, size: number): Frame {
  return createFrame(
    frame.x + size,
    frame.y + size,
    frame.width - size * 2,
    frame.height - size * 2
  );
}
