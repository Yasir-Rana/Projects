import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://127.0.0.1:3000/api/quiz").then((res) => {
          setQuizData(res.data);
        }).catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const handleDelete = (quizId) => {
    axios.delete(`http://127.0.0.1:3000/api/quiz/${quizId}`).then(() => {
        const deletedQuizData = quizData.filter((quizData) => quizId !== quizData._id);
        setQuizData(deletedQuizData);
      }).catch((ex) => {
        alert(`Error in Deleting Data ${ex}`);
      });
  };

  return (
    <div className='dashboard-container'>
      <h1 className='dashboard-title'>Quiz Dashboard</h1>
      {quizData.length === 0 ? (
        <div className='not-found'>No Data Found</div>
      ) : (
        <table className='quiz-table'>
          <thead>
            <tr>
              <th>Questions ({quizData.length})</th>
              <th>Options</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizData.map((quiz) => (
              <tr key={quiz._id}>
                <td>{quiz.question}</td>
                <td>
                  {quiz.options.map((option, index) => (<span key={index}>{String.fromCharCode(97 + index)}) {option}{" "}</span>))}
                </td>
                <td>
                  <NavLink to={`/updateQuiz/${quiz._id}`} className='edit-button'>Edit</NavLink>
                  <button className='delete-button' onClick={() => handleDelete(quiz._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
