import {
  __commonJS,
  __toESM,
  require_jsx_dev_runtime,
  require_react
} from "/build/_shared/chunk-CXRG2SVS.js";

// ../header/dist/index.js
var require_dist = __commonJS({
  "../header/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var React__default = /* @__PURE__ */ _interopDefaultLegacy(React);
    function Header2() {
      return React__default["default"].createElement("header", null, "Lern is the original monorepo too!");
    }
    exports.Header = Header2;
  }
});

// ../footer/dist/index.js
var require_dist2 = __commonJS({
  "../footer/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = require_react();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var React__default = /* @__PURE__ */ _interopDefaultLegacy(React);
    function Footer2() {
      return React__default["default"].createElement("footer", null, "Footer");
    }
    exports["default"] = Footer2;
  }
});

// app/routes/index.tsx
var import_header = __toESM(require_dist());
var import_footer = __toESM(require_dist2());

// ../utils/src/useApi.ts
var import_react = __toESM(require_react());
var useApi = (url2, option2) => {
  const [data, setData] = (0, import_react.useState)();
  const [error, setError] = (0, import_react.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  const abortRef = (0, import_react.useRef)(null);
  const cancel = () => {
    console.log("\u6211\u88AB\u6267\u884C\u4E86...");
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };
  const _request = (0, import_react.useCallback)(
    async () => {
      cancel();
      const controller = new AbortController();
      const signal = controller.signal;
      abortRef.current = controller;
      fetch(url2, {
        ...option2,
        method: option2.method || "get",
        signal
      }).then((res) => res.json()).then((data2) => {
        setData(data2);
        setIsLoading(false);
      }).catch((e) => {
        throw e;
      });
    },
    [url2, option2]
  );
  (0, import_react.useEffect)(() => {
    _request();
  }, [_request]);
  return {
    data,
    error,
    isLoading,
    cancel
  };
};

// app/routes/index.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
var url = "https://mdn.github.io/dom-examples/abort-api/sintel.mp4";
var option = {
  method: "get",
  timeout: 5e3
};
function Index() {
  const { data, error, cancel } = useApi(url, option);
  cancel();
  if (error) {
    console.log(error);
  }
  const handleStart = () => {
  };
  const handleClick = () => {
    cancel();
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_header.Header, {}, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
      "Content!",
      data && JSON.stringify(data)
    ] }, void 0, true, {
      fileName: "app/routes/index.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleStart, children: "start" }, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: handleClick, children: "cancel" }, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_footer.default, {}, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/index.tsx",
    lineNumber: 28,
    columnNumber: 5
  }, this);
}
export {
  Index as default
};
//# sourceMappingURL=/build/routes/index-QXTAL5EB.js.map
