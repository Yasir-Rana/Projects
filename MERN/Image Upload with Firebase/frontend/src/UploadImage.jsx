import React, { useState } from 'react';
import axios from "axios";

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = () => {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", image);
      
        axios.post("http://127.0.0.1:3000/image", formData).then((res) => {
          setIsUploading(false);
          console.log(res.data.message);
          alert(res.data.message);
        }).catch((error) => {
          console.log(error);
        })
    }
  return (
    <>
      <input type="file" accept="image/*" name="image" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload} disabled={!image}>{isUploading ? "Uploading..." : "Upload"}</button>
    </>
  )
};

export default UploadImage;
