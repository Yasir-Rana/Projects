import React from "react";
import HomeNavbar from "./HomeNavbar";
import "./Home.css";

const Home = () => {
  return (
    <>
      <HomeNavbar />
      <div className="home-container">
        <h1 className="home-text">Attendance App</h1>
      </div>
    </>
  );
};

export default Home;
