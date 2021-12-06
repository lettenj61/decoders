import * as Superstruct from "superstruct";
import { StructError } from "superstruct";
import type { Describe, Struct } from "superstruct";
export declare class DecodeError extends Error {
}
export declare type DecodeResult<T> = [DecodeError, undefined] | [undefined, T];
export declare class GenericDecoder<P, T, I = unknown> {
    parse: (input: P) => I;
    struct: Describe<T>;
    constructor(parser: (input: P) => I, struct: Describe<T>);
    decode(input: P): DecodeResult<T>;
}
export declare function parseAndDecode<P, T, I = unknown>(input: P, parser: (input: P) => I, struct: Describe<T>): DecodeResult<T>;
export declare function defineStruct<T, S>(init: (api: typeof Superstruct) => Struct<T, S>): ReturnType<typeof init>;
export { Superstruct, StructError };
export type { Struct };
export declare class JsonDecoder<T> extends GenericDecoder<string, T> {
    constructor(struct: Describe<T>);
}
//# sourceMappingURL=decode.d.ts.map