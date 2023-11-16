import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import { Button,  Form, Input} from 'antd';

import { setSmallSectionData } from '../../../actions/bulletins';

import CustomUpload from "../../CustomUpload/CustomUpload";
import './Announceediting.scss';


const Announceediting = (props) => {
    
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [buttonLink, setButtonLink] = useState("");

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let bodyText_index = props.todoList[index].data.findIndex(item => item.dataType === "bodyText");
            let buttonText_index = props.todoList[index].data.findIndex(item => item.dataType === "buttonText");
            let image_index = props.todoList[index].data.findIndex(item => item.dataType === "imageUrl");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(bodyText_index !== -1) setBodyText(props.todoList[index].data[bodyText_index].value);
            if(buttonText_index !== -1) setButtonText(props.todoList[index].data[buttonText_index].value);
            if(image_index !== -1) setImageUrl(props.todoList[index].data[image_index].value);

        }
    },[props.todoList]);
    
    const onChange = (e) => {
        switch(e.target.name){
            case "title":
                props.setSmallSectionData(props.id, "Announcement", "title", e.target.value);
                break
            case "bodyText":
                props.setSmallSectionData(props.id, "Announcement", "bodyText", e.target.value);
                break;
            case "buttonLink":
                props.setSmallSectionData(props.id, "Announcement", "buttonLink", e.target.value);
                break;
            case "buttonText":
                props.setSmallSectionData(props.id, "Announcement", "buttonText", e.target.value);
                break;
        
        }
    }

    return(
        <div className="announcment">
            <h4 className="top-header">Edit Announcement</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "BULLETIN TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label = "IMAGE">
                    <CustomUpload 
                        type = {"Announcement"}
                        imageUrl = {imageUrl}
                        id = {props.id}
                    />
                </Form.Item>
                <Form.Item label = "BODY TEXT">
                    <Input.TextArea
                        name = "bodyText"
                        value = {bodyText}
                        onChange={onChange}
                        rows = {4} 
                        />
                </Form.Item>
                <Form.Item label = "BUTTON">
                    <Input  
                        type="text"
                        name = "buttonText"
                        placeholder="Button Text" 
                        style = {{marginBottom:"20px"}}
                        value={buttonText}
                        onChange={onChange}
                    />
                    <Input  
                        type="text"
                        name = "buttonLink"
                        placeholder="Button Link"
                        value={buttonLink}
                        onChange={onChange}
                    />
                </Form.Item>
                <Button 
                    type = "primary"
                    style={{float:"right"}}    
                >Done Editing</Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList
})

export default connect(mapStateToProps, { setSmallSectionData })(Announceediting)