import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Dashboard</h3>
      </div>
      <ul className="sidebar-links">
        <li><Link to="/dashboard"><FaTachometerAlt /><span>Dashboard</span></Link></li>
        <li><Link to="/add-user"><FaUserPlus /><span>Add User</span></Link></li>
        <li><Link to="/logout"><FaSignOutAlt /><span>Logout</span></Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
