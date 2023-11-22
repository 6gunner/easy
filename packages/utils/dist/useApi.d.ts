export type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
export type IndexedType<T> = {
    [key: string]: T;
};
export type BaseRawReq = IndexedType<unknown>;
export type BaseReq = IndexedType<unknown>;
export type BaseRawRes = IndexedType<unknown>;
export type BaseRes = IndexedType<unknown>;
export type Option = {
    method: Method;
    timeout?: number;
    debounce?: {
        wait: number;
        leading: boolean;
        trailing: boolean;
    };
};
export declare const useApi: (url: string, option: Option) => {
    data: Response | undefined;
    error: null;
    isLoading: boolean;
    cancel: () => void;
};
