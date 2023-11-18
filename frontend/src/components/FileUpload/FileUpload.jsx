import React, { useState } from 'react';
import {connect} from 'react-redux';
import { DeleteFilled } from '@ant-design/icons';

import './FileUpload.scss';
import { setSectionImageUpload } from '../../actions/bulletins';





function FileUpload(props) {
  const [filename, setFilename] = useState('');

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    setFilename(file.name)
    
    if (file) {
      props.setSectionImageUpload(props.id, props.sectionId, file, "file");
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  const renderFileName = () => {
    if(!filename){
      if(props.value){
        return props.value
      }
      else return "Upload your file"
    }
    else return filename
  }
  return (
    <div style={{ marginTop: '20px', marginBottom: '20px', border: "1px solid #57b0fb", padding:"5px", position: "relative"}}>
      <label 
        htmlFor={`file-upload${props.index}`}
        className="file-upload"
        id = "label"
        >
        <div
          style={{
            margin: 'auto',
            display: 'flex',
            alignItems: "center"
          }}
        > 
          <img src = "./file.png"  style={{width:"20px", height:"20px", marginRight: "15px"}}/>
          <h3 
            style={{marginTop: "5%", marginBottom: "5%"}}
          >
            {renderFileName()}
          </h3>
        </div>
        <input type="file" onChange={(e) => onSelectFile(e)} id={`file-upload${props.index}`} style={{ display: 'none' }} />
        <div style={{display: "inline"}}>
            <DeleteFilled 
              className="delete-icon-file" 
              onClick={() => props.deleteItemCallback(props.id)}
            />
        </div>
      </label>
    </div>
  );
}

export default connect(null, {setSectionImageUpload})(FileUpload);
