import { createFrame, divideHorizontally, getCenterPoint, inset } from "./index";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

function layout() {
  const mainFrame = createFrame(50, 50, 680, 230);
  const splitFrames = divideHorizontally(mainFrame, 1 / 4, 3 / 4);
  const insetFrames = splitFrames.map((frame) => inset(frame, 25));
  const mainFrameInset = inset(mainFrame, -25);
  const centerOfSplitFrames = splitFrames.map((frame) => getCenterPoint(frame));

  return {
    mainFrame,
    splitFrames,
    insetFrames,
    mainFrameInset,
    centerOfSplitFrames
  };
}

function draw() {
  const { mainFrame, splitFrames, insetFrames, mainFrameInset, centerOfSplitFrames } = layout();

  context.beginPath();
  context.rect(mainFrame.x, mainFrame.y, mainFrame.width, mainFrame.height);
  context.stroke();

  context.strokeStyle = "green";
  context.beginPath();
  context.rect(mainFrameInset.x, mainFrameInset.y, mainFrameInset.width, mainFrameInset.height);
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
    context.fillRect(centerPoint.x - 2.5, centerPoint.y - 2.5, 5, 5)
  });
}

draw();
