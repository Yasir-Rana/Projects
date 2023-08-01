import React, { useState } from "react";
import axios from "axios";
import "./AddQuiz.css";

const AddQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");

  const handleAddToQuiz = () => {
    const quizObj = {
      question,
      options,
      correctOption,
    };

    axios.post("http://127.0.0.1:3000/api/quiz", quizObj).then((res) => {
        window.location = "/takeQuiz";
        // setQuestion("");
        // setOptions([]);
        // setCorrectOption("");
      }).catch((ex) => {
        alert(ex);
      });
  };

  const handleOptionsChange = (event) => {
    const optionsText = event.target.value;
    const optionsArray = optionsText.split(",").map((option) => option.trim());
    setOptions(optionsArray);
  };

  return (
    <div className='container'>
      <h1 className='title'>Add Question</h1>
      <input type='text' className='input-field' placeholder='Write your Question Here' value={question} onChange={(event) => setQuestion(event.target.value)} />
      <input type='text' className='input-field' placeholder='Write Options separated by Comma' value={options.join(", ")} onChange={handleOptionsChange} />
      <input type='text' className='input-field' placeholder='Write Correct Option' value={correctOption} onChange={(event) => setCorrectOption(event.target.value)} />
      <button className='add-button' onClick={handleAddToQuiz}>Add to Quiz</button>
    </div>
  );
};
export default AddQuiz;
