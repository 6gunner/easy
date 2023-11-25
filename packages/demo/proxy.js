module.exports = {
  "/api": {
    // target: 'https://1001.devapp.1doto.com/', //开发环境
    target: "http://jsonplaceholder.typicode.com/",
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/api": "/",
    },
    headers: {},
  },
};
