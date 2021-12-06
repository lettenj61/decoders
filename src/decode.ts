import * as Superstruct from "superstruct";
import { StructError, validate } from "superstruct";
import type { Describe, Struct } from "superstruct";

export class DecodeError extends Error {}

export type DecodeResult<T> = [DecodeError, undefined] | [undefined, T];

export class GenericDecoder<P, T, I = unknown> {
  parse: (input: P) => I;
  struct: Describe<T>;

  constructor(parser: (input: P) => I, struct: Describe<T>) {
    this.parse = parser;
    this.struct = struct;
  }

  decode(input: P): DecodeResult<T> {
    return parseAndDecode(input, this.parse, this.struct);
  }
}

export function parseAndDecode<P, T, I = unknown>(
  input: P,
  parser: (input: P) => I,
  struct: Describe<T>
): DecodeResult<T> {
  try {
    const parsed = parser(input);
    const [err, value] = validate(parsed, struct);

    if (err) {
      return [new DecodeError(`StructError: ${err.message}`), void 0];
    }
    return [void 0, value];
  } catch (err) {
    if (err instanceof DecodeError) {
      return [err, void 0];
    } else {
      return [new DecodeError(err), void 0];
    }
  }
}

export function defineStruct<T, S>(init: (api: typeof Superstruct) => Struct<T, S>): ReturnType<typeof init> {
  return init(Superstruct);
}

export { Superstruct, StructError };

export type { Struct };

export class JsonDecoder<T> extends GenericDecoder<string, T> {
  constructor(struct: Describe<T>) {
    super(JSON.parse, struct);
  }
}
