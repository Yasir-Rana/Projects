import React, { useState, useEffect } from "react";
import axios from "axios";
import "../utils/InputForm.css";


const InputForm = ({ onPostCreate, editData, setEditData }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    image: ""
  });

  useEffect(() => {
    if (editData) {
      setPostData(editData);
    } else {
      setPostData({
        creator: "",
        title: "",
        message: "",
        tags: "",
        image: ""
      });
    }
  }, [editData]);

  const { creator, title, message, tags, image } = postData;

  const changeHandler = (e) => {
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const postObj = {
      creator,
      title,
      message,
      tags: typeof tags === "string" ? tags.split(",").map((tag) => tag.trim()) : "",
      image
    };

    if (editData) {
      // Update Existing Post
      axios.put(`http://127.0.0.1:3000/api/posts/${editData._id}`, postObj).then((res) => {
          onPostCreate();
          setEditData(null);
        }).catch((ex) => {
          console.log(ex.response.data.message);
        });
    } else {
      // Create New Post
      axios.post("http://127.0.0.1:3000/api/posts", postObj).then((res) => {
          onPostCreate();
        }).catch((ex) => {
          console.log(ex.response.data.message);
        });
    }

    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      image: ""
    });
  };

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <h1 className="heading">
          {editData ? "Editing a Post" : "Creating a Post"}
        </h1>
      <input className="input" type="text" name="creator" value={creator} required onChange={changeHandler} placeholder="Creator"  />
      <input className="input" type="text" name="title" value={title} required onChange={changeHandler} placeholder="Title"  />
      <input className="input" type="text" name="message" value={message} required onChange={changeHandler} placeholder="Message"  />
      <input className="input" type="text" name="tags" value={tags} required onChange={changeHandler} placeholder="Tags"  />
      {/* <input className="fileInput" type="file" accept=".jpg, .jpeg, .png" name="image" value={image} onChange={changeHandler}  /> */}
      <input className="input" type="text" name="image" value={image} required onChange={changeHandler} placeholder="Paste Image Link Here"/>
        <div className="buttonContainer">
          <button className="submitButton" type="submit">{editData ? "Update" : "Submit"}</button>
          <button className="clearButton" type="reset" onClick={() => setEditData(null)}>Clear</button>
        </div>
      </form>
    </>
  );
};

export default InputForm;
