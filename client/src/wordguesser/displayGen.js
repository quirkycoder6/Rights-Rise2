import React from "react";
import { useSelector } from "react-redux";

const GuessList = ({ genQuestion, genAns }) => {
  const userId = useSelector((state) => state.user._id);
  const handleSubmit = async (e, question, correct) => {
    e.preventDefault();

    console.log("Question:", question);
    console.log("Correct Answer:", correct);

    try {
      const response = await fetch("http://localhost:3001/scramble", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, question, correct }),
      });
      if (response.ok) {
        alert("Submitted");
      }
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <h2>Questions and Answers</h2>
      <ul>
        {genQuestion.map((question, index) => (
          <form
            key={index}
            onSubmit={(e) => handleSubmit(e, question, genAns[index])}
          >
            <label htmlFor={`question-${index}`}>Question:</label>
            <input
              type="text"
              id={`question-${index}`}
              name={`question`}
              value={question}
            />
            <br />
            <label htmlFor={`correct-${index}`}>Correct Answer:</label>
            <input
              type="text"
              id={`correct-${index}`}
              name={`correct`}
              value={genAns[index]}
            />
            <button type="submit" className="bg-blue-400 p-4">
              Select Question
            </button>
          </form>
        ))}
      </ul>
    </div>
  );
};

export default GuessList;
