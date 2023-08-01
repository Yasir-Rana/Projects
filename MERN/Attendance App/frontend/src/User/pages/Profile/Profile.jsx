import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import UserNavbar from "../../components/UserNavbar/UserNavbar";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });

  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false)

  const { name, email } = userData;

  const user = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUserData = () => {
      const bearerToken = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
      };

      if (bearerToken) {
        axios.get("https://attendance-app-for-me.glitch.me/api/attendance", config).then((res) => {
            setUserData(res.data.user);
          }).catch((error) => {
            console.log(error);
          });
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetchUserImage();
  }, []);

  const fetchUserImage = () => {
    const bearerToken = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` },
    };

    if (bearerToken) {
      axios.get("https://attendance-app-for-me.glitch.me/api/image", config).then((res) => {
          // console.log(res.data);
          setImage(res.data[0].filePath);
        }).catch((error) => {
          // console.log(error);
        });
    }
  };

  const uploadPicture = () => {
    setIsUploading(true);
    if (uploadImage) {
      const formData = new FormData();
      formData.append("uploadImage", uploadImage);

      const bearerToken = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "multipart/form-data",
        },
      };

      axios.put("https://attendance-app-for-me.glitch.me/api/image", formData, config).then((res) => {
          console.log(res.data);
          fetchUserImage();
          toast.success("Image Updated Successfully");
          setIsUploading(false);
        }).catch((error) => {
          console.log(error);
        });
    } else {
      toast.error("No Image selected");
    }
  };

  return (
    <>
    <UserNavbar />
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-info">
          <div className="profile-picture">
            <img src={image || "https://placeholder.com/150"} alt="Profile Picture" className="profile-image" />
            <div className="upload-section">
              <label htmlFor="uploadImage" className="file-input-label">Choose File</label>
              <input type="file" id="uploadImage" accept="image/*" name="uploadImage" onChange={(e) => setUploadImage(e.target.files[0])} />
              <button className="submit-button" onClick={uploadPicture} disabled={isUploading}>{isUploading ? "Wait..." : "Submit"}</button>
            </div>
          </div>
          <div className="profile-details">
            <h3 className="profile-name">Name:</h3> {name}
            <h3 className="profile-email">Email Account: </h3> {email}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
