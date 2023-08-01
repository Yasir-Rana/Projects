import React from "react";
import { NavLink } from "react-router-dom";
import {FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import "../utils/Navbar.css"; 

const Navbar = ({userName}) => {
  return (
    <nav className="navbar">
      {userName ? (
      <ul className="nav-links">
      <li><NavLink to="/logout" activeClassName="active"><FaSignOutAlt /> Logout</NavLink></li>
      <li><NavLink to="#" className="user-link"><FaUser /> Logged in as: {userName}</NavLink></li>
      </ul>
      ) : (
      <ul className="nav-links"><li><NavLink to="/home" activeClassName="active"><FaHome /> Home</NavLink> </li>
      <li> <NavLink to="/login" activeClassName="active">Login </NavLink> </li>
      <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
      </ul>)}
    </nav>
  );
};

export default Navbar;
