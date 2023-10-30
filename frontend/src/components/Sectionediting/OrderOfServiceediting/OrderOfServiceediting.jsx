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

    const [count, setCount] = useState([0,1])
    const [topic, setTopic] = useState(['','']);
    const [content, setContent] = useState(['', '']);
    let tempTopic = [];
    let tempContent= [];
    console.log(content)
    const onStateChange = (e, index) => {
        let tempObj = {
            id: props.id,
            str: e.target.value
        }
        switch(e.target.name) {
            case "title":
                props.setOrderOfServiceTitle(tempObj);
                break
            case "topic_title":
                tempTopic = [...topic.slice(0,index), e.target.value, ...topic.slice(index+1)];
                tempObj = {
                    id: props.id,
                    str: tempTopic
                }
                setTopic(tempTopic)
                props.setOrderOfServiceTopicTitle(tempObj);
                break
            case "topic_content":
                tempContent = [...content.slice(0,index), e.target.value, ...content.slice(index+1)];
                tempObj = {
                    id: props.id,
                    str: tempContent
                }
                setContent(tempContent)
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
                        id = {props.id}
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
                                        onClick={() => {
                                           setCount(count.filter(element => element !== item))
                                           setTopic([...topic.slice(0,index), ...topic.slice(index+1)])
                                        }}
                                    >
                                        Delete
                                    </span>
                                </p>
                                {
                                    index === 1 ? 
                                    <Input 
                                        type = "text" 
                                        placeholder = "Keep Everyone in loop"
                                        name="topic_title"
                                        value={props.orderofservice_Topic_Title}
                                        onChange={(e) => onStateChange(e, item)}
                                        style={{marginBottom:"20px"}}
                                    />
                                    :
                                    <Input 
                                        type = "text" 
                                        placeholder = {index === 0 ? "Service Topics 101" : ""}
                                        name="topic_title"
                                        value={props.orderofservice_Topic_Title}
                                        onChange={(e) => onStateChange(e, item)}
                                        style={{marginBottom:"20px"}}
                                    />
                                }
                                <Form.Item>
                                    <Input.TextArea name="topic_content" value={props.orderofservice_TOpic_Content} onChange={(e) => onStateChange(e, item)} rows = {4} />
                                </Form.Item>
                            </>
                        )
                        })
                }
                
                <p 
                    style={{color:"#0D6EFD",cursor: "pointer"}}
                    onClick={() => {
                        let last_index = count.at(-1);
                        setCount([...count, last_index + 1]);
                        setTopic([...topic,'']);
                        setContent([...content, '']);
                    }}
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
