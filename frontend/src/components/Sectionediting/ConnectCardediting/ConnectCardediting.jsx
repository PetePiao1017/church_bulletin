import React,{useState, useEffect} from "react";
import { Button,  Form, Input, Checkbox} from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import './ConnectCardediting.scss';

import {    setSmallSectionData, } from '../../../actions/bulletins';
import CustomUpload from "../../CustomUpload/CustomUpload";

const ConnectCardediting = (props) => {
 


    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [checkedValues, setCheckedValues] = useState([]);
    const [questionone, setQuestionone] = useState("");
    const [questiontwo, setQuestionTwo] = useState("");
    const [optionone_, setOptionone] = useState([]);
    const [optiontwo_, setOptiontwo] = useState([]);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let bodyText_index = props.todoList[index].data.findIndex(item => item.dataType === "bodyText");
            let image_index = props.todoList[index].data.findIndex(item => item.dataType === "imageUrl");
            let checkedvalues_index = props.todoList[index].data.findIndex(item => item.dataType === "checkedValues");
            let questionone_index = props.todoList[index].data.findIndex(item => item.dataType === "questionOne");
            let questiontwo_index = props.todoList[index].data.findIndex(item => item.dataType === "questionTwo");
            let optionone_index = props.todoList[index].data.findIndex(item => item.dataType === "option_one");
            let optiontwo_index = props.todoList[index].data.findIndex(item => item.dataType === "option_two");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(bodyText_index !== -1) setBodyText(props.todoList[index].data[bodyText_index].value);
            if(image_index !== -1) setImageUrl(props.todoList[index].data[image_index].value);
            if(checkedvalues_index !== -1) setCheckedValues(props.todoList[index].data[checkedvalues_index].value);
            if(questionone_index !== -1) setQuestionone(props.todoList[index].data[questionone_index].value);
            if(questiontwo_index !== -1) setQuestionTwo(props.todoList[index].data[questiontwo_index].value);
            if(optionone_index !== -1) setOptionone(props.todoList[index].data[optionone_index].value);
            if(optiontwo_index !== -1) setOptiontwo(props.todoList[index].data[optiontwo_index].value);
            

        }
    },[props.todoList]);


    const onChange = (checkedValues) => {
        props.setSmallSectionData(props.id, "Connect Card", "checkedValues", checkedValues);
    }

    const [firstoptions, setFirstoptions] = useState(['','']);
    const [secondoptions, setSecondoptions] = useState(['', '']);
    let optionone = [];
    let optiontwo = [];

    const onStateChange = (e) => {
        switch(e.target.name) {
            case "title":
                props.setSmallSectionData(props.id, "Connect Card", "title", e.target.value);
                break
            case "bodyText":
                props.setSmallSectionData(props.id, "Connect Card", "bodyText", e.target.value);
                break
            case "questionOne":
                props.setSmallSectionData(props.id, "Connect Card", "questionOne", e.target.value);
                break
            case "questionTwo":
                props.setSmallSectionData(props.id, "Connect Card", "questionTwo", e.target.value);
                break
        }
    }

    const onOptionChange = (e, index) => {
        switch(e.target.name){
            case "option_one":
                optionone = [
                    ...firstoptions.slice(0,index), 
                    e.target.value, 
                    ...firstoptions.slice(index+1)
                ];
                props.setSmallSectionData(props.id, "Connect Card", "option_one", optionone)
                setFirstoptions(optionone);
                break
            case "option_two":
                optiontwo = [...secondoptions.slice(0,index), e.target.value, ...secondoptions.slice(index+1)];
                props.setSmallSectionData(props.id, "Connect Card", "option_two", optiontwo)
                setSecondoptions(optiontwo);
                break
        }
    }

    return(
        <div className="announcment">
            <h4 className="top-header">Edit Connect Card</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={title}
                        onChange={onStateChange}
                        placeholder="Connect Card"
                    />
                </Form.Item>
                <Form.Item label = "IMAGE">
                    <CustomUpload
                        type = "Connect Card"
                        id = {props.id}
                        />
                </Form.Item>
                <Form.Item label = "BODY TEXT">
                    <Input.TextArea 
                        name = "bodyText"
                        value = {bodyText}
                        onChange={onStateChange}
                        rows = {4} />
                </Form.Item>

                <Form.Item label = "SELECT FIELDS TO INCLUDE">
                    <Checkbox.Group 
                        onChange={onChange} 
                        style = {{width: "100%"}}
                        defaultValue={['Name', 'Email']}
                        >
                        <div style = {{display:"grid"}}>
                            <Checkbox value = "Name">Name</Checkbox>
                            <Checkbox value = "Email">Email</Checkbox>
                            <Checkbox value = "Phonenumber">Phonenumber</Checkbox>
                            <Checkbox value = "Address">Address</Checkbox>
                        </div>
                    </Checkbox.Group>
                </Form.Item>
                <h5>Multiple Chocie Responses</h5>
                <Form.Item label = "QUESTION 1">
                    <Input
                        type = "text"
                        name = "questionOne"
                        value = {questionone}
                        onChange={onStateChange}
                        placeholder="I made a decision today"
                    />
                </Form.Item>
                <Form.Item label = "OPTIONS">
                    <Input
                        type = "text"
                        placeholder="To Follow Jesus"
                        name="option_one"
                        onChange={(e) => onOptionChange(e, 0)}
                        style={{marginBottom:"20px"}}
                    />
                    <Input
                        type = "text"
                        placeholder="To Redency my life to Jesus"
                        name="option_one"
                        onChange={(e) => onOptionChange(e, 1)}
                        style={{marginBottom:"20px"}}
                    />
                    {
                        firstoptions.map((item, index) => {
                            if(index >=2){
                                return (
                                    <Input
                                        key = {index}
                                        type = "text"  
                                        style={{marginBottom:"20px"}} 
                                        name = "option_one"
                                        onChange={(e) => onOptionChange(e, index)}
                                    />
                                )
                            }
                        })
                    }
                    <p 
                        style={{color:"#0D6EFD",cursor: "pointer"}}
                        onClick={() => setFirstoptions([...firstoptions, ''])}
                    >
                        <PlusOutlined />
                        Add more options
                    </p>
                </Form.Item>
                <Form.Item label = "QUESTION 2">
                    <Input
                        type = "text"
                        name = "questionTwo"
                        value={questiontwo}
                        onChange={onStateChange}
                        placeholder="How did you hear about us?"
                    />
                </Form.Item>
                <Form.Item label = "OPTIONS">
                <Input
                        type = "text"
                        placeholder="Friend/Family"
                        name="option_two"
                        value={props.questionOneOptionOne}
                        onChange={(e) => onOptionChange(e, 0)}
                        style={{marginBottom:"20px"}}
                    />
                    <Input
                        type = "text"
                        placeholder="Church Website"
                        name="option_two"
                        onChange={(e) => onOptionChange(e, 1)}
                        value={props.questionOneOptionTwo}
                        style={{marginBottom:"20px"}}
                    />
                    {
                        secondoptions.map((item, index) => {
                            if(index >=2){
                                return (
                                    <Input 
                                        key = {index}
                                        type = "text"  
                                        style={{marginBottom:"20px"}} 
                                        name = "option_two"
                                        onChange={(e) => onOptionChange(e, index)}
                                    />
                                )
                            }
                        })
                    }
                    <p 
                        style={{color:"#0D6EFD",cursor: "pointer"}}
                        onClick={() => setSecondoptions([...secondoptions, ''])}
                    >
                        <PlusOutlined />
                        Add more options
                    </p>
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

export default connect(mapStateToProps, {setSmallSectionData,})(ConnectCardediting)