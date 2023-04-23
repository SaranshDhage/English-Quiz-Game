import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { GameProvider } from "../context/GameContext";
import GameApp from "../GameComponents/GameApp";

export default function Game() {
  const [user, loading] = useAuthState(auth);
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row items-center justify-center py-2 w-screen mainDiv bg-cyan-400">
            {/* <div className="w-9/12 flex flex-col items-center justify-center"> */}
            <GameProvider>
              <div className="App">
                <GameApp email={user.email} />
              </div>
            </GameProvider>
            {/* </div> */}
            {/* <div className="w-6/12 flex flex-col items-center justify-center">
              <Score email={user.email} />
            </div> */}
          </div>
        </>
      )}
    </>
  );
}
