import React from "react";

const ShowMovies = (props) => {
  return (
    <>
      <div>
        {props.movies.map((movie) => (
          <>
            <h1>{movie.title}</h1>
            <p>{movie.desc}</p>
            <h2>{movie.releaseDate}</h2>
          </>
        ))}
      </div>
    </>
  );
};

export default ShowMovies;
