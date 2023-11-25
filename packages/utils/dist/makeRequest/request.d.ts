import type { EasyRequestOption, EasyRequestService } from './types';
/**
 * 传url，返回一个Promise
 * @param url
 * @param options
 * @returns  {code, msg, data}
 */
export declare function makeRequest<TData, TParams>(url: string, options: EasyRequestOption<TParams>): EasyRequestService<TData>;
