import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import "./UserLogin.css";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = userData;

  const changeHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userObj = { email, password };
    axios.post("https://attendance-app-for-me.glitch.me/api/user/login", userObj).then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("User Logged in Successfully");
        navigate("/attendance");
      }).catch((ex) => {
        if (ex.response && ex.response.status === 400) {
          toast.error("Invalid Credentials");
        }
      });
  };


  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={submitHandler}>
        <h1 className='center-heading'><FaSignInAlt />User</h1>
        <div className='form-group'>
          <label htmlFor='email'>Email Address:</label>
          <input type='email' placeholder='Enter your Email' name='email' id='email' value={email} required onChange={changeHandler} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' placeholder='Enter your Password' name='password' id='password' value={password} required onChange={changeHandler} />
        </div>
        <button className='login-btn' type='submit'>Login</button>
        <button className='back-btn' onClick={() => navigate("/")}>Back</button>
      </form>
    </div>
  );
};

export default Login;
