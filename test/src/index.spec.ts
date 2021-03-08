import assert from "assert";

import { createFrame, divideHorizontally } from "../../src";

const inputOutputTests = [
  {
    description: "splits in half when no divisions provided",
    in: [createFrame(0, 0, 500, 300)],
    out: [
      { x: 0, y: 0, width: 250, height: 300 },
      { x: 250, y: 0, width: 250, height: 300 },
    ],
  },
  {
    description: "handles 1 division (0.3)",
    in: [createFrame(0, 0, 500, 300), 0.3],
    out: [
      { x: 0, y: 0, width: 150, height: 300 },
      { x: 150, y: 0, width: 350, height: 300 },
    ],
  },
  {
    description: "handles 1 division (0.8)",
    in: [createFrame(0, 0, 800, 200), 0.8],
    out: [
      { x: 0, y: 0, width: 640, height: 200 },
      { x: 640, y: 0, width: 160, height: 200 },
    ],
  },
  {
    description: "handles 1 division negative (0.8)",
    in: [createFrame(-10, -10, 800, 200), 0.8],
    out: [
      { x: -10, y: -10, width: 640, height: 200 },
      { x: 630, y: -10, width: 160, height: 200 },
    ],
  },
  {
    description: "correct number of frames returned (0.3, 0.7)",
    in: [createFrame(0, 0, 500, 300), 0.3, 0.7],
    out: [
      { x: 0, y: 0, width: 150, height: 300 },
      { x: 150, y: 0, width: 199.99999999999997, height: 300 }, // 199.99999999999997 should be 200, how to avoid rounding error?
      { x: 350, y: 0, width: 150.00000000000003, height: 300 },
    ],
  },
  {
    description: "correct number of frames returned negative (0.3, 0.7)",
    in: [createFrame(-10, 0, 500, 300), 0.3, 0.7],
    out: [
      { x: -10, y: 0, width: 150, height: 300 },
      { x: 140, y: 0, width: 199.99999999999997, height: 300 }, // 199.99999999999997 should be 200, how to avoid rounding error?
      { x: 340, y: 0, width: 150.00000000000003, height: 300 }, // TODO: How to get around floating point issue?
    ],
  },
  {
    description: "correct number of frames returned for uneven float numbers",
    in: [createFrame(17.2, 6.4, 31.2, 22.3), 0.317, 0.666],
    out: [
      { x: 17.2, y: 6.4, width: 9.8904, height: 22.3 },
      { x: 27.0904, y: 6.4, width: 10.888800000000002, height: 22.3 },
      { x: 37.9792, y: 6.4, width: 10.420799999999998, height: 22.3 },
    ],
  },
  {
    description: "correct number of frames returned 1",
    in: [createFrame(25, 50, 300, 200), 0.3, 0.7],
    out: [
      { x: 25, y: 50, width: 90, height: 200 },
      { x: 115, y: 50, width: 119.99999999999999, height: 200 },
      { x: 235, y: 50, width: 90.00000000000001, height: 200 },
    ],
  },
  {
    description: "correct number of frames returned 2",
    in: [createFrame(-25, 50, 300, 200), 0.3, 0.7],
    out: [
      { x: -25, y: 50, width: 90, height: 200 },
      { x: 65, y: 50, width: 119.99999999999999, height: 200 },
      { x: 185, y: 50, width: 90.00000000000001, height: 200 },
    ],
  },
  {
    description: "correct number of frames returned 3",
    in: [createFrame(-25, -50, 300, 200), 0.3, 0.7],
    out: [
      { x: -25, y: -50, width: 90, height: 200 },
      { x: 65, y: -50, width: 119.99999999999999, height: 200 },
      { x: 185, y: -50, width: 90.00000000000001, height: 200 },
    ],
  },
  {
    description: "correct number of frames returned 4",
    in: [createFrame(25, -50, 300, 200), 0.3, 0.7],
    out: [
      { x: 25, y: -50, width: 90, height: 200 },
      { x: 115, y: -50, width: 119.99999999999999, height: 200 },
      { x: 235, y: -50, width: 90.00000000000001, height: 200 },
    ],
  },
  {
    description: "handles lower bound",
    in: [createFrame(0, 0, 300, 200), 0, 0.7],
    out: [
      { x: 0, y: 0, width: 0, height: 200 },
      { x: 0, y: 0, width: 210, height: 200 },
      { x: 210, y: 0, width: 90.00000000000001, height: 200 },
    ],
  },
  {
    description: "handles upper bound",
    in: [createFrame(0, 0, 300, 200), 0.5, 1],
    out: [
      { x: 0, y: 0, width: 150, height: 200 },
      { x: 150, y: 0, width: 150, height: 200 },
      { x: 300, y: 0, width: 0, height: 200 },
    ],
  },
  {
    description: "handles lower and upper bound",
    in: [createFrame(0, 0, 300, 200), 0, 1],
    out: [
      { x: 0, y: 0, width: 0, height: 200 },
      { x: 0, y: 0, width: 300, height: 200 },
      { x: 300, y: 0, width: 0, height: 200 },
    ],
  },
  {
    description: "handles only lower bound",
    in: [createFrame(0, 0, 300, 200), 0],
    out: [
      { x: 0, y: 0, width: 0, height: 200 },
      { x: 0, y: 0, width: 300, height: 200 },
    ],
  },
  {
    description: "handles only upper bound",
    in: [createFrame(0, 0, 300, 200), 1],
    out: [
      { x: 0, y: 0, width: 300, height: 200 },
      { x: 300, y: 0, width: 0, height: 200 },
    ],
  },
  {
    description: "handles divisions which are the same",
    in: [createFrame(0, 0, 300, 200), 0.5, 0.5, 0.7],
    out: [
      { x: 0, y: 0, width: 150, height: 200 },
      { x: 150, y: 0, width: 0, height: 200 },
      { x: 150, y: 0, width: 59.999999999999986, height: 200 },
      { x: 210, y: 0, width: 90.00000000000001, height: 200 },
    ],
  },
  {
    description: "handles divisions which are lower bounds that are the same",
    in: [createFrame(0, 0, 300, 200), 0, 0, 0.5],
    out: [
      { x: 0, y: 0, width: 0, height: 200 },
      { x: 0, y: 0, width: 0, height: 200 },
      { x: 0, y: 0, width: 150, height: 200 },
      { x: 150, y: 0, width: 150, height: 200 },
    ],
  },
  {
    description: "handles divisions which are upper bounds that are the same",
    in: [createFrame(0, 0, 300, 200), 0.5, 1, 1],
    out: [
      { x: 0, y: 0, width: 150, height: 200 },
      { x: 150, y: 0, width: 150, height: 200 },
      { x: 300, y: 0, width: 0, height: 200 },
      { x: 300, y: 0, width: 0, height: 200 },
    ],
  },
  {
    description:
      "handles divisions which are lower and upper bounds that are the same",
    in: [createFrame(0, 0, 300, 200), 0, 0, 0.5, 1, 1],
    out: [
      { x: 0, y: 0, width: 0, height: 200 },
      { x: 0, y: 0, width: 0, height: 200 },
      { x: 0, y: 0, width: 150, height: 200 },
      { x: 150, y: 0, width: 150, height: 200 },
      { x: 300, y: 0, width: 0, height: 200 },
      { x: 300, y: 0, width: 0, height: 200 },
    ],
  },
  {
    description: "handles unordered divisions",
    in: [createFrame(0, 0, 300, 200), 0.5, 0.1, 0.2],
    out: [
      { x: 0, y: 0, width: 30, height: 200 },
      { x: 30, y: 0, width: 30, height: 200 },
      { x: 60, y: 0, width: 90, height: 200 },
      { x: 150, y: 0, width: 150, height: 200 },
    ],
  },
  {
    description: "handles unordered lower and upper bound divisions",
    in: [createFrame(0, 0, 300, 200), 0.5, 1, 0.1, 0, 0.2],
    out: [
      { x: 0, y: 0, width: 0, height: 200 },
      { x: 0, y: 0, width: 30, height: 200 },
      { x: 30, y: 0, width: 30, height: 200 },
      { x: 60, y: 0, width: 90, height: 200 },
      { x: 150, y: 0, width: 150, height: 200 },
      { x: 300, y: 0, width: 0, height: 200 },
    ],
  },
  {
    description: "clamps divisions bigger than 1",
    in: [createFrame(0, 0, 300, 200), 0.5, 2],
    out: [
      { x: 0, y: 0, width: 150, height: 200 },
      { x: 150, y: 0, width: 150, height: 200 },
      { x: 300, y: 0, width: 0, height: 200 },
    ],
  },
  {
    description: "clamps divisions lower than 0",
    in: [createFrame(0, 0, 300, 200), -2, 0.5],
    out: [
      { x: 0, y: 0, width: 0, height: 200 },
      { x: 0, y: 0, width: 150, height: 200 },
      { x: 150, y: 0, width: 150, height: 200 },
    ],
  },
];

describe("divideHorizontally", () => {
  inputOutputTests.forEach((test) => {
    it(`${test.description}`, () => {
      // @ts-ignore
      const frames = divideHorizontally(...test.in);

      assert.strictEqual(frames.length, test.out.length);

      try {
        assert.deepStrictEqual(frames, test.out);
      } catch (err) {
        assert.fail(
          `Actual output did not match expected output\nExpected:\n${JSON.stringify(
            test.out,
            null,
            2
          )}\n\nActual:\n${JSON.stringify(frames, null, 2)}`
        );
      }
    });
  });
});
