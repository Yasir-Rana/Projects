import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = adminData;

  const changeHandler = (e) => {
    setAdminData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const adminObj = { email, password };
    axios.post("https://attendance-app-for-me.glitch.me/api/user/login", adminObj).then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Admin Logged in Successfully");
        navigate("/dashboard");
      }).catch((ex) => {
        if (ex.response && ex.response.status === 400) {
          toast.error("Invalid Credentials");
        }
      });
  };


  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={submitHandler}>
        <h1 className='center-heading'><FaSignInAlt />Admin</h1>
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

export default AdminLogin;
