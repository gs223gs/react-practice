import { createClient } from "@supabase/supabase-js";
import { Button } from "./components/ui/button";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Auth = () => {
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    console.log(data);
    console.log(error);
  };

  return (
    <div>
      <h1>Auth</h1>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};

export default Auth;
