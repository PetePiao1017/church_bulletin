import React from "react";
import { Button,  Form, Input,Select} from 'antd';
import {connect} from 'react-redux';

import { setSmallSectionData } from '../../../actions/bulletins';

const OnlineGivingediting = (props) => {
   
    let title, bodyText, link;
    const onStateChange = (e) => {
        switch(e.target.name) {
            case "title":
                title += e.target.value;
                props.setSmallSectionData(props.id, "Online Giving", "title", e.target.value);
                break
            case "bodyText":
                bodyText += e.target.value;
                props.setSmallSectionData(props.id, "Online Giving", "bodyText", e.target.value);
                break
            case "link":
                link += e.target.value;
                props.setSmallSectionData(props.id, "Online Giving", "link", e.target.value);
                break
        }
    }

    const onSelectChange = (value) =>{
        props.setSmallSectionData(props.id, "Online Giving", "onlineType", value);
    }


    return(
        <div style={{width: "100%", margin: "0 auto"}}>
            <h4 className="top-header">Edit Online Giving</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onStateChange}
                        placeholder="Onling Giving"
                    />
                </Form.Item>

                <Form.Item label = "BODY TEXT">
                    <Input.TextArea name="bodyText" value={bodyText} onChange={onStateChange} rows = {4} />
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
                        value={link}
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

export default connect(null, {setSmallSectionData })(OnlineGivingediting)