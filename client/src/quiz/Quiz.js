import React, { useState, useEffect } from "react";
import { QuizData } from "./QuizData";
import QuizResult from "./QuizResult";
import "./quiz.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserScore } from "../state";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const userId = useSelector((state) => state.user._id);
  const statescore = useSelector((state) => state.userscore)
  const dispatch = useDispatch();
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await fetch("http://localhost:3001/fetchquiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({userId}),
        });
        if (response.ok) {
          const data = await response.json();
          setQuizData(data.games);
          console.log(quizData)
        } else {
          throw new Error("Failed to fetch quiz data");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }
    fetchQuizData();
  }, []);

  const handleScore = async () => {
    try {
      const response = await fetch("http://localhost:3001/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, score }),
      });
      const data = await response.json();
      console.log("data", data);
      console.log("current score ", data);
      console.log("score state ", statescore);
      if (response.ok) {
        dispatch(
          setUserScore({
            userscore: data,
          })
        );
      }
    } catch (error) {
      alert("Unsuccessful Updation");
    }
  };

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      handleScore();
      setShowResult(true);
    }
  };
  const updateScore = () => {
    if (clickedOption === QuizData[currentQuestion].answer) {
      setScore(score + 1);
    }
  };
  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
  };
  return (
    <div className="main">
      <div className="container">
        {showResult ? (
          <QuizResult
            score={score}
            totalScore={QuizData.length}
            tryAgain={resetAll}
          />
        ) : (
          <>
            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">
                {QuizData[currentQuestion].question}
              </span>
            </div>
            <div className="option-container">
              {QuizData[currentQuestion].options.map((option, i) => {
                return (
                  <button
                    // className="option-btn"
                    className={`option-btn ${
                      clickedOption === i + 1 ? "checked" : null
                    }`}
                    key={i}
                    onClick={() => setClickedOption(i + 1)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <input
              type="button"
              value="Next"
              id="next-button"
              className="px-4 py-2 bg-teal-700 text-white rounded-md shadow-md font-bold text-lg font-serif transition duration-200 hover:shadow-none active:scale-97"
              onClick={changeQuestion}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;

