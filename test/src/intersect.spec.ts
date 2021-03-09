import testInOut from "../testInOut";

import { createFrame, intersect } from "../../src";

testInOut(intersect, [
  {
    description: "creates new frame based on intersection overlap",
    in: [createFrame(0, 0, 300, 200), createFrame(150, 100, 300, 200)],
    out: { x: 150, y: 100, width: 150, height: 100 },
  },
  {
    description: "creates new frame based on intersection overlap negative",
    in: [createFrame(-100, -100, 500, 500), createFrame(-50, -50, 500, 500)],
    out: { x: -50, y: -50, width: 450, height: 450 },
  },
  {
    description: "handles no intersection",
    in: [createFrame(0, 0, 50, 50), createFrame(100, 100, 50, 50)],
    out: null,
  }
]);
