import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    // navigate("/");
    window.location = "/";
  }, []);

  // Note: no return statement or you can return null

};

export default Logout;