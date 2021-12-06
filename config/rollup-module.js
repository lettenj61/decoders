import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

/**
 * @type { import("rollup").RollupOptions }
 */
const config = {
  input: "src/index.ts",
  output: {
    file: "dist/index.mjs",
    format: "esm",
  },
  plugins: [
    nodeResolve(),
    typescript(),
  ],
};

export default config;