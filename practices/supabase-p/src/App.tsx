
import Auth from "./Auth";
import useInstrument from "./useInstrument";
import useOAuth from "./useOAuth";

function App() {
  const { userdata, signOut } = useOAuth();

  const { instruments, error, isLoading } = useInstrument();

  if (error) return <p>error</p>
  if (isLoading) return <p>loading</p>

  return (
    <>
      <ul>
        {instruments?.map((instrument) => (
          <li key={instrument.id}>{instrument.id} : {instrument.name}</li>
        ))}
      </ul>
      {userdata && (
        <div>
          <p>Logged In</p>
          <p>{userdata.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
      {!userdata && <Auth />}
    </>
  );
}

export default App;
