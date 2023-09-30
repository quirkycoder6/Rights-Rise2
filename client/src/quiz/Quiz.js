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
  const statescore = useSelector((state) => state.userscore);
  const dispatch = useDispatch();
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    // Create an object with the userId and convert it to JSON
    const requestBody = JSON.stringify({ userId });

    // Configure the fetch request
    const requestOptions = {
      method: "POST", // Use POST method to send the userId in the request body
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: requestBody, // Include the JSON-encoded userId in the request body
    };

    // Fetch data from the API endpoint when the component mounts
    fetch("http://localhost:3001/fetchquiz", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        // Update the quizData state variable with the fetched data
        setQuizData(data);
        console.log("Fetched quizData:", data);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
      });
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

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
                <button onClick={() => console.log(quizData)}>click</button>
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

