import React, { useState, useEffect } from "react";
import "./App.css";
import sampleWords from './data';


const getRandomWord = () => {
  const randomPlace = Math.floor(Math.random() * sampleWords.length);
  return sampleWords[randomPlace];
};

const WordGuess = () => {
  const [wordData, setWordData] = useState(getRandomWord());
  const [msg, setMsg] = useState("");
  const [chosenLetters, setChosenLetters] = useState([]);
  const [guesshints, setHints] = useState(3);
  const [displayWord, setDisplayWord] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState(0);

  useEffect(() => {
    if (wrongGuesses >= 3) {
      // Code to show the popup or message for game over
      window.alert("Game Over! You made too many wrong guesses.");
      restartGameFunction();
    }
  }, [wrongGuesses]);

  const letterSelectFunction = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters([...chosenLetters, letter]);
      if (!wordData.word.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1);
      }
    }
  };

  const hintFunction = () => {
    if (guesshints > 0) {
      const hiddenLetterIndex = wordData.word
        .split("")
        .findIndex((letter) => !chosenLetters.includes(letter));
      setChosenLetters([...chosenLetters, wordData.word[hiddenLetterIndex]]);
      setHints(guesshints - 1);
    }
  };

  const removeCharacterFunction = () => {
    setChosenLetters(chosenLetters.slice(0, -1));
  };

  const displayLettersFunction = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Array.from(letters).map((letter, index) => (
      <button
        key={index}
        onClick={() => letterSelectFunction(letter)}
        disabled={chosenLetters.includes(letter)}
        className={`letter-button ${
          chosenLetters.includes(letter) ? "selected" : ""
        }`}
      >
        {letter}
      </button>
    ));
  };

  const checkWordGuessedFunction = () => {
    return wordData.word
      .split("")
      .every((letter) => chosenLetters.includes(letter));
  };

  const guessFunction = () => {
    if (checkWordGuessedFunction()) {
      setMsg("Congo! You have guessed the word correctly!");
    } else {
      setMsg("You made a Wrong Guess!. Try again!");
      setDisplayWord(true);
    }
  };

  const restartGameFunction = () => {
    setWordData(getRandomWord());
    setMsg("");
    setChosenLetters([]);
    setHints(3);
    setDisplayWord(false);
    setGameOver(false);
    setWrongGuesses(0);
  };

  return (
    <div className="guesscontainer">
      <div className="guessword-container">
        {Array.from(wordData.word).map((letter, index) => (
          <div
            key={index}
            className={`letter ${
              chosenLetters.includes(letter) ? "visible" : ""
            }`}
          >
            {chosenLetters.includes(letter) ? letter : ""}
          </div>
        ))}
      </div>
      <p className="word-description">Hint: {wordData.description}</p>
      {msg && (
        <div className="message">
          <p>{msg}</p>
          {displayWord && <p>Correct word was: {wordData.word}</p>}
        </div>
      )}
      <div className="button-section">
        <div className="guess-section">
          <button onClick={restartGameFunction} className="restart-button">
            Restart
          </button>
          <button
            onClick={removeCharacterFunction}
            disabled={!chosenLetters.length}
            className="remove-button"
          >
            Remove Letter
          </button>
        </div>
        <div className="letter-selection">{displayLettersFunction()}</div>
        <div className="guesshints">
          Hints Remaining: {guesshints}{" "}
          <button
            onClick={hintFunction}
            disabled={guesshints === 0}
            className="hint-button"
          >
            Get Hint
          </button>
        </div>
        {!msg && (
          <button
            onClick={guessFunction}
            disabled={!chosenLetters.length}
            className="guess-button"
          >
            Guess
          </button>
        )}
      </div>
    </div>
  );
};

export default WordGuess;
