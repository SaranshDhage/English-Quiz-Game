import { useContext, useDebugValue, useEffect, useState } from "react";
import { GameContext } from "../context/GameContext";
import FormingWordLettersRecipient from "./FormingWordLettersRecipient";
import GuessedWordsRecipient from "./GuessedWordsRecipient";
import MatchLettersRecipient from "./MatchLettersRecipient";
import StatsChart from "./StatsChart";
import SubmitButton from "./SubmitButton";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

export default function GameApp(props) {
  const email = props.email;
  const {
    setMatch,
    percentCompleted,
    clueCounter,
    clueWord,
    handleClickClueBtn,
  } = useContext(GameContext);

  const [revealHelp, setRevealHelp] = useState(false);
  const [time, setTime] = useState(0);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "users"), where("email", "==", email));
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        setUserDetails(data);
      });
    });
  }, []);

  useEffect(() => {
    if (percentCompleted !== 100) {
      const interval = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [time]);

  useEffect(() => {
    // console.log(percentCompleted);
    if (percentCompleted === 100) {
      if (userDetails.bestTime === -1 || time < userDetails.bestTime) {
        const q = query(collection(db, "users"), where("email", "==", email));
        getDocs(q).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setUserDetails(data);
            updateDoc(doc.ref, {
              bestTime: time,
            });
          });
        });
      }
    }
  }, [percentCompleted]);

  function transformTime(time) {
    let hr = Math.floor(time / 3600);
    let min = Math.floor((time - hr * 3600) / 60);
    let sec = time - hr * 3600 - min * 60;
    return `${hr < 10 ? "0" + hr : hr} hr ${min < 10 ? "0" + min : min} min ${
      sec < 10 ? "0" + sec : sec
    } sec`;
  }

  return (
    <>
      <main className="flex flex-col pb-3">
        <header className="animate__bounceIn flex flex-col items-center w-full pb-6 text-black">
          <h1 className="text-2xl"></h1>
          <h1 className="text-5xl font-bold text-red-800">
            Welcome to English Quiz Game
          </h1>
          <br />
          <p className="text-black">
            <span className="font-bold">Time Taken:</span> {transformTime(time)}
          </p>
          {/* <ul className="flex">
            <li className="mr-2">
              <a href="https://www.github.com/bkfan1" title="Github profile">
                <i className="bi bi-github"></i>
              </a>
            </li>
            <li>
              <a href="mailto:jacksonpf177@gmail.com" title="Send email">
                <i className="bi bi-envelope-fill"></i>
              </a>
            </li>
          </ul> */}
        </header>

        {percentCompleted === 100 ? (
          <>
            <menu className="animate__bounceIn mb-3 self-center">
              <a href="/">
                <button
                  // onClick={setMatch}
                  className="p-2 bg-green-500 text-black rounded"
                >
                  <i className="bi bi-plus" />
                  Play new match
                </button>
              </a>
            </menu>
            <StatsChart />
          </>
        ) : (
          <>
            <section className="statsSection animate__bounceIn flex flex-col">
              <p className="text-black">
                {percentCompleted}%<span className="font-bold">{" "}Completed</span>
              </p>
              <menu className="flex flex-col mt-2 ">
                <p className="remainingClues text-black">
                  <span className="font-bold">Remaining Hints:</span>{" "}
                  {clueCounter}/5
                </p>
                <div className="flex mt-2">
                  <button
                    onClick={handleClickClueBtn}
                    className="w-28 p-2 text-black bg-green-500  rounded"
                  >
                    <i className="bi bi-search" /> Hints
                  </button>
                  {clueWord ? (
                    <p className="animate__bounceIn ml-3 p-2 rounded bg-white text-center">
                      <i className="bi bi-chat-text" /> {clueWord}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </menu>
            </section>

            <section className="gameplaySection flex justify-between">
              <section className="sectionA flex flex-col mr-6">
                <GuessedWordsRecipient />
              </section>

              <section className="sectionB flex flex-col justify-around">
                <FormingWordLettersRecipient />
                <MatchLettersRecipient />
                <SubmitButton />
              </section>
            </section>

            <section
              className={`howToSection flex flex-col mt-6 bg-white p-2 rounded transition ease-in-out`}
              style={{ maxWidth: "500px" }}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-blue-900">
                  How to play:{" "}
                </h1>
                <i
                  title="Click to reveal"
                  onClick={() => setRevealHelp(!revealHelp)}
                  className={`fa-solid fa-chevron-${
                    revealHelp ? "up" : "down"
                  } bg-red-600 text-black rounded p-1 hover:cursor-pointer `}
                ></i>
              </div>

              {revealHelp ? (
                <>
                  <hr className="my-2" />

                  <p className="text-black">
                    The player is given six jumbled letters, and must arrange
                    the letters in the jumble to form as many words of three or
                    more letters as they can. Only 5 hints are available to the
                    user.
                  </p>
                  <h1 className="mt-3 text-xl font-bold text-blue-900">
                    Rules:
                  </h1>

                  <h2 className="font-bold text-blue-900">
                    The game will accept:
                  </h2>
                  <ul className="list-disc ml-3 text-black">
                    <li>Plural versions of already used words</li>
                  </ul>

                  <h2 className="font-bold mt-3 text-blue-900">
                    The game will not accept:
                  </h2>
                  <ul className="list-disc ml-3 text-black">
                    <li>Profanity</li>
                    <li>Words with less than three letters</li>
                  </ul>
                </>
              ) : (
                ""
              )}
            </section>
          </>
        )}
      </main>
    </>
  );
}
