import React, { useEffect, useRef } from "react";

const useInterval = (callback, start, intervalPeriod) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = () => savedCallback.current();
    let interval;
    if (start) {
      interval = setInterval(handler, intervalPeriod);
    }
    return () => interval && clearInterval(interval);
  }, [start, intervalPeriod]);
};

export default useInterval;
