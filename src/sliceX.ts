import clamp from "./clamp";
import createFrame from "./createFrame";
import { Frame } from "./types";

/** Divide a frame into multiple frames */
export default function sliceX(frame: Frame, ...divisions: number[]): Frame[] {
  if (!divisions.length) {
    const width = frame.width / 2;
    const frameA = createFrame(frame.x, frame.y, width, frame.height);
    const frameB = createFrame(frame.x + width, frame.y, width, frame.height);
    return [frameA, frameB];
  } else if (divisions.length === 1) {
    const widthA = frame.width * divisions[0];
    const widthB = frame.width - widthA;
    const frameA = createFrame(frame.x, frame.y, widthA, frame.height);
    const frameB = createFrame(frame.x + widthA, frame.y, widthB, frame.height);

    return [frameA, frameB];
  } else {
    const legalDivisions = divisions.sort().map((num) => clamp(num, 0, 1));
    let divisionWidths: number[] = [];
    let lastDivision = 0;

    for (let index = 0; index < legalDivisions.length; index++) {
      const division = legalDivisions[index];
      const divisionWidth = (division - lastDivision) * frame.width;

      divisionWidths.push(divisionWidth);
      lastDivision = division;
    }

    const extraDivisionWidth = (1 - lastDivision) * frame.width;
    divisionWidths.push(extraDivisionWidth);

    return divisionWidths.map((width, index) => {
      // TODO: this is ugly, can I do it in 1 loop??
      const lastWidth = index === 0 ? 0 : frame.width * legalDivisions[index - 1];

      const newFrame = createFrame(
        frame.x + lastWidth,
        frame.y,
        width,
        frame.height
      );

      return newFrame;
    });
  }
}
