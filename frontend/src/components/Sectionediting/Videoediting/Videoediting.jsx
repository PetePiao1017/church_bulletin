import React,{useState} from "react";
import { Button,  Form, Input, Select,message} from 'antd';
import {connect} from 'react-redux';

import {setSmallSectionData,} from '../../../actions/bulletins';

const Videoediting = (props) => {

    let title, bodyText, videoLink;
    const onStateChange = (e) => {
        switch(e.target.name) {
            case "title":
                title += e.target.value;
                props.setSmallSectionData(props.id, "Video", "title", e.target.value);                
                break
            case "bodyText":
                bodyText += e.target.value;
                props.setSmallSectionData(props.id, "Video", "bodyText", e.target.value);
                break
            case "video_Link":
                videoLink += e.target.value;
                props.setSmallSectionData(props.id, "Video", "video_link", e.target.value);
                break
        }
    }

    const onPlaformChage = (value) => {
        props.setSmallSectionData(props.id, "Video", "platform", value);
    }


    return(
        <div style={{margin: "0 auto", width: "100%"}}>
            <h4 className="top-header">Edit Video</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "Video">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onStateChange}
                    />
                </Form.Item>
                <Form.Item label = "BODY TEXT">
                    <Input.TextArea name="bodyText" value={bodyText} onChange={onStateChange} rows = {4} />
                </Form.Item>
                <Form.Item label = "Video Platform">
                    <Select value={props.video_Platform} onChange={onPlaformChage}>
                        <Select.Option value="Facebook">Facebook</Select.Option>
                        <Select.Option value="Twitter">Twitter</Select.Option>
                        <Select.Option value="Youtube">Youtube</Select.Option>
                        <Select.Option value="Vimeo">Vimeo</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label = "Video Link">
                    <Input 
                        type = "text" 
                        name="video_Link" 
                        value={videoLink} 
                        onChange={onStateChange} 
                        placeholder="yourwebsite.com" 
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

export default connect(mapStateToProps,{setSmallSectionData})(Videoediting)