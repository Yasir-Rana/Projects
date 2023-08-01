import React, { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "./components/InputForm";
import Card from "./components/Card";
import "./utils/App.css";

const App = () => {
  const [postData, setPostData] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  const [editData, setEditData] = useState(null);

  const handlePostCreate = () => {
    setUpdateTrigger((prevTrigger) => !prevTrigger);
  };

  // Get Posts Data
  useEffect(() => {
    const fetchPostData = () => {
      axios.get("http://127.0.0.1:3000/api/posts").then((res) => {
          setPostData(res.data);
        }).catch((ex) => {
          console.log(ex.response.data.message);
        });
    };
    fetchPostData();
  }, [updateTrigger]);


  // Update Posts Data
  const updatePostData = (postId) => {
    const postDataToUpdate = postData.find((data) => data._id === postId);
    if (postDataToUpdate) {
      setEditData(postDataToUpdate);
    }
  };

  // Delete Posts Data
  const deletePostData = async (postId) => {
    axios.delete(`http://127.0.0.1:3000/api/posts/${postId}`).then((res) => {
        const deletedPostData = postData.filter((postData) => postId !== postData._id);
        setPostData(deletedPostData);
      }).catch((ex) => {
        console.log(ex);
      });
  };

  const styles = {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    fontSize: "36px",
    color: "#333",
    backgroundColor: "#f2f2f2",
    padding: "20px",
    borderRadius: "10px"
  };
  

  return (
    <>
      <h1 style={styles}>Instaverse</h1>
      <InputForm onPostCreate={handlePostCreate} editData={editData} setEditData={setEditData} />
      <div className="card-container">
      {postData.length > 0 ? (
          <Card postData={postData} deletePostData={deletePostData} updatePostData={updatePostData} />
      ) : (
        <h1>No Data Found</h1>
      )}
        </div>
    </>
  );
};

export default App;
