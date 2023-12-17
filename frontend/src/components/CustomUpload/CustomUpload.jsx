import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import { PlusOutlined } from "@ant-design/icons";
import './CustomUpload.scss';
import { Button } from "antd";
import { setImageUrl,
        setDeleteImageUrl,
        setSmallSectionData,
        setHeaderImageurl,
        iconUpload,
        deleteIcon,
    } from "../../actions/bulletins";


const CustomUpload = (props) => {

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if(props.imageUrl) console.log(props.imageUrl);
    }, [props.imageUrl])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
        // if(props.imageUrl) setPreview(props.imageUrl);
        // else setPreview(URL.createObjectURL(e.target.files[0]));
        switch(props.type){
            case "Headerediting":
                props.setHeaderImageurl(e.target.files[0]);
                break
            case "Announcement":
                props.setImageUrl(e.target.files[0], props.id, "Announcement", "imageUrl");
                break
            case "OrderofService":
                props.setImageUrl(e.target.files[0], props.id, "Order Of Service", "imageUrl");
                break
            case "Event":
                props.setImageUrl(e.target.files[0], props.id, "Event", "imageUrl");
            case "Connect Card":
                props.setImageUrl(e.target.files[0], props.id, "Connect Card", "imageUrl");
            case "icon":
                props.iconUpload(e.target.files[0], props.id)
                    .then(url => setPreview(url))
            default:
                break

        }

    }

    const onChangeImage = () => {
        let index = props.todoList.findIndex(item => item.id === props.id);
        let iconUrl = props.todoList[index].icon;
        let image_index = props.todoList[index].data.findIndex(item => item.dataType === "imageUrl");
        let imageUrl = props.todoList[index].data[image_index];

        switch(props.type){
            case "Announcement":
                props.setDeleteImageUrl(props.id, "Announcement", "imageUrl", imageUrl);
                break
            case "Headerediting":
                props.setHeaderDeleteImageurl("", props.header_imageurl);
                break
            case "OrderofService":
                props.setDeleteImageUrl(props.id, "Order Of Service", "imageUrl", imageUrl);
                break
            case "Event":
                props.setDeleteImageUrl(props.id, "Event", "imageUrl", imageUrl);
                break
            case "Connect Card":
                props.setDeleteImageUrl(props.id, "Connect Card", "imageUrl", imageUrl);
                break
            case "icon":
                if(iconUrl) props.deleteIcon(props.id, iconUrl);
                break
        }
        document.getElementById(`file-upload${props.id}`).value = "";
        setSelectedFile(undefined);
    }

    return (
       <>
            <label for={`file-upload${props.id}`} className={props.value ? "section-upload" : "custom-file-upload"}>
                {
                    !props.imageUrl
                    ?   <div style={{margin: "auto", display: "flex", flexDirection: "column"}}>
                            <PlusOutlined style={{margin:"auto"}} /> 
                            <p>Upload</p>
                        </div>
                    : <img src={props.imageUrl}  style={{width:"100%"}}/>
                }
                <input type='file' onChange={(e) => onSelectFile(e)} id = {`file-upload${props.id}`}  style={{display:"none"}}/>
            </label>
            {
                (props.imageUrl) && <Button 
                                    type = "primary" 
                                    onClick={onChangeImage}
                                    className="change-button"
                                >
                    Change Image
                </Button>
            }
            
        </>
    )
}


const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList,
})

export default connect(mapStateToProps, {
    setImageUrl, 
    setDeleteImageUrl,
    setSmallSectionData,
    setHeaderImageurl,
    iconUpload,
    deleteIcon
})(CustomUpload)