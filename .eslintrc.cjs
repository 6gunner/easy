// "@typescript-eslint/eslint-plugin": "^5.40.1",
// "@typescript-eslint/parser": "^5.40.1",

module.exports = {
  // 告诉ESLint你的环境是 Node、浏览器、es2021
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser", // 配置ts-eslint来解析
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
};
