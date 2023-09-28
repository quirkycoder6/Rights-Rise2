import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Leftbar from "../components/leftbar";
import Dailyquest from "../components/dailyquest";
import Navbar from "../components/navbar";

const Module = () => {

  const isAuth = Boolean(useSelector((state) => state.token));

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
            {isAuth && <Link to="/lawquest/module/quiz" className="btn btn-primary">Quiz Game</Link>}
            {isAuth && <Link to="/lawquest/module/numberguess" className="btn btn-primary">Number Guesser</Link>}
            {isAuth && <Link to="/lawquest/module/numberguessmaker" className="btn btn-primary">Number Guess Maker</Link>}
            {isAuth && <Link to="/lawquest/module/wordguess" className="btn btn-primary">Word Guesser</Link>}
            {isAuth && <Link to="/lawquest/module/jigsaw" className="btn btn-primary">Jigsaw Puzzle</Link>}
            {isAuth && <Link to="/lawquest/module/wordscramblemaker" className="btn btn-primary">Word Scramble Maker</Link>}
          </div>
          <div className="flex items-center flex-col gap-5">
            <Dailyquest />
            <Dailyquest />
            <Dailyquest />
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 w-full mb-3 md:hidden bg-white border-gray-300">
        <div className="flex justify-around items-center">
          <Leftbar />
        </div>
      </div>
    </div>
  );
}

export default Module;