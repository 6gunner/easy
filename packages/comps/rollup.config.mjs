import { babel } from "@rollup/plugin-babel"; // 利用babel处理js
import json from "@rollup/plugin-json"; // 识别json转化为es6
import commonjs from "@rollup/plugin-commonjs"; // 识别commonjs并转化为es6
import resolve from "@rollup/plugin-node-resolve"; // 解析node_modules模块
import { dts } from "rollup-plugin-dts";
import typescript from "@rollup/plugin-typescript"; // 让 rollup 认识 ts 的代码
import path from "path";
import { fileURLToPath } from "url";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const babelConfigFile = path.join(__dirname, "../../babel.config.cjs");
const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.mjs",
      format: "es",
      sourcemap: !production,
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
    },
    { file: "dist/index.d.ts", format: "es" },
  ],
  plugins: [
    resolve({
      jsnext: true,
      extensions,
    }),
    json(),
    // 支持commonjs模块的编译
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: !production,
      inlineSources: !production,
    }),
    babel({ babelHelpers: "bundled", extensions, configFile: babelConfigFile }),
    dts(),
  ],
  external: ["react", "react-dom", "tslib"],
  watch: {
    clearScreen: false,
  },
};
