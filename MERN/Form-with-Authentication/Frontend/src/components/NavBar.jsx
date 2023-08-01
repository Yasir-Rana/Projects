import React from "react"
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {FaHome,FaEnvelope, FaInfoCircle, FaSignOutAlt, FaUser } from "react-icons/fa";


const NavBar = ({userName}) => {
   return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <NavLink className="navbar-brand" to="/">Navbar</NavLink>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
       </button>
         <div className="collapse navbar-collapse" id="navbarSupportedContent">
            { userName ? (<ul className="navbar-nav ml-auto">
            <li className="nav-item"><NavLink className="nav-link fw-bold" to="/contactUs"><FaEnvelope /> Contact Us</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-bold" to="/logout"><FaSignOutAlt /> Logout</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link fw-bold" to="#" style={{marginLeft: '52rem'}}><FaUser /> Logged in as: {userName}</NavLink></li> 
            </ul> 
            ) : (
               <ul className="navbar-nav ml-auto">
               <li className="nav-item"><NavLink className="nav-link fw-bold" to="/home"><FaHome /> Home</NavLink></li>
               <li className="nav-item"><NavLink className="nav-link fw-bold" to="/aboutUs"><FaInfoCircle /> About Us
               </NavLink></li> 
            </ul>
            )}
         </div>
      </nav> 
       
   );
};

export default NavBar;
