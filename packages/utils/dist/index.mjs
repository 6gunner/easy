import { __awaiter } from 'tslib';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import * as qs from 'querystring';

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
function useRequest(request, option) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // 用来取消请求
  // const abortRef = useRef<AbortController | null>(null);
  // const cancel = () => {
  //   console.log("我被执行了...")
  //   if (abortRef.current) {
  //     abortRef.current.abort();
  //     abortRef.current = null;
  //   }
  // }
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
  const _request = useCallback(() => __awaiter(this, void 0, void 0, function* () {
    setIsLoading(true);
    Promise.race([new Promise((_, reject) => {
      setTimeout(() => reject({
        code: 500,
        msg: `请求超时`
      }), (option === null || option === void 0 ? void 0 : option.timeout) || 1000);
    }), request()]).then(response => {
      if (response.status == 200) {
        option.onSuccess && option.onSuccess(response.data);
        setData(response.data);
      } else {
        return Promise.reject({
          code: response.status,
          msg: ""
        });
      }
    }).catch(err => {
      option.onError && option.onError(err);
      setError(err);
    }).finally(() => {
      setIsLoading(false);
    });
  }), []);
  useEffect(() => {
    _request();
  }, []);
  return {
    data,
    error,
    loading: isLoading
  };
}

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
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
axios.defaults.withCredentials = true;
/**
 * 传url，返回一个Promise
 * @param url
 * @param options
 * @returns  {code, msg, data}
 */
function makeRequest(url, options) {
  // 1. 处理request的headers和data参数
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
    data: qs.stringify(params),
    headers
  };
  // 如果是get请求，用params来传参
  if (config.method === 'get' || config.method === 'GET') {
    delete config.data;
    config.params = params;
  }
  // 返回一个函数，内部是一个axios的请求
  return () => {
    return axios(url, config).then(response => {
      const ret = {
        data: response.data,
        status: response.status
      };
      return Promise.resolve(ret);
    }).catch(error => {
      debugger;
      // 统一处理异常
      if (!error.response) {
        return Promise.reject({
          code: -1,
          msg: 'unknow error'
        });
      }
      const status = error.response.status;
      if (status === 403) {
        return Promise.reject({
          code: 403,
          msg: '包含非法内容，请求被拒绝'
        });
      }
      const data = error.response.data;
      if (!data) {
        return Promise.reject({
          code: -1,
          msg: 'unknow error'
        });
      }
      return Promise.reject({
        code: data.code || status,
        msg: data.msg
      });
    });
  };
}

export { camelCaseToLine, lineToCamelCase, makeRequest, unescapeHTML, useRequest };
