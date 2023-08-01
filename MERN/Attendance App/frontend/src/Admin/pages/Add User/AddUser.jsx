import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import Sidebar from '../../components/Sidebar/Sidebar';
import "./AddUser.css";

const AddUser = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);


  const { name, email, password, c_password } = userData;

  const changeHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const userObj = {
      name,
      email,
      password,
    };

    if (password !== c_password) {
      toast.error("Passwords did not match");
    } else {
      axios.post("https://attendance-app-for-me.glitch.me/api/user/register", userObj, config).then((res) => {
          localStorage.setItem("token", res.data.token);
          toast.success("User Registered Successfully");
          navigate("/dashboard");
        }).catch((ex) => {
          if (ex.response && ex.response.status === 400) {
            toast.error("Already registered with this Email, Try Another One");
          }
        });
    }
  };


  return (
    <>
    <Sidebar />
    <div className='register-container'>
      <form className='register-form' onSubmit={submitHandler}>
        <h1 className='center-heading'><FaUser />User</h1>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='name' placeholder='Enter your Name' name='name' id='name' value={name} required onChange={changeHandler} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address:</label>
          <input type='email' placeholder='Enter your Email' name='email' id='email' value={email} required onChange={changeHandler} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' placeholder='Enter your Password' name='password' id='password' value={password} required onChange={changeHandler} />
        </div>
        <div className='form-group'>
          <label htmlFor='c_password'>Confirm Password:</label>
          <input type='password' placeholder='Confirm Password' name='c_password' id='c_password' value={c_password} required onChange={changeHandler} />
        </div>
        <button className='register-btn' type='submit'>Add User</button>
      </form>
    </div>
    </>
  );
};

export default AddUser;
