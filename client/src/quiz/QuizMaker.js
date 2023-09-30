import React, { useState } from 'react';
import './makerstyle.css';
import { useSelector } from 'react-redux';

const MCQQuestionMaker = () => {
  const userId = useSelector((state) => state.user._id);

  const [formData, setFormData] = useState({
    userId,
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctOption: '',
  });
  
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value }); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setSubmissionMessage('Question created successfully');
        setFormData({
          userId,
          question: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          correctOption: '',
        });
      } else {
        setSubmissionMessage('Error creating question');
        console.error('Error creating question');
      }
    } catch (error) {
      setSubmissionMessage('Network error');
      console.error('Network error:', error);
    }
  };

  return (
    <div className="mcq-question-maker">
      <h1>Custom MCQ Question Maker</h1>
      <form id="mcqForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="option1">Option 1:</label>
          <input
            type="text"
            id="option1"
            name="option1"
            value={formData.option1}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="option1">Option 2:</label>
          <input
            type="text"
            id="option2"
            name="option2"
            value={formData.option2}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="option1">Option 3:</label>
          <input
            type="text"
            id="option3"
            name="option3"
            value={formData.option3}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="option1">Option 4:</label>
          <input
            type="text"
            id="option4"
            name="option4"
            value={formData.option4}
            onChange={handleInputChange}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="correctOption">Correct Option:</label>
          <input
            type="text"
            id="correctOption"
            name="correctOption"
            value={formData.correctOption}
            onChange={handleInputChange}
            required
          />
        </div>

        <input type="submit" value="Create Question" className="submit-button" />
      </form>
      <p className="submission-message">{submissionMessage}</p>
    </div>
  );
};

export default MCQQuestionMaker;
