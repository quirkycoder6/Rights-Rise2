import React, { useEffect, useState } from "react";
import "./makerstyle.css";
import OpenAI from "openai";
import { useSelector } from "react-redux";
import QuestionAnswerList from "./displayGen";

function extractQuestionsAndAnswers(text) {
  const questionRegex = /Question:\s(.+?)\sAnswer:\s(.+?)(?=\n\n|\n$|$)/gs;
  const matches = [...text.matchAll(questionRegex)];

  if (!matches) {
    return { questions: [], answers: [] };
  }

  const questions = matches.map((match) => match[1].trim());
  const answers = matches.map((match) => {
    const answer = match[2].trim();
    const numericPart = answer.match(/\d+/); // Extract numeric part
    return numericPart ? parseInt(numericPart[0]) : null; // Convert to integer
  });

  return { questions, answers }; 
}

const NumberGuesserForm = () => {
  // const [userId, setUserId] = useState('');
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [genQuestion, setGenQuestion] = useState([]);
  const [genAns, setGenAns] = useState([]);
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.user._id);
  const msg = `
 Create 10 number guesser questions about right to education. Your response should strictly follow the below mentioned structure. Your question should test education related articles knowledge written in the Indian law . It shouldn't be too simple.
  You shouldn't ask the same question everytime. Don't mention question numbers.
  "
  Question: The article number related question
  Answer: Article Number (Dont include "Article" Word)
  "
  `;

  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });

  async function main() {
    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: msg }],
        model: "gpt-3.5-turbo",
      });

      console.log(chatCompletion.choices[0].message.content);
      const { questions, answers } = extractQuestionsAndAnswers(
        chatCompletion.choices[0].message.content
      );
      setGenQuestion(questions);
      setGenAns(answers);
    } catch (error) {
      console.log(error);
    }
  }

useEffect(() => {
  console.log(genQuestion);
  console.log(genAns);
}, [genQuestion, genAns]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userId);
    try {
      const response = await fetch("http://localhost:3001/numberguesser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, question, correct }),
      });

      if (response.ok) {
        setMessage("Game created successfully.");
        // setUserId('');
        setQuestion("");
        setCorrect("");
      } else {
        setMessage("Error creating the game.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div className="container">
      <h2>Create a Number Guesser Game</h2>
      <button onClick={main} className="bg-blue-700 p-3">
        Generate
      </button>
      <p className="text-red-600 font-bold">Use responsibly due to limited open ai calls. Question generation is slow due to api. Wait for some time for response.</p>
      {genQuestion.length > 0 && genAns.length ? (
        <QuestionAnswerList genQuestion={genQuestion} genAns={genAns} />
      ) : (
        <></>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="correct">Correct Answer:</label>
          <input
            type="text"
            id="correct"
            name="correct"
            value={correct}
            onChange={(e) => setCorrect(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">
          Create Game
        </button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default NumberGuesserForm;
