import { useState, useEffect } from "react";

export const useInterval = (delay: number) => {

  const [tick, setTick] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, delay);

    return () => clearInterval(interval);

  }, [delay]);

  return [tick];

}
