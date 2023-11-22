import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as qs from 'querystring';

import { camelCaseToLine } from '../helper';
// store对象从app里拿
// import { routerRedux } from 'dva/router';

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
 * 全部都正常返回
 * @param url
 * @param options
 * @returns  {code, msg, data}
 */
export default function request(
  url: string,
  options: AxiosRequestConfig,
): Promise<any> {
  let auToken = Cookies.get('auth-token');
  let tag = Cookies.get('tag');
  if (!auToken) {
    auToken = Cookies.get('auth-token');
    tag = Cookies.get('tag');
  }
  const headers: any = {
    'auth-token': auToken || '',
    'org-tag': tag,
  };
  headers['X-Requested-With'] = 'XMLHttpRequest';
  headers['Content-Type'] = 'application/x-www-form-urlencoded';
  headers['Accept-Language'] = window.localStorage.lang || 'zh-cn';
  if (options?.headers) {
    for (const key in options.headers) {
      if ({}.hasOwnProperty.call(options.headers, key)) {
        headers[key] = options.headers[key];
      }
    }
  }
  const params: any = {};
  if (options.data) {
    for (const key in options.data) {
      if (Object.prototype.hasOwnProperty.call(options.data, key)) {
        //加上if判断去掉原型链上的
        params[camelCaseToLine(key)] = options.data[key];
      }
    }
  }

  const config: AxiosRequestConfig = {
    method: options.method || 'get',
    data: qs.stringify(params),
    headers,
  };

  if (config.method === 'get' || config.method === 'GET') {
    config.params = params;
  }
  return axios(url, config)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error: any) => {
      console.error(error, 'error');
      if (!error.response) {
        return Promise.reject({
          code: 1000,
          msg: 'unknow error',
        });
      }
      const status = error.response.status;
      const data = error.response.data;
      if (!data) {
        return Promise.reject({
          code: 1000,
          msg: 'unknow error',
        });
      }
      if (data.code === 30000) {
        window.sessionStorage.removeItem('userInfo');
        Cookies.remove('au_token');
        // dispatch(routerRedux.push('/user/login'));
        return Promise.reject(data);
      }
      if (status === 403) {
        return Promise.reject({
          code: 403,
          msg: '包含非法内容，请求被拒绝',
        });
      }
      return Promise.reject({
        code: data.code || status,
        msg: data.msg,
      });
    });
}
