import { useInput } from "./hooks";

const Level3 = () => {
  const { value, onChange, reset } = useInput();
  return (
    <div>
      <p>level3</p>
      <input type="text" value={value} onChange={onChange} />
      <button onClick={reset}>リセット</button>
    </div>
  );
};

export default Level3;
