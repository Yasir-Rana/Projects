import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
      const fetchData = () => {
        axios.get("http://127.0.0.1:3000/api/movies").then((res) => {
            setMoviesData(res.data);
          }).catch((ex) => {
            alert(`Error in Fetching Data ${ex}`);
          });
      };
    fetchData();
  }, []);


  const handleDeleteMovie = (movieId) => {
    axios.delete(`http://127.0.0.1:3000/api/movies/${movieId}`).then(() => {
        const deletedMovieData = moviesData.filter((movieData) => movieId !== movieData._id);
        setMoviesData(deletedMovieData);
      }).catch((ex) => {
        alert(`Error in Deleting Movie ${ex}`);
      });
  };
  


  return (
    <div className='dashboard-container'>
      <h1 className='dashboard-heading'>Dashboard</h1>
      {moviesData.length === 0 && <h2>No Movies Found</h2>}
      {moviesData.length > 0 && (
        <table className='movie-table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {moviesData.map((movie) => (
              <tr key={movie._id}>
                <td><img src={movie.imageLink} alt={movie.title} className='movie-image' /></td>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>
                  <NavLink to={`/updateMovies/${movie._id}`} className='edit-button'>Edit</NavLink>
                  <button className='delete-button' onClick={() => handleDeleteMovie(movie._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
