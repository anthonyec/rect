import testInOut from "../testInOut";

import { createFrame, getCenterPoint } from "../../src";

testInOut(getCenterPoint, [
  {
    description: "gets center point 1",
    in: [createFrame(0, 0, 500, 300)],
    out: {
      x: 250,
      y: 150,
    },
  },
  {
    description: "gets center point 1",
    in: [createFrame(-100, -100, 200, 500)],
    out: {
      x: 0,
      y: 150,
    },
  },
  {
    description: "gets center point 2",
    in: [createFrame(100, -100, 200, 500)],
    out: {
      x: 200,
      y: 150,
    },
  },
  {
    description: "gets center point 3",
    in: [createFrame(100, 100, 200, 500)],
    out: {
      x: 200,
      y: 350,
    },
  },
  {
    description: "gets center point 4",
    in: [createFrame(-100, 100, 200, 500)],
    out: {
      x: 0,
      y: 350,
    },
  },
]);
