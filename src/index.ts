interface Frame {
  x: number;
  y: number;
  width: number;
  height: number;
}

// interface Point {
//   x: number;
//   y: number;
// }

function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(num, max));
}

/** Create a representation of a frame. */
export function createFrame(
  x: number,
  y: number,
  width: number = 0,
  height: number = 0
): Frame {
  return {
    x, y, width, height
  }
}

/** Divide a frame into multiple frames */
export function divideHorizontally(
  frame: Frame,
  ...divisions: number[]
): Frame[] {
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
    const legalDivisions = divisions.sort().map(num => clamp(num, 0, 1));
    let divisionWidths: number[] = [];
    let lastDivision = 0;

    for (let index = 0; index < legalDivisions.length; index ++) {
      const division = legalDivisions[index];
      const divisionWidth = (division - lastDivision) * frame.width;

      divisionWidths.push(divisionWidth);
      lastDivision = division;
    }

    const extraDivisionWidth = (1 - lastDivision) * frame.width;
    divisionWidths.push(extraDivisionWidth);


    return divisionWidths.map((width, index) => {
      // TODO: this is ugly, can I do it in 1 loop??
      const lastWidth = index === 0 ? 0 : (frame.width * legalDivisions[index - 1]);

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

// const mainFrame = createFrame(0, 0, 500, 100);
// const splitFrames = divideHorizontally(mainFrame, 0.3, 0.7);
// const splitFrames2 = divideHorizontally(mainFrame, 0.5);
// const splitFrames3 = divideHorizontally(mainFrame);

// console.log(mainFrame);
// console.log(splitFrames);
// console.log(splitFrames2);
// console.log(splitFrames3);

// // /** Create a frame inside a frame padded by a set size. */
// // function inset(frame: Frame, size: number): Frame {

// // }

// // function distributeHorizontally(frames: Frame[], width: number, allowUnevenDistribution?: boolean): Frame[] {
// // }

// // function parent(targetFrame: Frame[], parentFrame: Frame[]): Frame {

// // }

// // function pivot(frame: Frame, pivotX: number, pivotY: number): Frame {

// // }

// // function scale(frame: Frame, scaleX: number, scaleY: number = 1): Frame {

// // }


// // divideHorizontally(myFrame, 0.5, 0.3, 0.2);
// // // const myFrame = frame(0, 0, 100, 100) |> inset(10) |> divideHorizontally();


// // // function divideHorizontally(frame: Frame, ...percentDivisions: number[]) {

// // // }

// // // const myCoolFrame = frame(10, 10, 100, 100);
// // // const frames = divideHorizontally(myCoolFrame, 0.3, 0.7, 0.9);

// // // const insetFrames = frames.map(frame => inset(frame, 5));

// // // const centerOfMyCoolFrame = center(myCoolFrame)
// // // const pivotPointOfMyCoolFrame = pivotPoint(myCoolFrame, 0.5, 0.5)

// // // parent(frame1, frame2)
