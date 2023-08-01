import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import "../utils/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: ""
  })

  const { name, email, password, c_password } = formData;

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const userObj = {
      name,
      email,
      password
    }

    if (password !== c_password) {
       toast.error("Passwords did not match");
    } else {
       axios.post("http://127.0.0.1:3000/api/users/register", userObj, config).then((res) => {
       localStorage.setItem('token', res.data.token)
       toast.success("User Registered Successfully");
       navigate('/login');
      // window.location = "/login"
    }).catch((ex) => {
      if (ex.response && ex.response.status === 400) {
        toast.error("Already registered with this Email, Try Another One");
      }
    })
  }
  };

  return (
    <>
      
      <form className="register-form" onSubmit={submitHandler}>
      <h1 align="center"><FaUser /> Register</h1>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" value={name} required onChange={changeHandler} />
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" value={email} required onChange={changeHandler} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" value={password} required onChange={changeHandler} />
      <label htmlFor="c_password">Confirm Password</label>
      <input type="password" id="c_password" name="c_password" value={c_password} required onChange={changeHandler} />
      <button type="submit">Register</button>
      </form>
    </>
  )
};

export default Register;
