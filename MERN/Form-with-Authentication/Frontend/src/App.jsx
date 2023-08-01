import React, {useState, useEffect} from "react"
import jwtDecode from "jwt-decode";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import NotFound from "./components/NotFound";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import UpdateForm from "./components/UpdateForm";

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
      <NavBar userName={userName} />
      <Routes>
      <Route path="/update/form/:id" element={<UpdateForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
