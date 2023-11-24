import type { AxiosRequestConfig } from 'axios';
import type { EasyRequestType } from './types';
/**
 * 传url，返回一个Promise
 * @param url
 * @param options
 * @returns  {code, msg, data}
 */
export declare function makeRequest(url: string, options: AxiosRequestConfig): EasyRequestType;
