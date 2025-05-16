import "./App.css";
import CountButton from "./components/CountButton";
import Timer from "./components/Timer";
import AutoForm from "./components/AutoForm";
import { useState } from "react";
function App() {
  const [prac, setPrac] = useState(0);
  return (
    <>
      {prac == 0 && (
        <>
          <CountButton />
          <button onClick={() => setPrac(1)}>2切り替え！</button>
          <button onClick={() => setPrac(2)}>3切り替え！</button>
        </>
      )}
      {prac == 1 && (
        <>
          <Timer />
          <button onClick={() => setPrac(0)}>1切り替え！</button>
          <button onClick={() => setPrac(2)}>3切り替え！</button>
        </>
      )}
      {prac == 2 && (
        <>
          <AutoForm />
          <button onClick={() => setPrac(0)}>1切り替え！</button>
          <button onClick={() => setPrac(1)}>2切り替え！</button>
        </>
      )}
    </>
  );
}

export default App;
