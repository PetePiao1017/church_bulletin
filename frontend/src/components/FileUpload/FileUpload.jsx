import React, { useState } from 'react';
import './FileUpload.scss'




function FileUpload({index}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [filename, setFilename] = useState('');

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFilename(file.name)

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <label 
        htmlFor={`file-upload${index}`}
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
            {!filename ? "Upload your file" : filename}
          </h3>
        </div>
        <input type="file" onChange={(e) => onSelectFile(e)} id={`file-upload${index}`} style={{ display: 'none' }} />
      </label>
    </div>
  );
}

export default FileUpload;
