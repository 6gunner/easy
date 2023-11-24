import { useRef, useState, useCallback, useEffect } from 'react';

import type { Method, EasyRequestType, EasyResponse, EasyResponseError } from './types';

export type Option = {
  timeout?: number;
  debounce?: {
    wait: number;
    leading: boolean;
    trailing: boolean
  }
}


// 核心方法，
export const useRequest = (request: EasyRequestType, option: Option) => {
  const [data, setData] = useState<EasyResponse>();
  const [error, setError] = useState<EasyResponseError>();
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
      setIsLoading(true);
      try {
        const response: EasyResponse = await request();
        setData(response);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    _request();
  }, [_request]);

  return {
    data,
    error,
    isLoading,
    cancel
  }

}