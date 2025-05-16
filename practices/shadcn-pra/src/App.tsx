import { Button } from "@/components/ui/button";
import { useState } from "react";
function App() {
  const [state, setState] = useState<number>(0);
  const handleClick = () => {
    setState((prev) => (prev += 1));
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={handleClick}>{state}</Button>
    </div>
  );
}

export default App;
