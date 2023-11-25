import { useState, useCallback, useEffect } from 'react';

import type { EasyRequestService, EasyResponse, EasyResponseError, EasyRequestFetchState, EasyRequestServiceOption } from './types';




// 核心方法，
export function useRequest<T>(request: EasyRequestService<T>, option: EasyRequestServiceOption<T>): EasyRequestFetchState<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<EasyResponseError>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 用来取消请求
  // const abortRef = useRef<AbortController | null>(null);

  // const cancel = () => {
  //   console.log("我被执行了...")
  //   if (abortRef.current) {
  //     abortRef.current.abort();
  //     abortRef.current = null;
  //   }
  // }

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

      Promise.race([
        new Promise<EasyResponse>((_, reject) => {
          setTimeout(
            () => reject({ code: 500, msg: `请求超时` }),
            option?.timeout || 1000);
        }),
        request()
      ]).then((response) => {
        if (response.status == 200) {
          option.onSuccess && option.onSuccess(response.data);
          setData(response.data);
        } else {
          return Promise.reject({
            code: response.status,
            msg: ""
          });
        }
      }).catch((err: EasyResponseError) => {
        option.onError && option.onError(err);
        setError(err);
      }).finally(() => {
        setIsLoading(false);
      })
    }, []);

  useEffect(() => {
    _request();
  }, []);

  return {
    data,
    error,
    loading: isLoading,
  }

}