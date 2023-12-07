# `comps`

> 也就是说，组件开发者不在组件里直接引入样式，而是通过文档的形式告知用户要引入样式。主要是为了更灵活的去让自己选择怎么导入默认的样式，有可能是导入一个 global 样式，也可能是导入单个样式，也可能自己写了一套样式，只需要导入自己的就好了，省的花心思去覆盖默认的

## Usage

```
  "main": "lib/index", // commonjs模块
  "module": "./es/index", // es模块
  "files": [
    "lib",
    "es",
    "assets/*.css"
  ],

```

## dependencies

```
https://stitches.dev/
```
