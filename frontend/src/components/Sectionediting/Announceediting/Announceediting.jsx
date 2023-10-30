import React from "react";
import {connect} from 'react-redux';
import { Button,  Form, Input} from 'antd';

import {    setAnnouncementTitle, 
            setAnnouncementBodyText, 
            setAnnouncementImage, 
            setAnnouncementButtonLink, 
            setAnnouncementButtonText,
        } from '../../../actions/bulletins';

import CustomUpload from "../../CustomUpload/CustomUpload";
import './Announceediting.scss';


const Announceediting = (props) => {
    

    
    const onChange = (e) => {
        let tempObj = {
            id: props.id,
            str: e.target.value
        }
        switch(e.target.name){
            case "title":
                props.setAnnouncementTitle(tempObj);
                break
            case "bodyText":
                props.setAnnouncementBodyText(tempObj);
                break;
            case "buttonLink":
                props.setAnnouncementButtonLink(tempObj);
                break;
            case "buttonText":
                props.setAnnouncementButtonText(tempObj);
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
                        value={props.title}
                        onChange={onChange}
                    />
                </Form.Item>
                <Form.Item label = "IMAGE">
                    <CustomUpload 
                        type = {"Announcement"}
                        id = {props.id}
                    />
                </Form.Item>
                <Form.Item label = "BODY TEXT">
                    <Input.TextArea
                        name = "bodyText"
                        value = {props.bodyText}
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
                        value={props.buttonText}
                        onChange={onChange}
                    />
                    <Input  
                        type="text"
                        name = "buttonLink"
                        placeholder="Button Link"
                        value={props.buttonLink}
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
    title: state.builletins.announcement_Title,
    bodyText: state.builletins.announcement_bodyText,
    buttonText: state.builletins.announcement_buttonText,
    buttonLink: state.builletins.announcement_buttonLink,
})

export default connect(mapStateToProps, {
    setAnnouncementTitle,
    setAnnouncementBodyText,
    setAnnouncementButtonText,
    setAnnouncementButtonLink,
})(Announceediting)