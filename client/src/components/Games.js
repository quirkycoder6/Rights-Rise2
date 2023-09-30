
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Leftbar from "../components/leftbar";
import Dailyquest from "../components/dailyquest";

import QuizGame from "../quiz/Quiz";
import NumberGuesser from "../numberguess/NumberGuess";
import WordGuesser from "../wordguesser/WordGuess";
import JigsawPuzzle from "../jigsawpuzzle/Jigsaw";
import WordScramble from "../wordScramble/WordScrambleGame";


const Games = () => {
  const [currentGame, setCurrentGame] = useState();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); 
  };

  return (
    <div className="flex-col flex">
      
      <div className="flex justify-around gap-3 mt-7 px-5">


        {/* <div>
        <button
        onClick={goBack}
        className="w-12 h-12  m-2 text-lg transition-colors duration-150 rounded-full text-blue-400 border-blue-500 border-2 bg-blue-100 focus:shadow-outline">
        &lt; 
      </button>
        </div> */}


        <div className="flex-grow md:flex md:flex-row justify-center sm:gap-3">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setCurrentGame('quiz')}
              className={`h-16 px-6 m-2 text-lg text-white font-bold transition-colors duration-150 rounded-lg
              ${currentGame === 'quiz' ? 'bg-yellow-600' : 'bg-yellow-500'}
              ${currentGame === 'quiz' ? 'focus:shadow-none hover:bg-yellow-600' : 'focus:shadow-outline hover:bg-yellow-600'}`}
            >
              Quiz Game
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setCurrentGame('numberguesser')}
              className={`h-16 px-6 m-2 text-lg text-white font-bold transition-colors duration-150 rounded-lg
              ${currentGame === 'numberguesser' ? 'bg-yellow-600' : 'bg-yellow-500'}
              ${currentGame === 'numberguesser' ? 'focus:shadow-none hover:bg-yellow-600' : 'focus:shadow-outline hover:bg-yellow-600'}`}
            >
              Number Guesser
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setCurrentGame('wordscramble')}
              className={`h-16 px-6 m-2 text-lg text-white font-bold transition-colors duration-150 rounded-lg
              ${currentGame === 'wordscramble' ? 'bg-yellow-600' : 'bg-yellow-500'}
              ${currentGame === 'wordscramble' ? 'focus:shadow-none hover:bg-yellow-600' : 'focus:shadow-outline hover:bg-yellow-600'}`}
            >
              Word Scramble
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setCurrentGame('wordguesser')}
              className={`h-16 px-6 m-2 text-lg text-white font-bold transition-colors duration-150 rounded-lg
              ${currentGame === 'wordguesser' ? 'bg-yellow-600' : 'bg-yellow-500'}
              ${currentGame === 'wordguesser' ? 'focus:shadow-none hover:bg-yellow-600' : 'focus:shadow-outline hover:bg-yellow-600'}`}
            >
              Word Guesser
            </button>
          </div>
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => setCurrentGame('jigsaw')}
              className={`h-16 px-6 m-2 text-lg text-white font-bold transition-colors duration-150 rounded-lg
              ${currentGame === 'jigsaw' ? 'bg-yellow-600' : 'bg-yellow-500'}
              ${currentGame === 'jigsaw' ? 'focus:shadow-none hover:bg-yellow-600' : 'focus:shadow-outline hover:bg-yellow-600'}`}
            >
              Jigsaw Puzzle
            </button>
          </div>
          
        </div>
      </div>
      <div className="fixed bottom-0 w-full mb-3 md:hidden bg-white border-gray-300">
        <div className="flex justify-around items-center">
          <Dailyquest />
        </div>
      </div>
      <div className="flex-grow bg-white flex justify-center items-center">
        
        {currentGame === 'quiz' && <QuizGame />}
        {currentGame === 'numberguesser' && <NumberGuesser />}
        {currentGame === 'wordscramble' && <WordScramble />}
        {currentGame === 'wordguesser' && <WordGuesser />}
        {currentGame === 'jigsaw' && <JigsawPuzzle />}
      </div>

      
    </div>
  );
}

export default Games;
