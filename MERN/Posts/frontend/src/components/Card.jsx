import React, { useState } from "react";
import { FaThumbsUp, FaTrash } from 'react-icons/fa';
import "../utils/Card.css";

const Card = ({postData, deletePostData, updatePostData}) => {
  const [likes, setLikes] = useState(0);
  const likesHandler = () => {
    setLikes(likes + 1);
  };


  // Logic for Post Created Time
  const getTimeElapsed = (createdAt) => {
  const currentTime = new Date();
  const createdTime = new Date(createdAt);
  const timeDiffMinutes = Math.floor((currentTime - createdTime) / (1000 * 60));
  const timeDiffHours = Math.floor(timeDiffMinutes / 60);

  if (timeDiffMinutes < 1) {
    return "Just now";
  } else if (timeDiffMinutes < 60) {
    return `${timeDiffMinutes} minute${timeDiffMinutes > 1 ? 's' : ''} ago`;
  } else if (timeDiffMinutes < 120) {
    return "1 hour ago";
  } else if (timeDiffHours < 24) {
    return `${timeDiffHours} hour${timeDiffHours > 1 ? 's' : ''} ago`;
  } else {
    const timeDiffDays = Math.floor(timeDiffHours / 24);
    return `${timeDiffDays} day${timeDiffDays > 1 ? 's' : ''} ago`;
  }
};
   
  return (
    <>
    {postData.map((data) => (
      <div className="card" key={data._id} >
      <div className="card-body">
        <div className="card-image">
          <img src={data.image} alt="Image" />
          <div className="image-overlay">
            <h3 className="edit-button" title="Edit" onClick={() => updatePostData(data._id)}>...</h3>
            <h1 className="card-creator">{data.creator}</h1>
            <h5 className="card-time">{getTimeElapsed(data.createdAt)}</h5>
          </div>
        </div>
        <div className="card-content">
        <h3 className="card-tags">#{data.tags.join(" #")}</h3>
          <h1 className="card-title">{data.title}</h1>
          <p className="card-message">{data.message}</p>
        </div>
      </div>
      <div className="card-footer">
        <h4 className="likes-button" onClick={likesHandler}><FaThumbsUp /> Like {likes}</h4>
        <h4 className="delete-button" onClick={() => deletePostData(data._id)}><FaTrash /> Delete</h4>
      </div>
    </div>
    ))}
    </>
  );
};

export default Card;