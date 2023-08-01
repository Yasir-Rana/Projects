import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddActress.css";

const AddActress = () => {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({
    name: "",
    image: "",
    category: "Pakistani", // Default Category Value
  });

  const { name, image, category } = inputData;

  const changeHandler = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = () => {
    const celebrityObj = {
      name,
      image,
      category,
    };
    axios.post("http://127.0.0.1:3000/api/celebrity", celebrityObj).then((res) => {
        setInputData(res.data);
        navigate("/dashboard");
    }).catch((ex) => {
        alert(ex);
    })
  }

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const categories = [
    { value: "Pakistani" },
    { value: "Punjabi" },
    { value: "Bollywood" },
    { value: "Hollywood" },
    { value: "Turkish" },
    { value: "My Favourite" },
  ];

  return (
    <>
      <div className='container'>
        <h1 className='title'>Add Actresses</h1>
        <input className='input-field' type='text' placeholder='Write Name Here' name='name' value={name} required onChange={changeHandler} />
        <input type='text' className='input-field' placeholder='Paste Image Link Here' name='image' value={image} required onChange={changeHandler} />
        <select name='category' onChange={changeHandler}>
        <option disabled>Choose Category</option>
        {categories.map((item, index) => (<option value={item.value} key={index}>{item.value}</option>))}
      </select>
        <button className='add-button' onClick={handleAdd}>Add</button>
        <button className='cancel-button' onClick={handleCancel}>Cancel</button>
      </div>
    </>
  )
};

export default AddActress;
