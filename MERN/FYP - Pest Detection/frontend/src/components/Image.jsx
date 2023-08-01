import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Image.css';

const Image = () => {
  const [image, setImage] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const uploadImage = (e) => {
    e.preventDefault();
    if (image && !isLoading) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', image);

      axios.post('http://10.8.33.0:3000/upload', formData).then((res) => {   // Replace it with your IP Address
          setImageDetails(res.data);
        }).catch((ex) => {
          alert(ex);
        }).finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageDetails(null);       // Reset the image details when a new image is selected
  };
  

  const getPesticideTreatment = (className) => {
    let treatment = '';

    if (className === 'aphid') {
      treatment = 'Insecticidal Soap, Neem Oil, Pyrethrin-based Insecticides, Horticultural Oils';
    } else if (className === 'sawfly') {
      treatment = 'Spinosad, Bacillus thuringiensis (Bt), Pyrethrin-based Insecticides, Carbaryl';
    } else if (className === 'grasshopper') {
      treatment = 'Insecticidal Dusts, Neem Oil, Pyrethrin-based Insecticides, Biological Controls';
    } else if (className === 'Green-Leafhopper') {
      treatment = 'Insecticidal Soap, Neem Oil, Pyrethrin-based Insecticides, Horticultural Oils';
    } else if (className === 'beetle') {
      treatment = 'Imidacloprid, Acephate, Dinotefuran, Thiamethoxam';
    } else if (className === 'armyworm') {
      treatment = 'Bacillus thuringiensis (Bt), Spinosad, Pyrethrin-based Insecticides, Carbaryl';
    } else {
      treatment = 'No Pests Found...';
    }
    return treatment;
  };

  return (
    <div className="page-container">
    <div className="image-container">
      <div className="file-input-wrapper">
        <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" ref={fileInputRef} />
        <label className="file-input-label" onClick={openFilePicker}></label>
      </div>
      <button className="upload-button" onClick={uploadImage} disabled={isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
      {imageDetails && (
        <div className="image-analysis-container">
          <h1 className="image-details">Image Analysis:</h1>
          <div className="image-container">
            <img src={URL.createObjectURL(image)} alt="Uploaded Image" className="uploaded-image" />
          </div>
          <div className="predictions-container">
      {imageDetails.data.predictions.length > 0 ? (
        imageDetails.data.predictions.map((prediction, index) => (
          <div key={index} className="prediction">
            <p><strong>Class:</strong> {prediction.class}</p>
            <p><strong>Confidence:</strong> {prediction.confidence}</p>
            <p><strong>Pesticides:</strong> {getPesticideTreatment(prediction.class)}</p>
          </div>
        ))
      ) : (
        <h1 className="image-details">No predictions available.</h1>
      )}
    </div>
        </div>
      )}
      {isLoading ? ( <p>Loading...</p>) : ( imageDetails && ( <pre>{JSON.stringify(imageDetails, null, 2)}</pre> ))}
    </div>
    </div>
  );
};

export default Image;
