import {
  center,
  createFrame,
  sliceX,
  getCenterPoint,
  inset,
  intersect,
} from "./index";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// Extend canvas context type to include `backingStorePixelRatio`
interface CanvasRenderingContext2D {
  webkitBackingStorePixelRatio: number;
  mozBackingStorePixelRatio: number;
  msBackingStorePixelRatio: number;
  oBackingStorePixelRatio: number;
  backingStorePixelRatio: number;
  scale: (w: number, h: number) => void;
}

// https://gist.github.com/callumlocke/cc258a193839691f60dd
function scaleCanvas(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  // assume the device pixel ratio is 1 if the browser doesn't specify it
  const devicePixelRatio = window.devicePixelRatio || 1;

  // determine the 'backing store ratio' of the canvas context
  const backingStoreRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  // determine the actual ratio we want to draw at
  const ratio = devicePixelRatio / backingStoreRatio;

  if (devicePixelRatio !== backingStoreRatio) {
    // set the 'real' canvas size to the higher width/height
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    // ...then scale it back down with CSS
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  } else {
    // this is a normal 1:1 device; just scale it simply
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = "";
    canvas.style.height = "";
  }

  // scale the drawing context so everything will work at the higher ratio
  context.scale(ratio, ratio);
}

// @ts-ignore
scaleCanvas(canvas, context, 800, 600);

function layout({ x, y }: { x: number; y: number }) {
  const mainFrame = createFrame(50, 50, 680, 230);
  const splitFrames = sliceX(mainFrame, 1 / 4, 3 / 4);
  const insetFrames = splitFrames.map((frame) => inset(frame, 25));
  const mainFrameInset = inset(mainFrame, -25);
  const centerOfSplitFrames = splitFrames.map((frame) => getCenterPoint(frame));
  const frameCenteredInFirstSplit = center(
    createFrame(0, 0, 30, 60),
    splitFrames[0]
  );
  const intersection = intersect(
    createFrame(x - 50, y - 50, 100, 100),
    splitFrames[1]
  );

  return {
    mainFrame,
    splitFrames,
    insetFrames,
    mainFrameInset,
    centerOfSplitFrames,
    frameCenteredInFirstSplit,
    intersection,
  };
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (evt) => {
  mouseX = evt.offsetX;
  mouseY = evt.offsetY;
});

function draw() {
  const {
    mainFrame,
    splitFrames,
    insetFrames,
    mainFrameInset,
    centerOfSplitFrames,
    frameCenteredInFirstSplit,
    intersection,
  } = layout({
    x: mouseX,
    y: mouseY,
  });

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.lineWidth = 1;

  context.beginPath();
  context.rect(mainFrame.x, mainFrame.y, mainFrame.width, mainFrame.height);
  context.stroke();

  context.strokeStyle = "green";
  context.beginPath();
  context.rect(
    mainFrameInset.x,
    mainFrameInset.y,
    mainFrameInset.width,
    mainFrameInset.height
  );
  context.stroke();

  context.strokeStyle = "yellow";
  context.beginPath();
  context.rect(
    frameCenteredInFirstSplit.x,
    frameCenteredInFirstSplit.y,
    frameCenteredInFirstSplit.width,
    frameCenteredInFirstSplit.height
  );
  context.stroke();

  splitFrames.forEach((splitFrame) => {
    context.strokeStyle = "red";
    context.beginPath();
    context.rect(
      splitFrame.x,
      splitFrame.y,
      splitFrame.width,
      splitFrame.height
    );
    context.stroke();
  });

  insetFrames.forEach((insetFrame) => {
    context.strokeStyle = "blue";
    context.beginPath();
    context.rect(
      insetFrame.x,
      insetFrame.y,
      insetFrame.width,
      insetFrame.height
    );
    context.stroke();
  });

  centerOfSplitFrames.forEach((centerPoint) => {
    context.fillRect(centerPoint.x - 2.5, centerPoint.y - 2.5, 5, 5);
  });

  if (intersection) {
    context.strokeStyle = "green";
    context.lineWidth = 3;
    context.beginPath();
    context.rect(
      intersection.x,
      intersection.y,
      intersection.width,
      intersection.height
    );
    context.stroke();
  }

  window.requestAnimationFrame(draw);
}

draw();
