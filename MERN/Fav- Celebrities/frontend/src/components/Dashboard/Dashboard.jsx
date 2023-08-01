import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [actressesData, setActressesData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get("http://127.0.0.1:3000/api/celebrity").then((res) => {
          setActressesData(res.data.reverse());
        }).catch((ex) => {
          alert(`Error in Fetching Data ${ex}`);
        });
    };
    fetchData();
  }, []);

  const handleDelete = (actressId) => {
    axios.delete(`http://127.0.0.1:3000/api/celebrity/${actressId}`).then(() => {
        const deletedActressesData = actressesData.filter((actress) => actressId !== actress._id);
        setActressesData(deletedActressesData);
      }).catch((ex) => {
        alert(`Error in Deleting Data ${ex}`);
      });
  };

  return (
    <div className='dashboard'>
      <div className='navbar'>
        <NavLink to='/'>Actresses</NavLink>
        <NavLink to='/addActresses'>Add Actresses</NavLink>
      </div>
      <h1>Dashboard</h1>
      {actressesData.map((actress) => (
        <div key={actress._id} className='actress-card'>
          <div className='actress-info'>
            <img src={actress.image} alt={actress.name} className='actress-image' />
            <h3>{actress.name}</h3>
          </div>
          <div className='button-container'>
            <NavLink to={`/updateActresses/${actress._id}`} className='edit-button'>Edit</NavLink>
            <button className='delete-button' onClick={() => handleDelete(actress._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
