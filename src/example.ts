import { createFrame, divideHorizontally } from './index';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

function layout() {
  const mainFrame = createFrame(50, 50, 600, 300);
  const splitFrames = divideHorizontally(mainFrame, 0.3333, 0.6666);

  return {
    mainFrame, splitFrames
  }
}

function draw() {
  const { mainFrame, splitFrames } = layout();


  context.beginPath();
  context.rect(mainFrame.x, mainFrame.y, mainFrame.width, mainFrame.height);
  context.stroke();

  splitFrames.forEach((splitFrame) => {
    context.strokeStyle = 'red';
    context.beginPath();
    context.rect(splitFrame.x, splitFrame.y, splitFrame.width, splitFrame.height);
    context.stroke();
  });

}

draw();


