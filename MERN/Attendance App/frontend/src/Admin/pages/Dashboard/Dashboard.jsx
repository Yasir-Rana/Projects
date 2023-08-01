import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import Sidebar from '../../components/Sidebar/Sidebar';
import "./Dashboard.css";

const Dashboard = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendanceData, setFilteredAttendanceData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isDateFilterApplied, setIsDateFilterApplied] = useState(false);

  const user = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Get Users Data
  useEffect(() => {
    const fetchUserData = () => {
      const bearerToken = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
      };
      if (bearerToken) {
        axios.get("https://attendance-app-for-me.glitch.me/api/attendance/all", config).then((res) => {
            setAttendanceData(res.data);
          }).catch((ex) => {
            console.log(ex);
          });
      }
    };

    fetchUserData();
  }, []);

  // Delete User Attendance Data
  const deleteAttendanceData = async (attendanceDataId) => {
    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
    try {
      await axios.delete(`https://attendance-app-for-me.glitch.me/api/attendance/${attendanceDataId}`,config);
      toast.success("Attendance Data Deleted");
      const deletedAttendanceData = attendanceData.filter((attendanceDataData) => attendanceDataId !== attendanceDataData._id);
      setAttendanceData(deletedAttendanceData);
    } catch (error) {
      if (
        error.response && (error.response.status === 404 || error.response.status === 400)
      ) {
        toast.error("Attendance Data Not Found");
      } else {
        toast.error("Error deleting attendance data");
      }
    }
  }

  // Filter the User Data
  const handleFilter = async () => {
    const formattedFromDate = new Date(fromDate + "T00:00:00.000Z");
    const formattedToDate = new Date(toDate + "T23:59:59.999Z");

    if (formattedFromDate > formattedToDate) {
      toast.error("FROM date cannot be greater than TO date.");
      return;
    }
    const filteredData = attendanceData.filter((data) => {
      const createdAtTime = new Date(data.createdAt);
      return ( createdAtTime >= formattedFromDate && createdAtTime <= formattedToDate );
    });

    setFilteredAttendanceData(filteredData);
    setIsDateFilterApplied(true);
  };

  const clearDateFilter = () => {
    setIsDateFilterApplied(false);
    setFilteredAttendanceData([]); 
    setToDate("");
    setFromDate("");
  };
  

  // Calculate Grade
  const calculateGrade = (attendanceCount) => {
    if (attendanceCount >= 26) {
      return "A";
    } else if (attendanceCount >= 20) {
      return "B";
    } else if (attendanceCount >= 15) {
      return "C";
    } else if (attendanceCount >= 10) {
      return "D";
    } else {
      return "F";
    }
  };
  

  return (
    <>
      <Sidebar />
      <div className="date">
       <label htmlFor="from">FROM:</label><input type="date" value={fromDate} name="from" id="from" onChange={(e) => setFromDate(e.target.value)} />
       <label htmlFor="to">TO:</label><input type="date" value={toDate} name="to" id="to" onChange={(e) => setToDate(e.target.value)} />
        <button onClick={handleFilter}>Filter</button>
        {isDateFilterApplied && ( <button onClick={clearDateFilter}>Clear Filter</button> )}
      </div>

      {!isDateFilterApplied && attendanceData.length > 0 && (
        <div className="view-users-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Total Attendance</th>
                <th>Total Leaves</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((u) => (
                <tr key={u._id}>
                  <td>{u.user.name}</td>
                  <td>{u.user.email}</td>
                  <td>{u.attendanceCount}</td>
                  <td>{u.leaveCount}</td>
                  <td>{calculateGrade(u.attendanceCount)}</td>
                  <td>
                    <Link to={`/edit/attendance/${u._id}`} className="action-link">Edit</Link>
                    <button onClick={() => deleteAttendanceData(u._id)} className="action-link">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} 
      
      {isDateFilterApplied && filteredAttendanceData.length > 0 && (
        <div className="view-users-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Total Attendance</th>
                <th>Total Leaves</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendanceData.map((u) => (
                <tr key={u._id}>
                  <td>{u.user.name}</td>
                  <td>{u.user.email}</td>
                  <td>{u.attendanceCount}</td>
                  <td>{u.leaveCount}</td>
                  <td>{calculateGrade(u.attendanceCount)}</td>
                  <td>
                    <Link to={`/edit/attendance/${u._id}`} className="action-link">Edit</Link>
                    <button onClick={() => deleteAttendanceData(u._id)} className="action-link">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isDateFilterApplied && filteredAttendanceData.length === 0 && (
        <h1 className="no-data-found">No Data Found</h1>
      )}
    </>
  );
};

export default Dashboard;
