import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";


const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: ""
  });
  
  const navigate = useNavigate();

  const { name, email, password, c_password } = formData;

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
       axios.post("http://127.0.0.1:3000/api/users", userObj, config).then((res) => {
       localStorage.setItem('token', res.data.token)
       toast.success("User Registered Successfully");
       navigate('/contactUs');
      // window.location = "/contactUs"
    }).catch((ex) => {
      if (ex.response && ex.response.status === 400) {
        toast.error("Already registered with this Email, Try Another One");
      }
    })
  }
  };
  

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1 className="center-heading"><FaUser /> Register</h1>
        <label htmlFor="username">Username: </label>
        <input type="text" placeholder="Enter your Name" name="name" id="username" value={name} required onChange={changeHandler} />
        <label htmlFor="email">Email Address: </label>
        <input type="email" placeholder="Enter your Email" name="email" id="email" value={email} required onChange={changeHandler} />
        <label htmlFor="password">Password: </label>
        <input type="password" placeholder="Enter your Password" name="password" id="password" value={password} required onChange={changeHandler} />
        <label htmlFor="c_password">Confirm Password: </label>
        <input type="password" placeholder="Confirm Password" name="c_password" id="c_password" value={c_password} required onChange={changeHandler} />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default Register;