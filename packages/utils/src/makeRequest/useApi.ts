import { useRef, useState, useCallback, useEffect } from 'react';

// 定义http请求类型
export type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";

// 定义一个type方法，可以获取对象的key类型
export type IndexedType<T> = {
  [key: string]: T
}

// 请求
export type BaseRawReq = IndexedType<unknown>;
export type BaseReq = IndexedType<unknown>;
// 响应
export type BaseRawRes = IndexedType<unknown>;
export type BaseRes = IndexedType<unknown>;

export type Option = {
  method: Method;
  timeout?: number;
  debounce?: {
    wait: number;
    leading: boolean;
    trailing: boolean
  }
}


// 核心方法，
export const useApi = (url: string, option: Option) => {
  const [data, setData] = useState<Response>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // 用来取消请求
  const abortRef = useRef<AbortController | null>(null);

  const cancel = () => {
    console.log("我被执行了...")
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }

  // const _request = useCallback(
  //   async () => {
  //     cancel();
  //     const controller = new AbortController();
  //     const signal = controller.signal;
  //     abortRef.current = controller;
  //     try {
  //       Promise.race([
  //         new Promise<Response>((_, reject) => {
  //           setTimeout(
  //             () => reject(`请求超时: ${url}`),
  //             option?.timeout || 1000);
  //         }),
  //         fetch(url, {
  //           ...option,
  //           method: option.method || "get",
  //           signal
  //         })
  //       ]).then(res => res.json())
  //         .then(data => {
  //           setData(data);
  //           setIsLoading(false)
  //         }).catch((e) => {
  //           throw e;
  //         })
  //     } catch (err: any) {
  //       console.error(err);
  //       // 自己取消的请求，不设置error
  //       if (err.name !== 'AbortError') {
  //         setError(err);
  //       }
  //       throw err;
  //     }
  //   },
  //   [url, option],
  // )


  const _request = useCallback(
    async () => {
      cancel();
      const controller = new AbortController();
      const signal = controller.signal;
      abortRef.current = controller;

      fetch(url, {
        ...option,
        method: option.method || "get",
        signal
      }).then(res => res.json())
        .then(data => {
          setData(data);
          setIsLoading(false)
        }).catch((e) => {
          throw e;
        })
    },
    [url, option],
  )

  useEffect(() => {
    _request();
  }, [_request])

  return {
    data,
    error,
    isLoading,
    cancel
  }

}