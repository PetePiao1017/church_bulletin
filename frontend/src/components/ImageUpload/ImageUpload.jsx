import React, { useState } from 'react';
import {connect} from 'react-redux';
import { DeleteFilled } from '@ant-design/icons';
import { setSectionImageUpload } from '../../actions/bulletins';
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

function ImageUpload(props) {
  const [preview, setPreview] = useState(null);
  const [height, setHeight] = useState(0)

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    
    

    if (file) {
      props.setSectionImageUpload(props.id, props.sectionId, file, "image");
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

  const renderImageComponent = () => {
    if(!preview){
      if(!props.imagesrc){
          return(
            <div
            style={{
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h3 style={{marginTop: "30%", marginBottom: "30%"}}>Upload your Image from your computer</h3>
          </div>
          )
      }
      else {
        return <img src={props.imagesrc} alt="Preview" style={{ width: '100%', height: 'auto' }} />
      }
    }
    else return <img src={preview} alt="Preview" style={{ width: '100%', height: 'auto' }} />
  }

  return (
      <div style={{ marginTop: '20px', marginBottom: '20px', border: "1px solid #57b0fb", padding:"5px", position: "relative" }}
      >
        <label 
          htmlFor={`file-upload${props.index}`}
          className="custom-file-upload"
          style={{
            height:height === 0 ? "200px" :height
          }}
          id = {`${props.index}`}
          >
            {renderImageComponent()}
          
          <input type="file" onChange={(e) => onSelectFile(e)} id={`file-upload${props.index}`} style={{ display: 'none' }} />
        </label>
        <div style={{display: "inline"}}>
            <DeleteFilled 
              className="delete-icon-image" 
              onClick={() => props.deleteItemCallback(props.id)}
            />
        </div>
      </div>
  );
}


export default connect(null, {setSectionImageUpload})(ImageUpload);
