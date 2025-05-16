import { useState } from "react";
export const useCounter = () => {
  const [count, setCount] = useState(0);
  const inc = () => {
    setCount((prev) => prev + 1);
  };

  const dec = () => {
    setCount((prev) => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };
  return { count, inc, dec, reset };
};
