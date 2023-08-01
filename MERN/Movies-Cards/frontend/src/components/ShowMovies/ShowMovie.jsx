import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";


const ShowMovie = () => {
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
    
  return (
    <>
    {moviesData.length===0 && <h1 align="center">No Movies Found</h1> }
    {moviesData.length > 0 && 
      <>
      <h1 style={{textAlign: 'center', marginTop: '12px'}}> List of Top {moviesData.length} Movies/Series</h1>
      {moviesData.map((movie) => {
        return (
          <Card
            key={movie._id} // Can Also Use {Math.random().toString()}
            img_source={movie.imageLink}
            title={movie.title}
            description={movie.description}
            link={movie.movieLink}
          />
        );
      })}
      </>
      }
    </>
  );
};

export default ShowMovie;
