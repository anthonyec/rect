interface Point {
  x: number;
  y: number;
}

interface Frame {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Create a representation of a point */
export function createPoint(x: number, y: number): Point {
  return { x, y };
}

/** Create a representation of a frame */
export function createFrame(
  x: number,
  y: number,
  width: number = 0,
  height: number = 0
): Frame {
  return {
    x,
    y,
    width,
    height,
  };
}

function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(num, max));
}

/** Divide a frame into multiple frames */
export function sliceX(
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
      const lastWidth =
        index === 0 ? 0 : frame.width * legalDivisions[index - 1];

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

/** Inset frame by a certain amount */
export function inset(frame: Frame, size: number): Frame {
  return createFrame(
    frame.x + size,
    frame.y + size,
    frame.width - size * 2,
    frame.height - size * 2
  );
}

export function getCenter(frame: Frame): Point {
  return createPoint(frame.x + frame.width / 2, frame.y + frame.height / 2);
}

// function getTopLeftCorner(frame: Frame): Point {

// }

// function getTopRightCorner(frame: Frame): Point {

// }

// function getBottomLeftCorner(frame: Frame): Point {

// }

// function getBottomRightCorner(frame: Frame): Point {

// }

export function center(targetFrame: Frame, parentFrame: Frame): Frame {
  const centerPoint = getCenter(parentFrame);

  return createFrame(
    centerPoint.x - targetFrame.width / 2,
    centerPoint.y - targetFrame.height / 2,
    targetFrame.width,
    targetFrame.height
  );
}

// https://github.com/anthonyec/scenery/blob/master/src/Scene.js#L161
export function intersect(frameA: Frame, frameB: Frame): Frame {
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

function sliceY(
  frame: Frame,
  ...divisions: number[]
): Frame[] {
  return [frame];
}

function resize(frame: Frame, width: number, height: number, pivot: Point): Frame {
  return frame;
}

// TODO: Test this!
export function translate(frame: Frame, x: number, y?: number): Frame {
  return createFrame(
    frame.x + (frame.width * x),
    frame.y + (frame.height * y),
    frame.width,
    frame.height
  );
}

function scale(frame: Frame, x: number, y: number, pivot: Point): Frame {
  return frame;
}

function distributeX(frames: Frame[], width: number): Frame[] {
  return frames;
}

function distributeY(frames: Frame[], width: number): Frame[] {
  return frames;
}

function parent(targetFrame: Frame, parentFrame: Frame): Frame {
  return targetFrame;
}

function grid(frame: Frame, rows: number[], columns: number[]): Frame[] {
  return [frame];
}

/** Create rectangle that encompasses two rectangles */
function encompass(frameA: Frame, frameB: Frame): Frame {
  return frameA;
}
