import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormData from "../components/FormData";

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("token");
      if (!user) {
        navigate("/");
      } else {
        try {
          // const jwt = localStorage.getItem("token");
          const decoded = jwtDecode(user);
          setUserName(decoded.name);
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkUser();
  }, [navigate]);

  return (
    <>
      <section className='center-heading'>
        <h1>Dashboard</h1>
        <h1>Welcome, {userName}</h1>
      </section>
      <FormData />
    </>
  );
};

export default Dashboard;
