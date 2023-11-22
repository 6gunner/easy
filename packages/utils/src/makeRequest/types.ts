export type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;


export interface FetchState<TData, TParams extends any[]> {
  loading: boolean;
  params?: TParams
  data?: TData
  error?: Error
}

export interface RequestOption {

}