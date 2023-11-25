import axios from 'axios';
import * as qs from 'querystring';
import Cookies from '../cookie';
import { camelCaseToLine } from '../helper';

// ts
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { EasyRequestOption, EasyRequestHeaders, EasyResponse, EasyRequestService } from './types'



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
export function makeRequest<TData, TParams>(
  url: string,
  options: EasyRequestOption<TParams>,
): EasyRequestService<TData> {
  // 1. 处理request的headers和data参数
  const auToken = Cookies.read('auth-token');
  const tag = Cookies.read('tag');
  const headers: EasyRequestHeaders = {
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

  // 如果是get请求，用params来传参
  if (config.method === 'get' || config.method === 'GET') {
    delete config.data;
    config.params = params;
  }
  // 返回一个函数，内部是一个axios的请求
  return () => {
    return axios<TData, AxiosResponse<TData, TParams>, TParams>(url, config)
      .then((response) => {
        const ret: EasyResponse<TData> = {
          data: response.data,
          status: response.status
        }
        return Promise.resolve(ret);
      })
      .catch((error: any) => {
        debugger
        // 统一处理异常
        if (!error.response) {
          return Promise.reject({
            code: -1,
            msg: 'unknow error',
          });
        }
        const status = error.response.status;
        if (status === 403) {
          return Promise.reject({
            code: 403,
            msg: '包含非法内容，请求被拒绝',
          });
        }
        const data = error.response.data;
        if (!data) {
          return Promise.reject({
            code: -1,
            msg: 'unknow error',
          });
        }
        return Promise.reject({
          code: data.code || status,
          msg: data.msg,
        });
      });
  }
}
