import type { EasyRequestType, EasyResponse, EasyResponseError } from './types';
export type Option = {
    timeout?: number;
    debounce?: {
        wait: number;
        leading: boolean;
        trailing: boolean;
    };
};
export declare const useRequest: (request: EasyRequestType, option: Option) => {
    data: EasyResponse<any> | undefined;
    error: EasyResponseError | undefined;
    isLoading: boolean;
    cancel: () => void;
};
