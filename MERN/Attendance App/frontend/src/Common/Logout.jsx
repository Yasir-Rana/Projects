import React, { useEffect } from "react";


const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    window.location = "/";
  }, []);

  // Note: no return statement or you can return null

};

export default Logout;