import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";

const Module = () => {

    const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <h1>Navigate to quiz</h1>
      {isAuth && <Link to="/lawquest/module/quiz" className="btn btn-primary">Quiz</Link>}

      <h1>Navigate to Number guess</h1>
      {isAuth && <Link to="/lawquest/module/numberguess" className="btn btn-primary">Number Guess</Link>}

      <h1>Navigate to Number guess Maker</h1>
      {isAuth && <Link to="/lawquest/module/numberguessmaker" className="btn btn-primary">Number Guess</Link>}

      <h1>Navigate to Word Guess</h1>
      {isAuth && <Link to="/lawquest/module/wordguess" className="btn btn-primary">Word Guess</Link>}

      <h1>Navigate to Jigsaw Puzzle</h1>
      {isAuth && <Link to="/lawquest/module/jigsaw" className="btn btn-primary">Jigsaw Puzzle</Link>}
    </div>
  );
}

export default Module;
