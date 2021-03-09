import assert from "assert";

interface Test<Input, Output> {
  description: string;
  in: Input;
  out: Output;
}

// TODO: Remove any
export default function testInOut<Input, Output>(
  testSubject: any,
  tests: Test<Input, Output>[]
) {
  describe(testSubject.name, () => {
    tests.forEach((test) => {
      it(`${test.description}`, () => {
        // TODO: Remove this
        // @ts-ignore
        const result = testSubject(...test.in);

        try {
          assert.deepStrictEqual(result, test.out);
        } catch (err) {
          assert.fail(
            `Actual output did not match expected output. \nInput: ${JSON.stringify(
              test.in
            )}\n\nExpected:\n${JSON.stringify(
              test.out,
              null,
              2
            )}\n\nActual:\n${JSON.stringify(result, null, 2)}`
          );
        }
      });
    });
  });
}
