import assert from "assert";

import { createFrame, inset } from "../../src";

const inputOutputTests = [
  {
    description: "correctly returns inset frame 1",
    in: [createFrame(0, 0, 500, 300), 10],
    out: { x: 10, y: 10, width: 480, height: 280 }
  },
  {
    description: "correctly returns inset frame 2",
    in: [createFrame(-10, -10, 500, 300), 10],
    out: { x: 0, y: 0, width: 480, height: 280 }
  },
  {
    description: "correctly returns inset frame 3",
    in: [createFrame(-10, 10, 500, 300), 10],
    out: { x: 0, y: 20, width: 480, height: 280 }
  },
  {
    description: "correctly returns inset frame 4",
    in: [createFrame(10, 10, 500, 300), 10],
    out: { x: 20, y: 20, width: 480, height: 280 }
  },
  {
    description: "correctly returns inset frame 4",
    in: [createFrame(10, -10, 500, 300), 10],
    out: { x: 20, y: 0, width: 480, height: 280 }
  },
  {
    description: "correctly returns inset frame for negative inset",
    in: [createFrame(0, 0, 300, 200), -50],
    out: { x: -50, y: -50, width: 400, height: 300 }
  },
  {
    description: "correctly returns inset frame no inset",
    in: [createFrame(0, 0, 300, 200), 0],
    out: { x: 0, y: 0, width: 300, height: 200 }
  },
  {
    description: "correctly returns inset frame for decimals",
    in: [createFrame(0.3, 57.3, 1.3, 3.9), 0.472],
    out: {
      x: 0.772,
      y: 57.772,
      width: 0.3560000000000001,
      height: 2.956
    }
  }
];

describe("inset", () => {
  inputOutputTests.forEach((test) => {
    it(`${test.description}`, () => {
      // @ts-ignore
      const frame = inset(...test.in);

      try {
        assert.deepStrictEqual(frame, test.out);
      } catch (err) {
        assert.fail(
          `Actual output did not match expected output. \nInput: ${JSON.stringify(test.in)}\n\nExpected:\n${JSON.stringify(
            test.out,
            null,
            2
          )}\n\nActual:\n${JSON.stringify(frame, null, 2)}`
        );
      }
    });
  });
});
