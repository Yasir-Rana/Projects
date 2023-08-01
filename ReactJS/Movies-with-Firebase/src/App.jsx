import React, { useCallback, useEffect, useState } from "react";
import AddMovies from "./AddMovies";
import ShowMovies from "./ShowMovies";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-backend-d32fa-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went Wrong");
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          desc: data[key].desc,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-backend-d32fa-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  let content = <p>No Movies Found</p>;

  if (movies.length > 0) {
    content = <ShowMovies movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <>
      <section style={{ textAlign: "center" }}>
        <AddMovies onAddMovie={addMovieHandler} />
      </section>
      <br />
      <br />
      <section style={{ textAlign: "center" }}>
        <button onClick={fetchMoviesHandler}>Show Movies</button>
        {content}
      </section>
    </>
  );
};

export default App;
