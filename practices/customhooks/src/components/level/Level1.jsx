import { useToggleBool } from "./hooks";

const Level1 = () => {
  const { bool, toggle } = useToggleBool();
  return (
    <>
      <p>Hello Level-1 CustomHooks</p>
      <button onClick={toggle}>切り替え</button>
      {bool ? <p>True</p> : <p>false</p>}
    </>
  );
};

export default Level1;
