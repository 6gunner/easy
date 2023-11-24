'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var react = require('react');
var axios = require('axios');
var qs = require('querystring');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var qs__namespace = /*#__PURE__*/_interopNamespace(qs);

function lineToCamelCase(targetString) {
  return targetString.replace(/_(\w)/g, function (match, letter) {
    // a_s  aS
    // c_f   cF
    return letter.toUpperCase();
  });
}
/**
 * @function unescapeHTML 还原html脚本 < > & " '
 * @param a - 字符串
 */
function unescapeHTML(a) {
  a = '' + a;
  return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
}
/**
 * 驼峰转下划线
 * @param str
 * @returns {*}
 */
function camelCaseToLine(targetString) {
  return targetString.replace(/([A-Z])/g, function (match) {
    return '_' + match.toLowerCase();
  });
}

/*
 * Cookie
 */
function read(name) {
  const value = document.cookie.match("(?:^|;)\\s*" + name + "=([^;]*)");
  return value ? decodeURIComponent(value[1]) : null;
}
function write(name, value, options) {
  let str = name + "=" + encodeURIComponent(value);
  if (options === null || options === void 0 ? void 0 : options.domain) {
    str += "; domain=" + options.domain;
  }
  if (options === null || options === void 0 ? void 0 : options.path) {
    str += "; path=" + (options.path || "/");
  }
  if (options === null || options === void 0 ? void 0 : options.expires) {
    let expiresDate;
    // 如果是number
    if (typeof options.expires === 'number') {
      expiresDate = new Date(Date.now() + options.expires * 864e5);
    } else {
      expiresDate = options.expires;
      str += "; expires=" + expiresDate.toUTCString();
    }
  }
  document.cookie = str;
  return;
}
function del(name, options) {
  write(name, '', Object.assign({}, options, {
    expires: -1
  }));
}
var Cookies = {
  read,
  write,
  del
};

// 核心方法，
const useRequest = (request, option) => {
  const [data, setData] = react.useState();
  const [error, setError] = react.useState();
  const [isLoading, setIsLoading] = react.useState(true);
  // 用来取消请求
  const abortRef = react.useRef(null);
  const cancel = () => {
    console.log("我被执行了...");
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };
  // const _request = useCallback(
  //   async () => {
  //     cancel();
  //     const controller = new AbortController();
  //     const signal = controller.signal;
  //     abortRef.current = controller;
  //     try {
  //       Promise.race([
  //         new Promise<Response>((_, reject) => {
  //           setTimeout(
  //             () => reject(`请求超时: ${url}`),
  //             option?.timeout || 1000);
  //         }),
  //         fetch(url, {
  //           ...option,
  //           method: option.method || "get",
  //           signal
  //         })
  //       ]).then(res => res.json())
  //         .then(data => {
  //           setData(data);
  //           setIsLoading(false)
  //         }).catch((e) => {
  //           throw e;
  //         })
  //     } catch (err: any) {
  //       console.error(err);
  //       // 自己取消的请求，不设置error
  //       if (err.name !== 'AbortError') {
  //         setError(err);
  //       }
  //       throw err;
  //     }
  //   },
  //   [url, option],
  // )
  const _request = react.useCallback(() => tslib.__awaiter(void 0, void 0, void 0, function* () {
    setIsLoading(true);
    try {
      const response = yield request();
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }), []);
  react.useEffect(() => {
    _request();
  }, [_request]);
  return {
    data,
    error,
    isLoading,
    cancel
  };
};

/**
 * 一、功能：
 * 1. 统一拦截http错误请求码；
 * 2. 统一拦截业务错误代码；
 * 3. 统一设置请求前缀
 *
 * 二、引包：
 * |-- axios：http 请求工具库
 * |-- store：使用 dispatch 对象，用于触发路由跳转
 */
axios__default["default"].defaults.timeout = 5000;
axios__default["default"].defaults.baseURL = '';
axios__default["default"].defaults.withCredentials = true;
/**
 * 传url，返回一个Promise
 * @param url
 * @param options
 * @returns  {code, msg, data}
 */
function makeRequest(url, options) {
  const auToken = Cookies.read('auth-token');
  const tag = Cookies.read('tag');
  const headers = {
    'auth-token': auToken || '',
    'org-tag': tag
  };
  headers['X-Requested-With'] = 'XMLHttpRequest';
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  headers['Accept-Language'] = window.localStorage.lang || 'zh-cn';
  if (options === null || options === void 0 ? void 0 : options.headers) {
    for (const key in options.headers) {
      if ({}.hasOwnProperty.call(options.headers, key)) {
        headers[key] = options.headers[key];
      }
    }
  }
  const params = {};
  if (options.data) {
    for (const key in options.data) {
      if (Object.prototype.hasOwnProperty.call(options.data, key)) {
        //加上if判断去掉原型链上的
        params[camelCaseToLine(key)] = options.data[key];
      }
    }
  }
  const config = {
    method: options.method || 'get',
    data: qs__namespace.stringify(params),
    headers
  };
  if (config.method === 'get' || config.method === 'GET') {
    config.params = params;
  }
  return () => {
    return axios__default["default"](url, config).then(response => {
      return Promise.resolve(response.data);
    }).catch(error => {
      // 捕获异常
      console.error(error, 'error');
      if (!error.response) {
        return Promise.reject({
          code: -1,
          msg: 'unknow error'
        });
      }
      const status = error.response.status;
      const data = error.response.data;
      if (!data) {
        return Promise.reject({
          code: 1,
          msg: 'unknow error'
        });
      }
      if (status === 403) {
        return Promise.reject({
          code: 403,
          msg: '包含非法内容，请求被拒绝'
        });
      }
      return Promise.reject({
        code: data.code || status,
        msg: data.msg
      });
    });
  };
}

exports.camelCaseToLine = camelCaseToLine;
exports.lineToCamelCase = lineToCamelCase;
exports.makeRequest = makeRequest;
exports.unescapeHTML = unescapeHTML;
exports.useRequest = useRequest;
