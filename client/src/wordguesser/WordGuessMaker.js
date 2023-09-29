import React, { useEffect, useState } from "react";
import "../numberguess/makerstyle.css";
import { useSelector } from "react-redux";
import OpenAI from "openai";
import GuessList from "./displayGen";

function extractQuestionsAndAnswers(inputText) {
  const questions = [];
  const answers = [];

  // Split the input text into sentences based on new lines
  const sentences = inputText.split("\n");

  let currentQuestion = null;
  let currentAnswer = null;

  for (const sentence of sentences) {
    if (sentence.startsWith("Question: ")) {
      // If a new question is found, store the previous question and answer (if any)
      if (currentQuestion !== null && currentAnswer !== null) {
        questions.push(currentQuestion);
        answers.push(currentAnswer);
      }

      // Extract the new question
      currentQuestion = sentence.substring("Question: ".length);
      currentAnswer = null; // Reset the current answer
    } else if (sentence.startsWith("Answer: ")) {
      // Extract the answer
      currentAnswer = sentence.substring("Answer: ".length);
    } else {
      // Append additional lines to the current question or answer
      if (currentQuestion !== null) {
        currentQuestion += sentence;
      }
      if (currentAnswer !== null) {
        currentAnswer += sentence;
      }
    }
  }

  // Push the last question and answer (if any)
  if (currentQuestion !== null && currentAnswer !== null) {
    questions.push(currentQuestion);
    answers.push(currentAnswer);
  }

  return { questions, answers };
}

const WordScrambleMaker = () => {
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.user._id);
  const [genQuestion, setGenQuestion] = useState([]);
  const [genAns, setGenAns] = useState([]);
//   const user = useSelector((state) => state.user);
//   const userId = user ? user._id : null;
  const msg = `
  Create 10 one word answer questions about right to education. Your response should strictly follow the below mentioned structure. Your question should test education related knowledge written in the Indian law . It shouldn't be too simple.
  You shouldn't ask the same question everytime. Don't mention question numbers.
  "
  Question: Education laws in India number related question (its answer must have no spaces)
  Answer:   Answer of the above question (in one word only. Must have no spaces.)
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

    try {
      const response = await fetch("http://localhost:3001/scramble", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, question, correct }),
      });

      if (response.ok) {
        setMessage("Game created successfully.");
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
      <h2>Create a Word Scramble Game</h2>
      <button onClick={main} className="bg-blue-700 p-3 text-white rounded-lg">
        Generate
      </button>
      <p className="text-red-600 font-bold">
        Use responsibly due to limited open ai calls. Question generation is
        slow due to api. Wait for some time for response.
      </p>
      {genQuestion.length > 0 && genAns.length ? (
        <GuessList genQuestion={genQuestion} genAns={genAns} />
      ) : (
        <></>
      )}
      <h1 className="text-2xl bg-yellow-600 p-3 my-5 rounded-lg">
        DO MANUALLY
      </h1>
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

export default WordScrambleMaker;
