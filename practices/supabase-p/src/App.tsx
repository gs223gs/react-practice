import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Instrument {
  name: string;
}

function App() {
  const [instruments, setInstruments] = useState<Instrument[]>([]);

  useEffect(() => {
    getInstruments();
  }, []);

  console.log(instruments);
  async function getInstruments() {
    const { data } = await supabase.from("instruments").select();
    if (data) {
      setInstruments(data);
    } else {
      setInstruments([]);
    }
  }

  return (
    <>
      <ul>
        {instruments.map((instrument) => (
          <li key={instrument.name}>{instrument.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
