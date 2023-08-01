import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import "../utils/Home.css";

const Home = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      {isLoginMode ? ( <Login /> ) : ( <Register /> )}
      <div className='login-section'>
        <span>{isLoginMode ? "Don't have an account?" : "Already have an account?"}</span>
        <button type='button' onClick={() => setIsLoginMode(!isLoginMode)}>{isLoginMode ? "Sign Up" : "Login"}</button>
      </div>
    </>
  );
};

export default Home;
