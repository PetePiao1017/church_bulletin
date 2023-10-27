import React,{useState} from "react";
import { Button,  Form, Input, message, Select} from 'antd';
import {connect} from 'react-redux';

import {
    setOnlineTitle,
    setOnlineBodyText,
    setOnlineType,
    setOnlineLink
} from '../../../actions/bulletins';

const OnlineGivingediting = (props) => {
   
    const onStateChange = (e) => {
        switch(e.target.name) {
            case "title":
                props.setOnlineTitle(e.target.value);
                break
            case "bodyText":
                props.setOnlineBodyText(e.target.value);
                break
            case "link":
                props.setOnlineLink(e.target.value);
                break
        }
    }

    const onSelectChange = (value) =>{
        props.setOnlineType(value);
    }


    return(
        <div style={{width: "100%", margin: "0 auto"}}>
            <h4 className="top-header">Edit Online Giving</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={props.title}
                        onChange={onStateChange}
                        placeholder="Onling Giving"
                    />
                </Form.Item>

                <Form.Item label = "BODY TEXT">
                    <Input.TextArea name="bodyText" value={props.bodyText} onChange={onStateChange} rows = {4} />
                </Form.Item>
                
                <Form.Item label = "Display Online Giving via">
                    <Select 
                        value={props.type} 
                        onChange={onSelectChange} 
                        defaultValue={"Embed website"}
                        style={{width:"100%"}}
                    >
                        <Select.Option value="Embed">Embed website</Select.Option>
                        <Select.Option value="Link">Link to your onling givng page</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Input 
                        type="text"
                        name="link"
                        value={props.link}
                        onChange={onStateChange}
                        placeholder="yourwebsite.com"
                        /> 
                </Form.Item>
                {
                    props.type == "Link"
                    ? <Form.Item label = "BUTTON">
                        <Input type="text" placeholder="Give now" />
                        <Input type="text" placeholder="Button Link" />
                    </Form.Item>
                    : <Input type = "text" style={{marginTop: "10px"}} placeholder="yourwebste.com" />
                }
                <Button 
                    type = "primary"
                    style={{float:"right"}}    
                >
                    Done Editing
                </Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.Online_Title,
    bodyText: state.builletins.online_bodyText,
    type: state.builletins.online_Type,
    link: state.builletins.online_Link
})

export default connect(mapStateToProps, {
    setOnlineTitle,
    setOnlineBodyText,
    setOnlineType,
    setOnlineLink
})(OnlineGivingediting)