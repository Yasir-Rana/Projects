import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaUserShield } from 'react-icons/fa';
import "./HomeNavbar.css";

const HomeNavbar = () => {
  return (
    <>
      <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-link navbar-brand"><FaUserShield className="brand-icon" />Brand-Logo</Link>
      </div>
      <div className="navbar-right">
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/login-user" className="navbar-link"><FaUser className="icon" />User Login</Link></li>
            <li className="navbar-item"><Link to="/login-admin" className="navbar-link"><FaUserShield className="icon" />Admin Login</Link></li>
          </ul>
      </div>
     </nav>
    </>
  )
};

export default HomeNavbar;
