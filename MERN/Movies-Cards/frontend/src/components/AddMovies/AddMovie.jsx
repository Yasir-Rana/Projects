import React, { useState } from 'react';
import axios from 'axios';
import './AddMovie.css';

const AddMovie = () => {
  const [inputData, setInputData] = useState({
    imageLink: "",
    title:"",
    description:"",
    movieLink: ""
  })

  const { imageLink, title, description, movieLink } = inputData;

  const changeHandler = (e) => {
    setInputData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value }));
  };

  const handleAddToMovies = () => {
   const movieObj = {
    imageLink,
    title,
    description,
    movieLink
   } 

   axios.post("http://127.0.0.1:3000/api/movies", movieObj).then((res) => {
    window.location = "/showMovies";
   }).catch((ex) => {
    alert(ex)
   })
  }

 
  return (
    <>
      <div className='container'>
      <h1 className='title'>Add Movies</h1>
      <input type='text' className='input-field' placeholder='Paste Image Link Here' name="imageLink" value={imageLink} required onChange={changeHandler} />
      <input type='text' className='input-field' placeholder='Write Movie/Series Title Here' name="title" value={title} required onChange={changeHandler} />
      <input type='text' className='input-field' placeholder='Write Movie/Series Description Here' name="description" value={description} required onChange={changeHandler} />
      <input type='text' className='input-field' placeholder='Write Movie/Series Link Here' name="movieLink" value={movieLink} required onChange={changeHandler} />
      <button className='add-button' onClick={handleAddToMovies}>Add to Movies</button>
    </div>
    </>
  )
};

export default AddMovie;
