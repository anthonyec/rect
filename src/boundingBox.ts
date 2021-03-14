import createFrame from "./createFrame";
import { Frame } from "./types";

export default function boundingBox(frames: Frame[]): Frame {
  // TODO: Make with 1 loop?
  const leftPositions = frames.map((frame) => frame.x);
  const topPositions = frames.map((frame) => frame.y);
  const rightPositions = frames.map((frame) => frame.x + frame.width);
  const bottomPositions = frames.map((frame) => frame.y + frame.height);

  const minX = Math.min(...leftPositions);
  const maxX = Math.max(...rightPositions);

  const minY = Math.min(...topPositions);
  const maxY = Math.max(...bottomPositions);

  return createFrame(minX, minY, maxX - minX, maxY - minY);
}
