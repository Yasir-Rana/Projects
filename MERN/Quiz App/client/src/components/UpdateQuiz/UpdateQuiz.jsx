import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateQuiz.css";

const UpdateQuiz = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");

  const params = useParams();
  const quizId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/api/quiz/${quizId}`).then((res) => {
        setQuestion(res.data.question);
        setOptions(res.data.options);
        setCorrectOption(res.data.correctOption);
      }).catch((ex) => {
        alert(`Error in Fetching ${ex}`);
      });
  }, []);

  const handleUpdate = () => {
    const quizObj = {
      question,
      options,
      correctOption,
    };

    axios.put(`http://127.0.0.1:3000/api/quiz/${quizId}`, quizObj).then((res) => {
        // window.location = "/dashboard";
        navigate("/dashboard");
      }).catch((ex) => {
        alert(ex);
      });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleOptionsChange = (event) => {
    const optionsText = event.target.value;
    const optionsArray = optionsText.split(",").map((option) => option.trim());
    setOptions(optionsArray);
  };

  return (
    <div className='container'>
      <h1 className='title'>Update Quiz</h1>
      <input type='text' className='input-field' placeholder='Question' value={question} onChange={(event) => setQuestion(event.target.value)} />
      <input type='text' className='input-field' placeholder='Options separated by Comma' value={options.join(", ")} onChange={handleOptionsChange} />
      <input type='text' className='input-field' placeholder='Correct Option' value={correctOption} onChange={(event) => setCorrectOption(event.target.value)} />
      <button className='update-button' onClick={handleUpdate}>Update</button>
      <button className='cancel-button' onClick={handleCancel}>Cancel</button>
    </div>
  );
};
export default UpdateQuiz;
