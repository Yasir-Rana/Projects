import React, { useRef } from "react";

const AddMovies = (props) => {
  const titleRef = useRef("");
  const descRef = useRef("");
  const dateRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    const movie = {
      title: titleRef.current.value,
      desc: descRef.current.value,
      releaseDate: dateRef.current.value,
    };

    props.onAddMovie(movie);

    titleRef.current.value = "";
    descRef.current.value = "";
    dateRef.current.value = "";
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <h1>Add Movies</h1>
          <input type='text' placeholder='Movie Title' ref={titleRef} />
          <br />
          <br />
          <textarea rows='4' ref={descRef} placeholder='Description'></textarea>
          <br />
          <br />
          <input type='text' placeholder='Release Date' ref={dateRef} />
          <br />
          <br />
          <button>Add Movie</button>
        </div>
      </form>
    </>
  );
};

export default AddMovies;
