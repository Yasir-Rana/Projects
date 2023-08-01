import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Common/Home";
import Logout from "./Common/Logout";
import NotFound from "./Common/NotFound";
import UserLogin from "./User/pages/UserLogin/UserLogin";
import Attendance from "./User/pages/Attendance/Attendance";
import Profile from "./User/pages/Profile/Profile";
import AdminLogin from "./Admin/pages/AdminLogin/AdminLogin";
import Dashboard from "./Admin/pages/Dashboard/Dashboard";
import AddUser from "./Admin/pages/Add User/AddUser";
import EditData from "./Admin/pages/EditData/EditData";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/edit/attendance/:id" element={<EditData />} />
        <Route path="/login-user" element={<UserLogin />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/login-admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/logout" element={<Logout />} />
        <Route exact index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
