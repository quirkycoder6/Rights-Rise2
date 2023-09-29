import React, { useState, useEffect } from 'react';
import { words } from './Words';
import './style.css';

const WordGuess = () => {
  const [correctWord, setCorrectWord] = useState('');
  const [maxTime, setMaxTime] = useState(30);
  const [timer, setTimer] = useState(null);
  const [userWord, setUserWord] = useState('');

  useEffect(() => {
    initGame();
  }, []);

  const initTimer = () => {
    clearInterval(timer);
    const newTimer = setInterval(() => {
      if (maxTime > 0) {
        setMaxTime(maxTime - 1);
      } else {
        clearInterval(newTimer);
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
      }
    }, 1000);
    setTimer(newTimer);
  };

  const initGame = () => {
    initTimer();
    const randomObj = words[Math.floor(Math.random() * words.length)];
    const wordArray = randomObj.word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    setCorrectWord(randomObj.word.toLowerCase());
    setUserWord('');
    wordText.innerText = wordArray.join('');
    hintText.innerText = randomObj.hint;
    inputField.value = '';
    inputField.setAttribute('maxlength', correctWord.length);
  };

  const checkWord = () => {
    const userWordLowerCase = userWord.toLowerCase();
    if (!userWordLowerCase) return alert('Please enter the word to check!');
    if (userWordLowerCase !== correctWord) return alert(`Oops! ${userWordLowerCase} is not the correct word`);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
  };

  let wordText, hintText, inputField;

  return (
    <div className="container">
      <h2>Word Scramble</h2>
      <div className="content">
        <p ref={(element) => (wordText = element)} className="word"></p>
        <div className="details">
          <p className="hint">
            Hint: <span ref={(element) => (hintText = element)}></span>
          </p>
          <p className="time">
            Time Left: <span><b>{maxTime}</b>s</span>
          </p>
        </div>
        <input
          ref={(input) => (inputField = input)}
          type="text"
          spellCheck="false"
          placeholder="Enter a valid word"
          value={userWord}
          onChange={(e) => setUserWord(e.target.value)}
        />
        <div className="buttons">
          <button className="refresh-word" onClick={initGame}>Refresh Word</button>
          <button className="check-word" onClick={checkWord}>Check Word</button>
        </div>
      </div>
    </div>
  );
};

export default WordGuess;
