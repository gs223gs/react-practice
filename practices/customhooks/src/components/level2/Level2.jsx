import { useCounter } from "./hooks";

const Level2 = () => {
  const { count, inc, dec, reset } = useCounter();
  return (
    <>
      <p>Level2</p>
      <p>{count}</p>
      <button onClick={inc}>+1</button>
      <button onClick={dec}>-1</button>
      <button onClick={reset}>RESET</button>
    </>
  );
};

export default Level2;
