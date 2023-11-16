import React, { useState } from "react";
import { Button,  Form, Input, Radio,message} from 'antd';
import {connect} from 'react-redux';

import {setSmallSectionData,} from '../../../actions/bulletins';

const Websiteediting = (props) => {
    let title,link, embed_code;
    const [type, setType] = useState("Website");
    const onStateChange = (e) => {
        switch(e.target.name) {
            case "title":
                title += e.target.value;
                props.setSmallSectionData(props.id, "Website", "title", e.target.value);
                break
            case "link":
                link += e.target.value;
                props.setSmallSectionData(props.id, "Website", "link", e.target.value);
                break
            case "embed_code":
                embed_code += e.target.value;
                props.setSmallSectionData(props.id, "Website", "embed_code", e.target.value);
                break
        }
    }

    const onRadioChange = (e) => {
        props.setSmallSectionData(props.id, "Website", "websiteType", e.target.value);
    }


    return(
        <div style={{width: "100%", margin: "0 auto"}}>
            <h4 className="top-header">Edit Website</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "BULLETIN TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onStateChange}
                    />
                </Form.Item>
                <Form.Item label = "EMBED TYPE">
                    <Radio.Group value={props.type} onChange={onRadioChange}>
                        <Radio value="Website"> Website </Radio>
                        <Radio value="EmbedCode"> Embed Code </Radio>
                    </Radio.Group>
                </Form.Item>
                {
                    type === "Website"
                    ?
                        <Form.Item label = "Website Link">
                            <Input type = "text" name="link" value={link} onChange={onStateChange} placeholder="yourwebsite.com" />
                        </Form.Item>
                    :
                        <Form.Item label = "EMBED CODE">
                            <Input.TextArea
                                name = "embed_code"
                                rows = {6} 
                                placeholder="Paste HTML code block here"
                                onChange={onStateChange}
                                />
                        </Form.Item>
                }
                
                <Button 
                    type = "primary"
                    style={{float:"right"}}    
                >Done Editing</Button>
            </Form>
        </div>
    )
}


export default connect(null,{
    setSmallSectionData,
}) (Websiteediting)