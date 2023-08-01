import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateActress.css";

const UpdateActress = () => {
  const params = useParams();
  const celebrityId = params.id;
  const navigate = useNavigate();

  const [inputData, setInputData] = useState({
    name: "",
    image: "",
    category: "",
  });

  const { name, image, category } = inputData;

  const changeHandler = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/api/celebrity/${celebrityId}`).then((res) => {
        setInputData(res.data);
      }).catch((ex) => {
        alert(`Error in Fetching ${ex}`);
      });
  }, []);

  const handleUpdate = () => {
    const celebrityObj = {
      name,
      image,
      category,
    };

    axios.put(`http://127.0.0.1:3000/api/celebrity/${celebrityId}`, celebrityObj).then((res) => {
        navigate("/dashboard");
      }).catch((ex) => {
        alert(ex);
      });
  };

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
        <h1 className='title'>Update Actresses</h1>
        <input className='input-field' type='text' placeholder='Name' name='name' value={name} required onChange={changeHandler} />
        <input type='text' className='input-field' placeholder='Image Link' name='image' value={image} required onChange={changeHandler} />
        <select name='category' value={category} onChange={changeHandler}>
        <option disabled>Choose Category</option>
        {categories.map((item, index) => (<option value={item.value} key={index}>{item.value}</option>))}
      </select>
        <button className='update-button' onClick={handleUpdate}>Update</button>
        <button className='cancel-button' onClick={handleCancel}>Cancel</button>
      </div>
    </>
  );
};

export default UpdateActress;
