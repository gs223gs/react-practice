import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useSession from "./useSession";
import supabase from "./supabase";

const Dashbord = () => {
  const { userdata} = useSession();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      window.location.href = "/";
    }
    return error;
  };
  return (
        <div>
          <p>Logged In</p>
          <p>{userdata?.email}</p>
          <p>{userdata?.user_metadata.name}</p>
          <Avatar className="w-32 h-32 mx-auto">
            <AvatarImage src={userdata?.user_metadata.avatar_url} />
            <AvatarFallback>
              <p>T.Miura</p>
            </AvatarFallback>
          </Avatar>

          <Button onClick={signOut}>Sign Out</Button>
        </div>
  );
};

export default Dashbord;