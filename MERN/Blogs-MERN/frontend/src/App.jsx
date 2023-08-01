import React, {useState, useEffect} from "react"
import jwtDecode from "jwt-decode";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Logout from "./pages/Logout";

const App = () => {
  const [userName, setUserName] = useState("");

useEffect(() => {
  try {
    const jwt = localStorage.getItem("token");
    const decoded = jwtDecode(jwt);
    setUserName(decoded.name);
  } catch (error) {
    console.log(error);
  }
}, []);
  return (
    <>
    <Navbar userName={userName} />
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/home" element={<Home  />} />
        <Route path="/login" element={<Login  />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/logout" element={<Logout  />} />
        <Route path="*" element={<NotFound  />} />
      </Routes>
    </>
  )
};

export default App;
