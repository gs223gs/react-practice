import { useState, useEffect } from "react";
const CountButton = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = count;
  }, [count]);
  return (
    <>
      <div>僕の名前はカウントボタン！</div>
      <button onClick={() => setCount((prev) => prev + 1)}>{count}</button>
    </>
  );
};

export default CountButton;
