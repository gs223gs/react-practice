import { useState, useEffect } from "react";
export const useInterval = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        console.log(intervalId);
        setTimer((prev) => prev + 1);
      }, 1000);
      console.log('作成されたID:', intervalId);
    }

    return () => {
      if (intervalId) {
        console.log('クリーンアップするID:', intervalId);
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);

  const stop = () => setIsRunning(false);

  return { start, stop, isRunning, timer };
};
