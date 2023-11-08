import React, { useState } from 'react';
import './ImageUpload.scss'


function getImageDimensions(base64Image) {
    return new Promise((resolve, reject) => {
      const image = new Image();
  
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        resolve({ width, height });
      };
  
      image.onerror = (error) => {
        reject(error);
      };
  
      image.src = base64Image;
    });
}

function ImageUpload({index}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [height, setHeight] = useState(0)

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
        getImageDimensions(event.target.result)
        .then(({ width, height }) => {
            setHeight(height);
        })
        .catch((error) => {
            console.error('Error loading image:', error);
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <label 
        htmlFor={`file-upload${index}`}
        className="custom-file-upload"
        style={{
          height:height === 0 ? "200px" :height
        }}
        id = {`${index}`}
        >
        {!preview ? (
          <div
            style={{
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3 style={{marginTop: "30%", marginBottom: "30%"}}>Upload your Image from your computer</h3>
          </div>
        ) : (
          <img src={preview} alt="Preview" style={{ width: '100%', height: 'auto' }} />
        )}
        <input type="file" onChange={(e) => onSelectFile(e)} id={`file-upload${index}`} style={{ display: 'none' }} />
      </label>
    </div>
  );
}

export default ImageUpload;
