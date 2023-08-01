import React, { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import FormItem from "./FormItem";

const FormData = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false)

  // Get User Form Data
  useEffect(() => {
    const fetchFormData = () => {
      setLoading(true)
      const bearerToken = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
      };
      if (bearerToken) {
        axios.get("http://127.0.0.1:3000/api/form", config).then((res) => {
          setFormData(res.data);
          setLoading(false)
        }).catch((ex) => {
        console.log(ex);
    });
      }
    };

    fetchFormData();
  }, []);


  // Delete User Form Data
  const deleteFormData = async (formId) => {
    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };
    axios.delete(`http://127.0.0.1:3000/api/form/${formId}`, config).then((res) => {
        toast.success("Form Data Deleted");
        const deletedFormData = formData.filter((formData) => formId !== formData._id);
        setFormData(deletedFormData);
      }).catch((ex) => {
        if ((ex.response && ex.response.status === 404) || (ex.response && ex.response.status === 400)) {
          toast.error("Form Data Not Found");
        }
      });
  };

  return (
    <>
    {loading ? <div className='center-heading'>Loading....</div> : <>{formData.length > 0 ? (
        <FormItem
          formData={formData}
          deleteFormData={deleteFormData}
        />
      ) : (
        <h1 className='center-heading'>No Data Found</h1>
      )} </>}

    </>
  );
};

export default FormData;
