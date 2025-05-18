import "../App.css";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useSession from "../hooks/useSession";

import useOAuth from "../hooks/useOAuth";
const Header = () => {
  const { userdata } = useSession();
  const { signOut } = useOAuth();
  return (
    <div className="flex justify-between items-center m-2 p-2 rounded-4xl">
      <p className="text-2xl font-bold">Logged In</p>
      <div className="flex justify-end items-center">
        <p className="font-bold m-3">{userdata?.email}</p>
        <p className="font-bold m-3">{userdata?.user_metadata.name}</p>
        <div className="flex gap-2">
          <Avatar className=" m-3 w-10 h-10">
            <AvatarImage src={userdata?.user_metadata.avatar_url} className="w-10 h-10"/>
            <AvatarFallback>
              <p>T.Miura</p>
            </AvatarFallback>
          </Avatar>
        </div>
        <Button onClick={signOut} className="">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Header;
