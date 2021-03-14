import {
  center,
  createFrame,
  sliceX,
  getCenter,
  inset,
  intersect,
  translate,
  boundingBox,
  stackY
} from "../src/index";
import { Frame } from "../src/types";

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
scaleCanvas(canvas, context, 1024, 768);

function layout({ x, y }: { x: number; y: number }) {
  const mainFrame = createFrame(50, 50, 680, 230);
  const splitFrames = sliceX(mainFrame, 1 / 3, 3 / 4);
  const insetFrames = splitFrames.map((frame) => inset(frame, 25));
  const mainFrameInset = inset(mainFrame, -25);
  const centerOfSplitFrames = splitFrames.map((frame) => getCenter(frame));
  const frameCenteredInFirstSplit = center(
    createFrame(0, 0, 30, 60),
    splitFrames[0]
  );
  const intersection = intersect(
    translate(createFrame(x, y, 100, 100), -0.5, -0.5),
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

function layout2({ x, y }: { x: number; y: number }) {
  const mainFrame = createFrame(100, 100, 800, 300);
  const framesSliced = sliceX(mainFrame, 1 / 6, 2 / 6, 3 / 6, 4 / 6);

  const container = createFrame(100, 100, 400, 500);
  // const frames = stackX([
  //   center(createFrame(200, 50, 100, 100), container),
  //   center(createFrame(200, 50, 200, 50), container),
  //   center(createFrame(200, 50, 150, 200), container),
  // ], 20);

  const frames = stackY(
    [
      createFrame(200, 90, 100, 100),
      createFrame(250, 50, 200, 50),
      createFrame(150, 60, 150, 100),
      createFrame(180, 60, 150, 200),
    ],
    10
  );

  const b1 = createFrame(90, 50, 100, 100);
  const b2 = createFrame(50, 60, 300, 300);
  const f1 = inset(b1, 3);
  const f2 = inset(b2, 3);

  const bounds = boundingBox([b1, b2]);

  return {
    f1,
    f2,
    bounds,
  };
}

function draw() {
  const frames = Object.values(
    layout2({
      x: mouseX,
      y: mouseY,
    })
    // @ts-ignore
  ).flat();

  context.clearRect(0, 0, canvas.width, canvas.height);

  frames.forEach((frame: Frame) => {
    if (!frame) {
      return;
    }

    context.strokeStyle = "blue";
    context.beginPath();
    context.rect(frame.x, frame.y, frame.width, frame.height);
    context.stroke();
  });

  window.requestAnimationFrame(draw);
}

draw();
