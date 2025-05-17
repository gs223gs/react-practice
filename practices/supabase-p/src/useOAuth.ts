import { type User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import supabase from "./supabase";

const useOAuth = () => {
  const [userdata, setUserdata] = useState<User | null>(null);

  const fetchUserDate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUserdata(user);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return error;
  };

  useEffect(() => {
    fetchUserDate();
  }, []);

  return { userdata, signOut };
};

export default useOAuth;
