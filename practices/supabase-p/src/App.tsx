import { useEffect, useState } from "react";
import Auth from "./Auth";
import useInstrument from "./useInstrument";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

function App() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })
  }, [])

  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  
  const { instruments, error, isLoading } = useInstrument();
  console.log(instruments);

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("Signed out successfully");
    }
  }
  if (error) return <p>error</p>
  if (isLoading) return <p>loading</p>

  return (
    <>
      <ul>
        {instruments?.map((instrument) => (
          <li key={instrument.id}>{instrument.id} : {instrument.name}</li>
        ))}
      </ul>
      {user ? (
        <div>
          <p>Logged In</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ): <Auth />}
    </>
  );
}

export default App;
