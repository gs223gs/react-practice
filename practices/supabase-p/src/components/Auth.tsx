import { Button } from "@/components/ui/button";

import "../App.css";
import supabase from "../supabase";

const Auth = () => {
  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      if (error) throw error;
      console.log("Sign-in successful:", data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error during sign-in:", error.message);
      } else {
        console.error("Unexpected error during sign-in:", error);
      }
    }
  };

  return (
    <div>
      <h1>Auth</h1>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
};

export default Auth;
