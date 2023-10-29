import React from "react";
import { Button,  Form, Input, Radio,message} from 'antd';
import {connect} from 'react-redux';

import {
    setWebsiteTitle,
    setWebsiteType,
    setWebsiteLink,
    setEmbedCode
} from '../../../actions/bulletins';

const Websiteediting = (props) => {
    let title,link, embed_code;
    const onStateChange = (e) => {
        let tempObj = {
            id: props.id,
            str: e.target.value
        }
        switch(e.target.name) {
            case "title":
                title += e.target.value;
                props.setWebsiteTitle(tempObj);
                break
            case "link":
                link += e.target.value;
                props.setWebsiteLink(tempObj);
                break
            case "embed_code":
                embed_code += e.target.value;
                props.setEmbedCode(tempObj);
                break
        }
    }

    const onRadioChange = (e) => {
        props.setWebsiteType(e.target.value);
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
                    props.type === "Website"
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

const mapStateToProps = (state) => ({
    title: state.builletins.Website_Title,
    type: state.builletins.website_Type,
    link: state.builletins.website_Link
})

export default connect(mapStateToProps,{
    setWebsiteTitle,
    setWebsiteType,
    setWebsiteLink,
    setEmbedCode,
}) (Websiteediting)