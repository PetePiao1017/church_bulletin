import React, {useState, useEffect} from "react";
import {connect} from 'react-redux';
import axios  from "axios";
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


const CustomUpload = (props) => {

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    let index;


    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        switch(props.type){
            case "Headerediting":
                props.setHeaderImageurl(e.target.files[0]);
                break
            case "Announcement":
                props.setAnnouncementImageUrl(e.target.files[0], props.id);
                break
            case "OrderofService":
                props.setOrderOfServiceImageurl(e.target.files[0], props.id);
                break
            case "Event":
                props.setEventImageUrl(e.target.files[0], props.id);
            default:
                break

        }

    }

    const onChangeImage = () => {
        switch(props.type){
            case "Announcement":
                index = props.announcement_imageurl.findIndex(item => item.id === props.id);
                props.setAnnouncementDeleteImageUrl(props.announcement_imageurl[index], props.id);
                break
            case "Headerediting":
                props.setHeaderDeleteImageurl("", props.header_imageurl);
                break
            case "OrderofService":
                index = props.orderofservice_imageurl.findIndex(item => item.id === props.id);
                props.setOrderOfServiceDeleteImageurl(props.orderofservice_imageurl[index], props.id);
                break
            case "Event":
                index = props.event_imageurl.findIndex(item => item.id === props.id);
                props.setEventDeleteImageUrl(props.event_imageurl[index], props.id);
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
                <input type='file' onChange={(e) => onSelectFile(e)} id = "file-upload"  style={{display:"none"}}/>
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


const mapStateToProps = (state) => ({
    header_imageurl: state.builletins.header_imageurl,
    announcement_imageurl: state.builletins.announcment_imageurl,
    orderofservice_imageurl: state.builletins.orderofservice_imageurl,
    event_imageurl: state.builletins.event_imageurl,
})

export default connect(mapStateToProps, {
    setAnnouncementImageUrl, 
    setAnnouncementDeleteImageUrl,
    setHeaderDeleteImageurl,
    setHeaderImageurl,
    setOrderOfServiceImageurl,
    setOrderOfServiceDeleteImageurl,
    setEventImageUrl,
    setEventDeleteImageUrl,
})(CustomUpload)