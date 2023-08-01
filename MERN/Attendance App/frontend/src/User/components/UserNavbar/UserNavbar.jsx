import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './UserNavbar.css';

const UserNavbar = () => {
  return (
    <nav className="navbar">
          <ul className="navbar-list">
            <li className="navbar-item"><Link to="/attendance" className="navbar-link"><FaCalendar className="icon" />Attendance</Link></li>
            <li className="navbar-item"><Link to="/profile" className="navbar-link"><FaUser className="icon" />Profile</Link></li>
            <li className="navbar-item"><Link to="/logout" className="navbar-link"><FaSignOutAlt className="icon" />Logout</Link></li>
          </ul>
    </nav>
  );
};

export default UserNavbar;
