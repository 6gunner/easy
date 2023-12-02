const proxy = require("./proxy");
const { whenDev } = require("@craco/craco");

module.exports = {
  typescript: {
    enableTypeChecking: false /* (default value) */,
  },
  webpack: {
    // 因为我在项目里link了本地的ts写的源码到node_modules依赖里，因此要写一些配置
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        module: {
          ...webpackConfig.module,
          rules: webpackConfig.module.rules.map((rule) => {
            if (!rule.oneOf) return rule;
            return {
              ...rule,
              oneOf: rule.oneOf.map((ruleObject) => {
                if (
                  !new RegExp(ruleObject.test).test(".ts") ||
                  !ruleObject.include
                )
                  return ruleObject;
                return { ...ruleObject, include: undefined };
              }),
            };
          }),
        },
      };
    },
  },
  devServer: whenDev(() => ({
    proxy,
  })),
  eslint: {
    mode: "file",
  },
};
