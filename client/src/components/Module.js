import React, { useState } from 'react';
import Leftbar from "../components/leftbar";
import Dailyquest from "../components/dailyquest";
import Navbar from "../components/navbar";
import QuizGame from "../quiz/Quiz";
import NumberGuesser from "../numberguess/NumberGuess";
import NumberGuessMaker from "../numberguess/NumberGuessMaker";
import WordGuesser from "../wordguesser/WordGuess";
import JigsawPuzzle from "../jigsawpuzzle/Jigsaw";
import Main from '../jigsawpuzzle/Main';
import WordScrambleGame from '../wordScramble/WordScrambleGame';
import WordScrambleMaker from '../wordScramble/WordScrambleMaker';

const Module = () => {
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <div className="flex-col flex">
      <div className="my-5">
        <Navbar />
      </div>
      <div className="flex justify-around gap-3 mt-7 px-5">
        <div className="hidden md:block">
          <Leftbar />
        </div>
        <div className="flex justify-center lg:justify-around sm:gap-3 flex-grow">
          <div className="flex items-center flex-col gap-4">
            <button onClick={() => setCurrentGame('quiz')} className="btn btn-primary">Quiz Game</button>
            <button onClick={() => setCurrentGame('numberguesser')} className="btn btn-primary">Number Guesser</button>
            <button onClick={() => setCurrentGame('numberguessmaker')} className="btn btn-primary">Number Guess Maker</button>
            <button onClick={() => setCurrentGame('wordguesser')} className="btn btn-primary">Word Guesser</button>
            <button onClick={() => setCurrentGame('jigsaw')} className="btn btn-primary">Jigsaw Puzzle</button>
            <button onClick={() => setCurrentGame('jigsawMaker')} className="btn btn-primary">Jigsaw Maker</button>
            <button onClick={() => setCurrentGame('wordscramble')} className="btn btn-primary">Word Scramble</button>
            <button onClick={() => setCurrentGame('wordscramblemaker')} className="btn btn-primary">Word Scramble Maker</button>
          </div>
          <div className="flex items-center flex-col gap-5">
            {currentGame === 'quiz' && <QuizGame />}
            {currentGame === 'numberguesser' && <NumberGuesser />}
            {currentGame === 'numberguessmaker' && <NumberGuessMaker />}
            {currentGame === 'wordguesser' && <WordGuesser />}
            {currentGame === 'jigsaw' && <JigsawPuzzle />}
            {currentGame === 'jigsawMaker' && <Main />}
            {currentGame === 'wordscramble' && <WordScrambleGame />}
            {currentGame === 'wordscramblemaker' && <WordScrambleMaker />}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full mb-3 md:hidden bg-white border-gray-300">
        <div className="flex justify-around items-center">
          <Dailyquest />
        </div>
      </div>
    </div>
  );
}

export default Module;
