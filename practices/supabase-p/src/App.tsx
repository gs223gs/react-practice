import Auth from "./components/Auth";

import "./App.css";
import Dashbord from "./components/Dashbord";
import useSession from "./hooks/useSession";

function App() {
  const { userdata } = useSession();
  return (
    <>
      {userdata && <Dashbord />}
      {!userdata && <Auth />}
    </>
  );
}

export default App;
