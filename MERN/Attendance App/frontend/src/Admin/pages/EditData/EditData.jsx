import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {toast} from "react-toastify";
import Sidebar from '../../components/Sidebar/Sidebar';
import './EditData.css';

const EditData = () => {
  const params = useParams()
  const attendanceId = params.id;
  const navigate = useNavigate();

  const [attendanceData, setAttendanceData] = useState({
    name: "",
    email: "",
    attendanceCount: "",
    leaveCount: ""
  })
  
  const { name, email, attendanceCount, leaveCount } = attendanceData;

  const user = localStorage.getItem("token");
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  
  
  const changeHandler = (e) => {
    setAttendanceData((prevState) => ({
      ...prevState, [e.target.name]: e.target.value }));
  };


  //  Get Single Attendance Data 
  useEffect(() => {
    const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      axios.get(`https://attendance-app-for-me.glitch.me/api/attendance/${attendanceId}`, config).then((res) => {
        const { user, attendanceCount, leaveCount } = res.data;
        setAttendanceData({
          ...attendanceData,
          name: user.name,
          email: user.email,
          attendanceCount,
          leaveCount,
        });
      }).catch((ex) => {
        console.log(ex);
      });
  }, []);


  const submitHandler = async (e) => {
    e.preventDefault();

    const attendanceObj = { name, email, attendanceCount, leaveCount}
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

    // Update User Attendance Data
      axios.put(`https://attendance-app-for-me.glitch.me/api/attendance/${attendanceId}`, attendanceObj, config).then((res) => {
        toast.success("Attendance updated Successfully")
        navigate('/dashboard');
      }).catch((ex) => {
        toast.error("Error: Updating Data");
      }) 

  }

  return (
    <>
    <Sidebar />
      <form onSubmit={submitHandler} className="edit-form">
        <h1 className="center-heading">Update Attendance</h1>
        <label htmlFor="name">Name:</label>
        <input type="text" placeholder="Name" id="name" name="name" value={name} required onChange={changeHandler} />

        <label htmlFor="email">Email:</label>
        <input type="email" placeholder="Email" id="email" name="email" value={email} required onChange={changeHandler} />

        <label htmlFor="attendanceCount">Presents count:</label>
        <input type="text" placeholder="Presents" id="attendanceCount" name="attendanceCount" value={attendanceCount} required onChange={changeHandler} />
       
        <label htmlFor="leaveCount">Leaves count:</label>
        <input type="text" placeholder="Leaves" id="leaves" name="leaveCount" value={leaveCount} required onChange={changeHandler} />
        <button type="submit">Update</button>
      </form>
    </>
  )
};

export default EditData;
