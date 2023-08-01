import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify"
import "../utils/Home.css"; 

const UpdateForm = () => {
  const params = useParams()
  const formId = params.id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    services: "",
    address: ""
  })
  
  const { firstName, lastName, email, phone, services, address } = formData;

  const user = localStorage.getItem("token");
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  
  
  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value }));
  };


  //  Get Single Form Data 
  useEffect(() => {
    const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

    axios.get(`http://127.0.0.1:3000/api/form/${formId}`, config).then((res) => {
        setFormData(res.data)
    }).catch((ex) => {
        console.log(ex);
    })
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    const formObj = {
      firstName,
      lastName,
      email,
      phone,
      services,
      address
    }
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

    // Update User Form Data
      axios.put(`http://127.0.0.1:3000/api/form/${formId}`, formObj, config).then((res) => {
        toast.success("Form posted Successfully")
        navigate('/dashboard')
        // window.location = "/dashboard"
      }).catch((ex) => {
        toast.error("Error Posting Form")
        console.log(ex.response.data.message);
      }) 

  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <h1 className="center-heading">Contact Form</h1>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" placeholder="First Name" id="firstName" name="firstName" value={firstName} required onChange={changeHandler} />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" placeholder="Last Name" id="lastName" name="lastName" value={lastName} required onChange={changeHandler} />

        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Email" id="email" name="email" value={email} required onChange={changeHandler} />

        <label htmlFor="phone">Phone:</label>
        <input type="tel" placeholder="0303-51233444" id="phone" name="phone" value={phone} required onChange={changeHandler} />

        <div className="services-field">
          <label htmlFor="services">Services:</label>
          <select id="services" name="services" value={services} required onChange={changeHandler} >
            <option value="">Select a service</option>
            <option value="Frontend Dev">Frontend Dev</option>
            <option value="Backend Dev">Backend Dev</option>
            <option value="Full Stack Dev">Full Stack Dev</option>
            <option value="ReactJS Dev">ReactJS Dev</option>
          </select>
        </div>

        <div className="address-field">
          <label htmlFor="address">Address:</label>
        <input type="text" placeholder="Address" id="address" name="address" value={address} required onChange={changeHandler}  />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
};

export default UpdateForm;
