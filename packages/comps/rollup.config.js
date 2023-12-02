import typescript from "rollup-plugin-typescript2";

export default {
  input: ["src/index.tsx"],
  output: [
    {
      dir: "dist",
      entryFileName: "[name].cjs",
      format: "cjs",
    },
    {
      dir: "dist",
      entryFileName: "[name].mjs",
      format: "es",
    },
  ],
  plugins: [typescript()],
  external: ["react"], // 作为外部依赖
};
