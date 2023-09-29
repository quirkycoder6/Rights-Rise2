import "./App.css";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Module from './components/Module';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterPage from "./pages/login";
import Quiz from "./quiz/Quiz";
import Jigsaw from './jigsawpuzzle/Jigsaw';
import UserProfile from './profile/main';
import LeaderBoard from "./leaderboard/LeaderBoard";
import More from "./more/More";
import NumberGuess from "./numberguess/NumberGuess";
import WordGuess from "./wordguesser/WordGuess";
import WordScrambleGame from "./wordScramble/WordScrambleGame";
import WordScrambleMaker from "./wordScramble/WordScrambleMaker";
import NumberGuessMaker from "./numberguess/NumberGuessMaker";
import Main from "./jigsawpuzzle/Main";
import MCQQuestionMaker from "./quiz/QuizMaker";

function App() {
  const isAuth =Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/lawquest"
            element={isAuth ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/profile"
            element={isAuth ? <UserProfile /> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/leaderboard"
            element={isAuth ? <LeaderBoard /> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/more"
            element={isAuth ? <More /> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module"
            element={isAuth ? <Module name="vid.mp4"/> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module2"
            element={isAuth ? <Module name="vid2.mp4"/> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module3"
            element={isAuth ? <Module name="vid3.mp4"/> : <Navigate to="/" />}
          />
           <Route
            path="/lawquest/module/quiz"
            element={isAuth ? <Quiz /> : <Navigate to="/" />}
          />
           <Route
            path="/lawquest/module/numberguess"
            element={isAuth ? <NumberGuess /> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module/wordguess"
            element={isAuth ? <WordGuess /> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module/jigsaw"
            element={isAuth ? < Jigsaw/> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module/wordscramble"
            element={isAuth ? < WordScrambleGame/> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module/wordscramblemaker"
            element={isAuth ? < WordScrambleMaker/> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module/numberguessmaker"
            element={isAuth ? < NumberGuessMaker/> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module/jigsawmaker"
            element={isAuth ? < Main/> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module/quizmaker"
            element={isAuth ? < MCQQuestionMaker/> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
