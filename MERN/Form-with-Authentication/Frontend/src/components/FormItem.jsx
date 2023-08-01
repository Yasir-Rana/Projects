import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import "../utils/FormData.css";
import { NavLink } from "react-router-dom";

const FormItem = ({formData, deleteFormData}) => {
  return (
    <>
      <table className='form-table'>
        <thead>
          <tr>
            <th>Created At</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Services</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((dataItem) => (
            <tr key={dataItem._id}>
              <td>{new Date(dataItem.createdAt).toLocaleString("en-US")}</td>
              <td>{dataItem.firstName}</td>
              <td>{dataItem.lastName}</td>
              <td>{dataItem.email}</td>
              <td>{dataItem.phone}</td>
              <td>{dataItem.services}</td>
              <td>{dataItem.address}</td>
              <td>
                <NavLink className='update-button' to={`/update/form/${dataItem._id}`} ><FaEdit /> Update</NavLink>
                <button className='delete-button' onClick={() => deleteFormData(dataItem._id)}><FaTrash /> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
};

export default FormItem;
