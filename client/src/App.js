import "./App.css";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Module from './components/Module';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RegisterPage from "./pages/login";
import Quiz from "./quiz/Quiz";
import CrossWord from './crossword/CrossWord';
import BoggleGame from './bogglegame/BoggleGame';
import Jigsaw from './jigsawpuzzle/Jigsaw';
import UserProfile from './profile/main';
import LeaderBoard from "./leaderboard/LeaderBoard";
import More from "./more/More";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
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
            element={isAuth ? <Module /> : <Navigate to="/" />}
          />
           <Route
            path="/lawquest/module/quiz"
            element={isAuth ? <Quiz /> : <Navigate to="/" />}
          />
           <Route
            path="/lawquest/module/crossword"
            element={isAuth ? <CrossWord /> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module/bogglegame"
            element={isAuth ? <BoggleGame /> : <Navigate to="/" />}
          />
          <Route
            path="/lawquest/module/jigsaw"
            element={isAuth ? < Jigsaw/> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
