import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateMovie.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMovie = () => {
  const params = useParams();
  const movieId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/api/movies/${movieId}`).then((res) => {
        setInputData(res.data);
      }).catch((ex) => {
        alert(`Error in Fetching ${ex}`);
      });
  }, []);

  const [inputData, setInputData] = useState({
    imageLink: "",
    title: "",
    description: "",
    movieLink: "",
  });

  const { imageLink, title, description, movieLink } = inputData;

  const changeHandler = (e) => {
    setInputData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    const movieObj = {
      imageLink,
      title,
      description,
      movieLink,
    };

    axios.put(`http://127.0.0.1:3000/api/movies/${movieId}`, movieObj).then((res) => {
        // window.location = "/dashboard";
        navigate("/dashboard");
      }).catch((ex) => {
        alert(ex);
      });
  };

  const handleCancel = () => {
    navigate("/dashboard");
  }

  return (
    <>
      <div className='container'>
        <h1 className='title'>Update Movies</h1>
        <input type='text' className='input-field' placeholder='Image Link' name='imageLink' value={imageLink} required onChange={changeHandler} />
        <input type='text' className='input-field' placeholder='Movie/Series Title' name='title' value={title} required onChange={changeHandler} />
        <input type='text' className='input-field' placeholder='Movie/Series Description' name='description' value={description} required onChange={changeHandler} />
        <input type='text' className='input-field' placeholder='Movie/Series Link' name='movieLink' value={movieLink} required onChange={changeHandler} />
        <button className='update-button' onClick={handleUpdate}>Update</button>
        <button className='cancel-button' onClick={handleCancel}>Cancel</button>
      </div>
    </>
  );
};

export default UpdateMovie;
