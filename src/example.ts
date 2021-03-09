import { createFrame, divideHorizontally, inset } from './index';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function layout() {
  const mainFrame = createFrame(50, 50, 680, 230);
  const splitFrames = divideHorizontally(mainFrame, 1/4, 3/4);
  const insetFrames = splitFrames.map(frame => inset(frame, 25));

  return {
    mainFrame, splitFrames, insetFrames
  }
}

function draw() {
  const { mainFrame, splitFrames, insetFrames } = layout();

  context.beginPath();
  context.rect(mainFrame.x, mainFrame.y, mainFrame.width, mainFrame.height);
  context.stroke();

  splitFrames.forEach((splitFrame) => {
    context.strokeStyle = 'red';
    context.beginPath();
    context.rect(splitFrame.x, splitFrame.y, splitFrame.width, splitFrame.height);
    context.stroke();
  });

  insetFrames.forEach((insetFrame) => {
    context.strokeStyle = 'blue';
    context.beginPath();
    context.rect(insetFrame.x, insetFrame.y, insetFrame.width, insetFrame.height);
    context.stroke();
  });
}

draw();


