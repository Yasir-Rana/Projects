import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  

  const { email, password } = formData;

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value }));
  };

  
  const submitHandler = async (e) => {
    e.preventDefault();
    const userObj = { email, password };

    axios.post("http://127.0.0.1:3000/api/users/login", userObj).then((res) => {
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in Successfully");
      // navigate('/dashboard');
      window.location = "/dashboard";
    }).catch((ex) => {
      if (ex.response && ex.response.status === 400) {
        toast.error("Invalid Credentials");
      }
    })
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1 className="center-heading"><FaSignInAlt /> Login</h1>
        <label htmlFor="email">Email Address: </label>
        <input type="email" placeholder="Enter your Email" name="email" id="email" value={email} required onChange={changeHandler} />
        <label htmlFor="password">Password: </label>
        <input type="password" placeholder="Enter your Password" name="password" id="password" value={password} required onChange={changeHandler} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;