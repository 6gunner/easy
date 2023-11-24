const proxy = require("./proxy");
const { whenDev } = require("@craco/craco");

module.exports = {
  devServer: whenDev(() => ({
    proxy,
  })),
};
