const assert = require("assert");
const { JsonDecoder, defineStruct } = require("../dist/index");

const TestObj = defineStruct(({ object, string, number, array }) => object({
  name: string(),
  count: number(),
  data: array(string()),
}));

describe("JsonDecoder", () => {
  const decoder = new JsonDecoder(TestObj);
  it("should fail on parsing when input is invalid JSON", () => {
    const x = `"Hello`;
    const result = decoder.decode(x);

    assert(result[0] != null);
  });

  it("should fail on struct mismatch", () => {
    const invalid = JSON.stringify({
      foo: false,
    });
    const result = decoder.decode(invalid);

    assert(result[0] != null);
  });

  it("should assert object shape", () => {
    const valid = {
      name: "Hello",
      count: 100,
      data: ["Yes", "No"],
    };
    const input = JSON.stringify(valid);
    const [err, res] = decoder.decode(input);

    assert(err == null);
    assert.deepEqual(res, valid);
  });
});