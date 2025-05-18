import Auth from "./Auth";

import "./App.css";
import Dashbord from "./Dashbord";
import useSession from "./useSession";

function App() {
  const { userdata } = useSession();
  console.log(userdata);
  return (
    <>
      {userdata && <Dashbord />}
      {!userdata && <Auth />}
    </>
  );
}

export default App;
