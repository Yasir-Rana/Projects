import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import "./Attendance.css";

const Attendance = () => {
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
  const [isLeaveMarked, setIsLeaveMarked] = useState(false);
  const [isViewAttendance, setIsViewAttendance] = useState(false);

  const [createdAtTime, setCreatedAtTime] = useState(null);

  const [attendanceData, setAttendanceData] = useState({
    attendanceCount: 0,
    leaveCount: 0,
  });

  const { attendanceCount, leaveCount } = attendanceData;

  const user = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchAttendanceData = () => {
      const bearerToken = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
      };
  
      if (bearerToken) {
        axios.get("https://attendance-app-for-me.glitch.me/api/attendance", config).then((res) => {
            setCreatedAtTime(new Date(res.data.createdAt));
          }).catch((error) => {
                // toast.error("Error: Attendance Not Found");
          });
      }
    };

    fetchAttendanceData();
  }, []);

  

  const isAttendanceEnabled = !isAttendanceMarked && !isLeaveMarked;
  const isLeaveEnabled = !isAttendanceMarked && !isLeaveMarked;

  const submitMarkedAttendance = async (e) => {
    e.preventDefault();
  
    if (createdAtTime && isSameDay(new Date(), createdAtTime)) {
      toast.error("You have already marked attendance today");
      return;
    }
  
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  
    try {
      const res = await axios.post("https://attendance-app-for-me.glitch.me/api/attendance", { attendanceCount: 1, leaveCount: 0 }, config);
      toast.success("Marked Attendance Successfully");
      setAttendanceData(res.data);
      setIsAttendanceMarked(true);
    } catch (error) {
      toast.error("Error: Attendance not Marked");
    }
  };
  
  const submitMarkedLeave = async (e) => {
    e.preventDefault();
  
    if (createdAtTime && isSameDay(new Date(), createdAtTime)) {
      toast.error("You have already marked leave today");
      return;
    }
  
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  
    try {
      const res = await axios.post("https://attendance-app-for-me.glitch.me/api/attendance", { attendanceCount: 0, leaveCount: 1 }, config);
      toast.success("Leave Sent Successfully");
      setAttendanceData(res.data);
      setIsLeaveMarked(true);
    } catch (error) {
      toast.error("Error: Leave Not Sent");
    }
  };
  

  const viewAttendance = async (e) => {
    e.preventDefault();
  
    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
  
    try {
      if (bearerToken) {
        const res = await axios.get("https://attendance-app-for-me.glitch.me/api/attendance", config);
        setAttendanceData(res.data);
        setIsViewAttendance(true);
      }
    } catch (error) {
      toast.error("Error: Attendance Not Found");
    }
  };
  

  // Check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
  };


  return (
    <>
      <UserNavbar />
      <div className="attendance-container">
        <h1>Student Attendance</h1>
        <button className="attendance-button" onClick={submitMarkedAttendance} disabled={!isAttendanceEnabled}>
          {isAttendanceMarked ? "Attendance Marked" : "Mark Attendance"}
        </button>
        <button className="attendance-button" onClick={submitMarkedLeave} disabled={!isLeaveEnabled}>
          {isLeaveMarked ? "Leave Marked" : "Mark Leave"}
        </button>
        <button className="attendance-button" onClick={viewAttendance}>View Attendance</button>
        {isViewAttendance && ( <p className="attendance-text">Total Presents: {attendanceCount}</p> )}
      </div>
    </>
  );
};

export default Attendance;
