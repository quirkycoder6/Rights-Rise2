import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";

const Module = () => {

    const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <h1>Navigate to quiz</h1>
      {isAuth && <Link to="/lawquest/module/quiz" className="btn btn-primary">Quiz</Link>}

      <h1>Navigate to Crossword</h1>
      {isAuth && <Link to="/lawquest/module/crossword" className="btn btn-primary">Crossword</Link>}

      <h1>Navigate to BoggleGame</h1>
      {isAuth && <Link to="/lawquest/module/bogglegame" className="btn btn-primary">BoggleGame</Link>}

      <h1>Navigate to Jigsaw Puzzle</h1>
      {isAuth && <Link to="/lawquest/module/jigsaw" className="btn btn-primary">Jigsaw Puzzle</Link>}
    </div>
  );
}

export default Module;
