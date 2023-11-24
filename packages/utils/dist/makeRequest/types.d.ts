type RequestHeaderValue = string | string[] | number | boolean | null;
interface RawRequestHeaders {
    [key: string]: RequestHeaderValue;
}
type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization' | 'Content-Type';
export type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
export interface EasyResponse<T = any> {
    data: T;
    status: number;
}
export type EasyRequestHeaders = Partial<RawRequestHeaders & {
    [Key in CommonRequestHeadersList]: RequestHeaderValue;
}>;
export type EasyResponseError = {
    code: number;
    msg: string;
};
export type EasyRequestType<T = any> = () => Promise<EasyResponse<T>>;
export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;
export interface FetchState<TData, TParams extends any[]> {
    loading: boolean;
    params?: TParams;
    data?: TData;
    error?: Error;
}
export type IndexedType<T> = {
    [key: string]: T;
};
export type BaseRawReq = IndexedType<unknown>;
export type BaseReq = IndexedType<unknown>;
export type BaseRawRes = IndexedType<unknown>;
export type BaseRes = IndexedType<unknown>;
export {};
