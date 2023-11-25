type RequestHeaderValue = string | string[] | number | boolean | null;
interface RawRequestHeaders {
    [key: string]: RequestHeaderValue;
}
type CommonRequestHeadersList = 'Accept' | 'Content-Length' | 'User-Agent' | 'Content-Encoding' | 'Authorization' | 'Content-Type';
export type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
export interface EasyRequestOption<D> {
    method?: Method | string;
    headers?: RawRequestHeaders;
    data?: D;
}
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
export type EasyRequestService<TData = any> = () => Promise<EasyResponse<TData>>;
type OnSuccessCallback<T> = (data: T) => void;
type onErrorCallback = (err: EasyResponseError) => void;
export type EasyRequestServiceOption<T> = {
    timeout?: number;
    debounce?: {
        wait: number;
        leading: boolean;
        trailing: boolean;
    };
    onSuccess?: OnSuccessCallback<T>;
    onError?: onErrorCallback;
};
export interface EasyRequestFetchState<TData> {
    loading: boolean;
    data?: TData;
    error?: EasyResponseError;
}
export {};
