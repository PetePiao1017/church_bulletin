import React, {useEffect, useState} from "react";
import "./Survey.scss";
import {Radio, Space} from "antd";
import { DeleteFilled, DragOutlined } from "@ant-design/icons";


const Survey = (props) => {
    const [visible, setVisible] = useState(false);

    const [title, setTitle] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");


    const onChange = (e) => {
        if(e.target.name === "title") setTitle(e.target.value);
        if(e.target.name === "answer1") setAnswer1(e.target.value);
        if(e.target.name === "answer2") setAnswer2(e.target.value);
        if(e.target.name === "answer3") setAnswer3(e.target.value);
    }

    useEffect(() => {
        props.surveyEditerCallback(props.id, title, answer1, answer2, answer3);
    },[title, answer1, answer2, answer3])

    useEffect(() => {
        if(props.value){
            if(props.value.title) setTitle(props.value.title);
            if(props.value.answer1) setAnswer1(props.value.answer1);
            if(props.value.answer2) setAnswer2(props.value.answer2);
            if(props.value.answer3) setAnswer3(props.value.answer3);
        }
    },[props.value])
    return (
        <div 
            className="survey-container"
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            style={{
                border: !visible ? "none": "1px solid #57b0fb"
                
            }}
        >
            <div className="survey">
                <input 
                    type="text"
                    name = "title"
                    placeholder="Who is first?" 
                    className="title"
                    onChange={onChange}
                    value={title}
                />
                <div className="answer">
                    <Radio.Group>
                        <Space 
                            align = "start" 
                            direction ="vertical" 
                            className="radio-group"
                        >
                            <Radio value="apple" className="one-survey">
                                <input 
                                    type = "text" 
                                    name = "answer1"
                                    placeholder="Just a few"
                                    className="answer-text"
                                    onChange={onChange}
                                    value={answer1}
                                />
                            </Radio>
                            <Radio value = "apple1" className="one-survey">
                                <input 
                                    type = "text"
                                    name = "answer2"
                                    placeholder="Too many to bother trying"
                                    className="answer-text"
                                    onChange={onChange}
                                    value={answer2}
                                />
                            </Radio>
                            <Radio value = "apple2" className="one-survey">
                                <input 
                                    type = "text"
                                    name = "answer3"
                                    placeholder="I always bite it before I find out"
                                    className="answer-text"
                                    onChange={onChange}
                                    value={answer3}
                                />
                            </Radio>
                        </Space>
                    </Radio.Group>
                </div>
            </div>
            {visible ?
                <div style={{display: "inline"}}>
                    <DeleteFilled 
                        className="delete-icon" 
                        onClick={() => props.deleteItemCallback(props.id)}
                    />
                </div>
            : ""}
        </div>
    )
}

export default Survey;