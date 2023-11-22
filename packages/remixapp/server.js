const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
// const { createRequestHandler } = require("@remix-run/express");

const app = express();

app.all("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  console.log("经过了...");
  next();
});
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://t.weather.sojson.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api",
    },
  })
);

// app.all(
//   "*",
//   createRequestHandler({
//     getLoadContext() {
//       // Whatever you return here will be passed as `context` to your loaders.
//     },
//   })
// );

// let port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });
app.listen(3001, () => {
  console.log("启动");
});
