import React, { useState, useEffect } from 'react';
import './number.css';

const App = () => {

  
  const [answer] = useState(12);
  const [chance, setChance] = useState(5);
  const [inputValue, setInputValue] = useState('');
  const [guessText, setGuessText] = useState('');
  const [guessColor, setGuessColor] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Check');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [score, setScore] = useState(0); 

  useEffect(() => {
    if (chance === 0) {
      setButtonLabel('Replay');
      setInputDisabled(true);
      setGuessText('You lost the game');
      setGuessColor('#DE0611');
    }
  }, [chance]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckClick = () => {
    let updatedChance = chance - 1;

    if (parseInt(inputValue, 10) === answer) {
      setGuessText('Congratulations');
      setInputDisabled(true);
      setButtonLabel('Replay');
      setGuessColor('#333');
      setScore(chance);
    } else if (parseInt(inputValue, 10) > answer && parseInt(inputValue, 10) < 100) {
      setGuessText('Your guess is high');
      setChance(updatedChance);
      setGuessColor('#333');
    } else if (parseInt(inputValue, 10) < answer && parseInt(inputValue, 10) > 0) {
      setGuessText('Your guess is low');
      setChance(updatedChance);
      setGuessColor('#333');
    } else {
      setGuessText('Your number is invalid');
      setChance(updatedChance);
      setGuessColor('#DE0611');
    }

    if (updatedChance < 0) {
      window.location.reload();
    }
  };

  return (
    <div className='main'>
      <div className="wrapper">
        <header>Article number ____ is Right to Equality </header>
        <p className="guess" style={{ color: guessColor }}>
          {guessText}
        </p>
        <div className="input-field">
          <input
          id='num'
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
          <button id='butnum' onClick={handleCheckClick}>{buttonLabel}</button>
        </div>
        <p>
          You have <span className="chances">{chance}</span> chances
        </p>
        <p>
          Score: {score}
        </p>
      </div>
    </div>
  );
};

export default App;
