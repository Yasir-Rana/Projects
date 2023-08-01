import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";
import AddQuiz from "./components/AddQuiz/AddQuiz";
import TakeQuiz from "./components/TakeQuiz/TakeQuiz";
import Dashboard from "./components/Dashboard/Dashboard";
import UpdateQuiz from "./components/UpdateQuiz/UpdateQuiz";
import "./App.css"; 

const App = () => {
  return (
    <>
      <div className="navbar">
        <NavLink to="/addQuiz" activeClassName="active">Add Quiz</NavLink>
        <NavLink to="/takeQuiz" activeClassName="active">Take Quiz</NavLink>
        <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
      </div>
      <Routes>
        <Route path="/" element={<TakeQuiz />} />
        <Route path="/addQuiz" element={<AddQuiz />} />
        <Route path="/takeQuiz" element={<TakeQuiz />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/updateQuiz/:id" element={<UpdateQuiz />} />
      </Routes>
    </>
  )
};

export default App;
