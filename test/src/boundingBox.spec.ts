import testInOut from "../testInOut";

import { boundingBox, createFrame } from "../../src";

testInOut(boundingBox, [
  {
    description: "gets correct bounding box",
    in: [[createFrame(0, 0, 500, 300)]],
    out: { x: 0, y: 0, width: 500, height: 300 },
  },
  {
    description: "gets correct bounding box 2",
    in: [[createFrame(0, 0, 500, 300), createFrame(600, 0, 500, 300)]],
    out: { x: 0, y: 0, width: 1100, height: 300 },
  },
  {
    description: "gets correct bounding box 3",
    in: [[createFrame(0, 0, 500, 300), createFrame(0, 800, 500, 300)]],
    out: { x: 0, y: 0, width: 500, height: 1100 },
  },
  {
    description: "gets correct bounding box 4",
    in: [[createFrame(500, 0, 300, 800), createFrame(0, 400, 200, 900)]],
    out: { x: 0, y: 0, width: 800, height: 1300 },
  },
  ,
  {
    description: "gets correct bounding box 5",
    in: [[createFrame(-100, -130, 300, 800), createFrame(100, 400, 200, 900)]],
    out: { x: -100, y: -130, width: 400, height: 1430 },
  },
]);
