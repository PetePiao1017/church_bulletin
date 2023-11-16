import React, {useState}  from "react";
import { Button,  Form, Input} from 'antd';
import { connect } from "react-redux";
import { PlusOutlined, } from "@ant-design/icons";

import {setSmallSectionData} from '../../../actions/bulletins';
import CustomUpload from "../../CustomUpload/CustomUpload";

const OrderOfServiceediting = (props) => {

    const [count, setCount] = useState([0,1])
    const [topic, setTopic] = useState(['','']);
    const [content, setContent] = useState(['', '']);
    let tempTopic = [];
    let tempContent= [];
    const onStateChange = (e, index) => {
        switch(e.target.name) {
            case "title":
                props.setSmallSectionData(props.id, "Order Of Service", "title", e.target.value);
                break
            case "topic_title":
                tempTopic = [...topic.slice(0,index), e.target.value, ...topic.slice(index+1)];
                setTopic(tempTopic)
                props.setSmallSectionData(props.id, "Order Of Service", "topic_title", tempTopic);
                break
            case "topic_content":
                tempContent = [...content.slice(0,index), e.target.value, ...content.slice(index+1)];
                setContent(tempContent)
                props.setSmallSectionData(props.id, "Order Of Service", "topic_content", tempContent);
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
                                    <Input.TextArea 
                                        name="topic_content" value={props.orderofservice_TOpic_Content} onChange={(e) => onStateChange(e, item)} rows = {4} />
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


export default connect(null, {setSmallSectionData })(OrderOfServiceediting)
