import { babel } from "@rollup/plugin-babel"; // 利用babel处理js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
// import typescript from "rollup-plugin-typescript2";
import typescript from "@rollup/plugin-typescript"; // 让 rollup 认识 ts 的代码
import path from "path";
import { fileURLToPath } from "url";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const babelConfigFile = path.join(__dirname, "../../babel.config.cjs");

module.exports = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.mjs",
      format: "es",
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
    },
  ],
  plugins: [
    // 解析node_modules模块
    resolve({
      extensions,
    }),
    // 支持commonjs模块的编译
    commonjs(),
    typescript(),
    babel({ babelHelpers: "bundled", extensions, configFile: babelConfigFile }),
  ],
  external: ["react"],
};
