import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export default function GuessedWordsRecipient() {
  const { guessedWords } = useContext(GameContext);

  return (
    <>
      <h1 className="mt-2 mb-1 font-bold text-black">Guessed words:</h1>

      <aside className="guessedWordsRecipient animate__bounceIn flex flex-col bg-white">
        {guessedWords.map((word, index) => (
          <figure key={index} className="guessedWord text-black m-2 p-1 bg-slate-300">
            <span>{word}</span>
          </figure>
        ))}
      </aside>
    </>
  );
}
