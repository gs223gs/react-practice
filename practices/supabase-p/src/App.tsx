import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Auth from "./Auth";
import useInstrument from "./useInstrument";
import useOAuth from "./useOAuth";

import "./App.css";

function App() {
  const { userdata, signOut } = useOAuth();

  const { instruments, error, isLoading } = useInstrument();

  if (error) return <p>error</p>;
  if (isLoading) return <p>loading</p>;

  return (
    <>
      {userdata && (
        <>
          <div>
            <p>Logged In</p>
            <p>{userdata.email}</p>
            <p>{userdata.user_metadata.name}</p>
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage src={userdata.user_metadata.avatar_url} />
              <AvatarFallback>
              <p>T.Miura</p>
              </AvatarFallback>
            </Avatar>

            <Button onClick={signOut}>Sign Out</Button>
          </div>
          <div>
            <ul>
              {instruments?.map((instrument) => (
                <li key={instrument.id}>
                  {instrument.id} : {instrument.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {!userdata && <Auth />}
    </>
  );
}

export default App;
