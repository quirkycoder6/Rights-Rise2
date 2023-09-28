import React, { useState } from 'react';
import '../numberguess/makerstyle.css'
import { useSelector } from "react-redux";

const WordScrambleMaker = () => {
//   const [userId, setUserId] = useState('');
  const [question, setQuestion] = useState('');
  const [correct, setCorrect] = useState('');
  const [message, setMessage] = useState('');
  const userId = useSelector((state) => state.user._id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/scramble', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, question, correct }),
      });

      if (response.ok) {
        setMessage('Game created successfully.');
        // setUserId('');
        setQuestion('');
        setCorrect('');
      } else {
        setMessage('Error creating the game.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="container">
      <h2>Create a Word Scramble Game</h2>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div> */}
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
        <button type="submit" className='btn'>Create Game</button>
      </form>
      {message && <p className="error">{message}</p>}
    </div>
  );
};

export default WordScrambleMaker;
