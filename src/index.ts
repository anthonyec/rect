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
    const divisionCount = divisions.length + 1;

    let frames = [];
    let lastWidth = 0;
    let lastDivision = 0;

    for (let index = 0; index < divisionCount; index ++) {
      const isLastDivision = index === divisions.length;

      if (!isLastDivision) {
        const division = divisions[index] - lastDivision;
        const width = frame.width * division;
        const x = frame.x + lastWidth;

        lastWidth += width;
        lastDivision = division;

        frames.push(
          createFrame(x, frame.y, width, frame.height)
        );
      } else {
        frames.push(
          createFrame(lastWidth, frame.y, frame.width - lastWidth, frame.height)
        );
      }
    }

    return frames;
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
