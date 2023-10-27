import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import { PlusOutlined } from "@ant-design/icons";
import './CustomUpload.scss';
import { Button } from "antd";
import { setAnnouncementImageUrl, 
        setAnnouncementDeleteImageUrl,
        setHeaderImageurl, 
        setHeaderDeleteImageurl,
        setOrderOfServiceImageurl,
        setOrderOfServiceDeleteImageurl,
        setEventImageUrl,
        setEventDeleteImageUrl,
    } from "../../actions/bulletins";
import { useNavigate } from "react-router-dom";


const CustomUpload = (props) => {

    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        switch(props.type){
            case "Announcement":
                props.setAnnouncementImageUrl(objectUrl);
                break
            case "Headerediting":
                props.setHeaderImageurl(objectUrl);
                break
            case "OrderofService":
                props.setOrderOfServiceImageurl(objectUrl);
                break
            case "Event":
                props.setEventImageUrl(objectUrl);
        }
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        navigate('/ex1', {replace: true})
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            
            return
        }
        console.log(e.target.files[0])
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const onChangeImage = () => {
        switch(props.type){
            case "Announcement":
                props.setAnnouncementDeleteImageUrl("");
                break
            case "Headerediting":
                props.setHeaderDeleteImageurl("");
                break
            case "OrderofService":
                props.setOrderOfServiceDeleteImageurl("");
                break
            case "Event":
                props.setEventDeleteImageUrl("");
                break
        }
        document.getElementById("file-upload").value = "";
        setSelectedFile(undefined);
    }

    return (
       <>
            <label for="file-upload" className="custom-file-upload">
                {
                    !selectedFile
                    ?   <div style={{margin: "auto", display: "flex", flexDirection: "column"}}>
                            <PlusOutlined style={{margin:"auto"}} /> 
                            <p>Upload</p>
                        </div>
                    : <img src={preview}  style={{width:"100%"}}/>
                }
                <input type='file' onChange={onSelectFile} id = "file-upload"  style={{display:"none"}}/>
            </label>
            {
                selectedFile && <Button 
                    type = "primary" 
                    onClick={onChangeImage}
                >
                    Change Image
                </Button>
            }
            
        </>
    )
}


export default connect(null, {
    setAnnouncementImageUrl, 
    setAnnouncementDeleteImageUrl,
    setHeaderDeleteImageurl,
    setHeaderImageurl,
    setOrderOfServiceImageurl,
    setOrderOfServiceDeleteImageurl,
    setEventImageUrl,
    setEventDeleteImageUrl,
})(CustomUpload)