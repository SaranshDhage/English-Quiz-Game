import { useContext } from "react"
import { GameContext } from "../context/GameContext"

export default function SubmitButton(){
    const {handleClickMergeLetters, error} = useContext(GameContext);
    return (
      <>
        <button
          onClick={handleClickMergeLetters}
          disabled={error ? true : false}
          className={`animate__bounceIn text-black w-full p-2 mt-3 bg-yellow-400 rounded ${
            error ? "btnDisabled" : ""
          }`}
        >
          Submit
        </button>
      </>
    );
}