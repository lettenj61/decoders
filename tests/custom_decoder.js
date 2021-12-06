const assert = require("assert");
const { GenericDecoder, defineStruct } = require("../dist/index");

const customParser = (input) => {
  if (input === "apple") {
    return { apple: 1 };
  }
  throw new TypeError("key must be 'apple'!");
}

const TestObj = defineStruct(({ any, object }) => object({
  apple: any(),
}));

class CustomDecoder extends GenericDecoder {
  constructor(struct) {
    super(customParser, struct);
  }
}

describe("GenericDecoder", () => {
  it("can use custom parser", () => {
    const decoder = new CustomDecoder(TestObj);
    const [err1, res1] = decoder.decode("apple");
    assert(err1 == null);
    assert.deepEqual(res1, {
      apple: 1,
    });

    const invalid = decoder.decode("banana");
    assert(invalid[0] != null);
    assert(invalid[0].message === "TypeError: key must be 'apple'!");
  });
})