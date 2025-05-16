import { useInterval } from "./hooks";

const Level4 = () => {
  const { start, stop, isRunning, timer } = useInterval();
  return (
    <>
      <div>
        <p>{isRunning ? "計測中" : "ストップ"}</p>
        <p>{timer}秒経過</p>
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
      </div>
    </>
  );
};

export default Level4;
