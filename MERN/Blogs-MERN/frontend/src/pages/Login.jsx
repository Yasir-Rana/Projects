import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import "../utils/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { email, password } = formData;

  const navigate = useNavigate();
  
  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value }));
  };

  const submitHandler = async(e) => {
  e.preventDefault();
  const userObj = { email, password };

  axios.post("http://127.0.0.1:3000/api/users/login", userObj).then((res) => {
    localStorage.setItem("token", res.data.token);
    toast.success("Logged in Successfully");
    navigate('/home');
    // window.location = "/"
  }).catch((ex) => {
    if (ex.response && ex.response.status === 400) {
      toast.error("Invalid Credentials");
    }
  })
};
  return (
    <>
      <form className="login-form" onSubmit={submitHandler} >
      <h1 align="center"><FaSignInAlt /> Login</h1>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" value={email} required onChange={changeHandler} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" value={password} required onChange={changeHandler} />
      <button type="submit">Sign In</button>
      </form>
    </>
  )
};

export default Login;
