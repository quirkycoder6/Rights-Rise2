import React, { useState, useEffect } from 'react';
import './WordScrambleGame.css';
import {words} from './data'

function App() {
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [userInput, setUserInput] = useState('');
  const [correctWord, setCorrectWord] = useState('');
  const [isGameRunning, setIsGameRunning] = useState(false);

  let timer;

  const initTimer = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(timer);
          alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
          initGame(); // Reset the game after the time is up
          return 0;
        }
      });
    }, 1000);
  };

  const initGame = () => {
    initTimer();
    const randomObj = words[Math.floor(Math.random() * words.length)];
    const wordArray = randomObj.word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    setWord(wordArray.join(''));
    setHint(randomObj.hint);
    setCorrectWord(randomObj.word.toLowerCase());
    setUserInput('');
    setIsGameRunning(true);
  };

  useEffect(() => {
    initGame();
  }, []);

  const checkWord = () => {
    const userWord = userInput.toLowerCase();
    if (!userWord) return alert('Please enter the word to check!');
    if (userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    clearInterval(timer); // Stop the timer when the word is correct
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
  };

  const resetGame = () => {
    clearInterval(timer);
    setTimeLeft(30);
    setIsGameRunning(false);
    setUserInput('');
  };

  return (
    <div className="container">
      <h2>Word Scramble</h2>
      <div className="content">
        <p className="word">{word}</p>
        <div className="details">
          <p className="hint">Hint: <span>{hint}</span></p>
          <p className="time">Time Left: <span><b>{timeLeft}</b>s</span></p>
        </div>
        <input
          type="text"
          spellCheck="false"
          placeholder="Enter a valid word"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={!isGameRunning}
        />
        <div className="buttons">
          <button className="refresh-word" onClick={resetGame}>Refresh Word</button>
          <button className="check-word" onClick={checkWord} disabled={!isGameRunning}>Check Word</button>
        </div>
      </div>
    </div>
  );
}

export default App;
