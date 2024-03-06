import { useNavigate } from 'react-router-dom';
import './wordguess.css'
import React, { useState, useEffect } from 'react';

const WordGuessGame = () => {
  const navigate = useNavigate();
  const words = ['EQUALITY', 'JUSTICE', 'ABUSE', 'DISCRIMINATION', 'EXPLOITATION', 'UNICEF', 'UNTOUCHABILITY'];
  const hints  = ['Everyone deserves the same treatement ! It is called _______ (8 letters)',
                  'Quality of being just or fair is _______ (7 letters)',
                  'Fairness fights against all kinds of _________ (5 letters)',
                  'Equality breaks down walls of _____________ (12 letters)',
                  "Unfair gain at other's expenses (12 letters)",
                  'Global Organization dedicated to childrens welfare (6 letter abbreviation)',
                  'Caste based exclusion is ___________ (14 letters)'];

  const [selectedWord, setSelectedWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [hintAndUnderscores, setHintAndUnderscores] = useState('');
  const [id, setId] = useState(0);

  const resetGame = () => {
    setGuessedLetters([]);
    setGameWon(false);

    const randomIndex = Math.floor(Math.random() * words.length);
    setId(randomIndex);
    setSelectedWord(words[randomIndex]);

    const wordArray = words[randomIndex].split('');
    const numberOfHints = Math.floor(wordArray.length * 0.35);
    const hintIndices = [];

    while (hintIndices.length < numberOfHints) {
      const randomIndex = Math.floor(Math.random() * wordArray.length);
      if (!hintIndices.includes(randomIndex)) {
        hintIndices.push(randomIndex);
      }
    }

    const staticHintsAndUnderscores = wordArray.map((letter, index) =>
      hintIndices.includes(index) ? letter : ' _ '
    );

    setHintAndUnderscores(staticHintsAndUnderscores.join(''));
  };

  useEffect(() => {
    resetGame();
  }, []); // Empty dependency array to run only once on mount

  const handleGuess = (letter) => {
    setGuessedLetters((prevLetters) => [...prevLetters, letter]);
  };

  const handleFinalGuess = () => {
    if (guessedLetters.join('') === selectedWord) {
      setGameWon(true);
    }
  };

  return (
    <div className='wordguess-container flex-col justify-center lg:justify-around sm:gap-3 flex-grow'>
      <h2 className='mt-16 font-xxl text-bold'>Word Guess Game</h2>
      <br />
      <p className='text-center'>{hints[id]}</p>
      <p className='text-center'>{hintAndUnderscores}</p>
      <br />
      <p className='text-center'>Guessed Letters : {guessedLetters.join('')}</p>
      {gameWon ? (
        <div>
          <p className='text-center'>Congratulations! You guessed the word!</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div>
          <p className='text-center'>Click letters to select and press submit --&gt; </p>
          <div className='text-center flex-row justify-center align-center'>
            {Array.from({ length: 26 }, (_, index) => String.fromCharCode('A'.charCodeAt(0) + index)).map(
              (letter) => (
                <button className='text-center cursor-pointer' style={{position: "relative", margin: "0.5", width: "3dvw", height: "5dvh", backgroundColor: '#ffbd03', border: '1px solid black', borderRadius: "6px"}} key={letter} onClick={() => handleGuess(letter)}>
                  {letter}
                </button>
              )
            )}
          </div>
          <br />
          <div className='flex justify-evenly'>
            <label className='flex justify-evenly font-xxl' style={{width:"55dvw"}}>
              Final Guess : 
              <input className='wordguess-inputbox max-h-8' style={{marginBottom: "7dvh", width: "40dvw"}}
                type="text"
                value={guessedLetters.join('')}
                onChange={(e) => setGuessedLetters(e.target.value.toLowerCase().split(''))}
              />
            </label>
            <button className='wordguess-final-submit' style={{position: "relative", width: "14dvw", height: "5dvh", marginBottom: "10dvh", left:"-5dvw", backgroundColor: '#5adbb5', border: '1px solid black', borderRadius: "14px"}} onClick={handleFinalGuess}>Submit Final Guess</button>
          </div>
          <button className='text-center mt-20' style={{position: "relative", width: "9dvw", left:"45dvw", backgroundColor: '#dd7973', border: '1px solid black', borderRadius: "14px"}} onClick={() => navigate('/lawquest')}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default WordGuessGame;
