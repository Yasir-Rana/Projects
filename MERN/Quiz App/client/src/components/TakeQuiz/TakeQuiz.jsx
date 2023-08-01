import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TakeQuiz.css';

const TakeQuiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get('http://127.0.0.1:3000/api/quiz').then((res) => {
        setQuizData(res.data);
        setSelectedOptions(new Array(res.data.length).fill(''));
      }).catch ((err) => {
        console.log(err);
      }) 
    };

    fetchData();
  }, []);

  const handleAnswerSelect = (option) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestion] = option;
    setSelectedOptions(updatedOptions);

    const currentScore = option === quizData[currentQuestion].correctOption ? 1 : 0;
    setScore((prevScore) => prevScore + currentScore);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const submitHandler = () => {
    alert(`Quiz completed! Your score is ${score}/${quizData.length}`);
    window.location ="/addQuiz"
  };

  if (quizData.length === 0) {
    return <div className="not-found">No Data Found</div>;
  }

  const currentQuiz = quizData[currentQuestion];

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Quiz App</h2>
      <h3 className="question-number">Question {currentQuestion + 1}</h3>
      <p className="question">{currentQuiz.question}</p>

      <ul className="options-list">
        {currentQuiz.options.map((option) => (
          <li key={option}>
            <label className="option-label">
              <input type="radio" className="option-input" value={option} checked={selectedOptions[currentQuestion] === option} onChange={() => handleAnswerSelect(option)} />{option} 
            </label>
          </li>
        ))}
      </ul>

      <div className="button-container">
        <button className="previous-button" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>Previous</button>
        {
          currentQuestion === quizData.length - 1 ? 
          (
          <button className="submit-button" onClick={submitHandler}>Submit</button>
          ) : 
        (
          <button className="next-button" onClick={handleNextQuestion}>Next</button>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;
