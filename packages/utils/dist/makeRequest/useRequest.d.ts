import type { EasyRequestService, EasyRequestFetchState, EasyRequestServiceOption } from './types';
export declare function useRequest<T>(request: EasyRequestService<T>, option: EasyRequestServiceOption<T>): EasyRequestFetchState<T>;
