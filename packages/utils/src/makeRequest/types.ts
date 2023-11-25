// 定义headerValue
type RequestHeaderValue = string | string[] | number | boolean | null;

// 定义headers
interface RawRequestHeaders {
  [key: string]: RequestHeaderValue;
}

type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization' | 'Content-Type';

export type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";

// 框架里用到的请求体
export interface EasyRequestOption<D> {
  method?: Method | string;
  headers?: RawRequestHeaders;
  data?: D;
}
// 框架里用到的响应体结构
export interface EasyResponse<T = any> {
  data: T;
  status: number;
}

// 非必填的RequestHeaders
// 暂时没想好名字，先取个前缀叫Easy
export type EasyRequestHeaders = Partial<RawRequestHeaders & {
  [Key in CommonRequestHeadersList]: RequestHeaderValue;
}>

// 框架里用到的Error结构
export type EasyResponseError = {
  code: number,
  msg: string
}


// 这个是makeRequest返回的核心service，发起实际请求的
export type EasyRequestService<TData = any> = () => Promise<EasyResponse<TData>>;


type OnSuccessCallback<T> = (data: T) => void;
type onErrorCallback = (err: EasyResponseError) => void;

export type EasyRequestServiceOption<T> = {
  timeout?: number;
  debounce?: {
    wait: number;
    leading: boolean;
    trailing: boolean
  },
  onSuccess?: OnSuccessCallback<T>,
  onError?: onErrorCallback,
}

export interface EasyRequestFetchState<TData> {
  loading: boolean;
  data?: TData
  error?: EasyResponseError
}

// 定义一个type方法，可以获取对象的key类型
// export type IndexedType<T> = {
//   [key: string]: T
// }
// // 请求
// export type BaseRawReq = IndexedType<unknown>;
// export type BaseReq = IndexedType<unknown>;
// // 响应
// export type BaseRawRes = IndexedType<unknown>;
// export type BaseRes = IndexedType<unknown>;
