import React, {useState}  from "react";
import { Button,  Form, Input, Upload,message} from 'antd';
import { connect } from "react-redux";
import { PlusOutlined, } from "@ant-design/icons";

import {
    setOrderOfServiceTitle,
    setOrderOfServiceTopicContent,
    setOrderOfServiceTopicTitle
} from '../../../actions/bulletins';
import CustomUpload from "../../CustomUpload/CustomUpload";

const OrderOfServiceediting = (props) => {

    const [count, setCount] = useState(['a'])

    const onStateChange = (e) => {
        let tempObj = {
            id: props.id,
            str: e.target.value
        }
        switch(e.target.name) {
            case "title":
                props.setOrderOfServiceTitle(tempObj);
                break
            case "topic_title":
                props.setOrderOfServiceTopicTitle(tempObj);
                break
            case "topic_content":
                props.setOrderOfServiceTopicContent(tempObj);
                break
        }
    }

    return (
        <div style={{margin: "0 auto", width: "100%"}}>
            <h4 className="top-header">Edit Order of Service</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "BULLETIN TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={props.title}
                        placeholder="Order Of Service"
                        onChange={onStateChange}
                    />
                </Form.Item>
                <Form.Item label = "IMAGE">
                    <CustomUpload
                        type = "OrderofService"
                        />
                </Form.Item>
                {
                    count.map((item, index) => {
                        return(
                            <>
                                <p>SERVICE TOPIC 
                                    <span 
                                        style={{
                                            color:"#0D6EFD", 
                                            cursor: "pointer", 
                                            float: "right"
                                        }}
                                       
                                    >
                                        Delete
                                    </span>
                                </p>
                                <Input 
                                    type = "text" 
                                    placeholder="Service Topics 101"
                                    name="topic_title"
                                    value={props.orderofservice_Topic_Title}
                                    onChange={onStateChange}
                                    style={{marginBottom:"20px"}}
                                />
                                <Form.Item>
                                    <Input.TextArea name="topic_content" value={props.orderofservice_TOpic_Content} onChange={onStateChange} rows = {4} />
                                </Form.Item>
                            </>
                        )
                        })
                }
                
                <p 
                    style={{color:"#0D6EFD",cursor: "pointer"}}
                    onClick={() => setCount([...count, "a"])}
                >
                    <PlusOutlined />
                    Add more
                </p>
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
    title: state.builletins.orderofService_Title,
    topic_title: state.builletins.orderofService_Topic_Title,
    topic_content: state.builletins.orderofService_Topic_Content
})

export default connect(mapStateToProps, {
    setOrderOfServiceTitle,
    setOrderOfServiceTopicTitle,
    setOrderOfServiceTopicContent
})(OrderOfServiceediting)
