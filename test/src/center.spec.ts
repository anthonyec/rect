import testInOut from "../testInOut";

import { createFrame, center } from "../../src";

testInOut(center, [
  {
    description: "centers small frame inside bigger frame",
    in: [createFrame(0, 0, 300, 400), createFrame(0, 0, 800, 600)],
    out: { x: 250, y: 100, width: 300, height: 400 },
  },
  {
    description: "centers bigger frame inside smaller frame",
    in: [createFrame(0, 0, 800, 600), createFrame(0, 0, 300, 400)],
    out: { x: -250, y: -100, width: 800, height: 600 },
  }
]);
