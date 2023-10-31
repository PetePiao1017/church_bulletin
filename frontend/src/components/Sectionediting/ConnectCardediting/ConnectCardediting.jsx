import React,{useState} from "react";
import { Button,  Form, Input, Upload,message, Checkbox} from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import './ConnectCardediting.scss';

import {    
    setConnectCardTitle,
    setConnectCardBodyText,
    setConnectCardQuestionOne,
    setConnectCardQuestionTwo,
    setConnectCardOptionOne,
    setConnectCardOptionTwo,
    setConnectCardCheckedValues
} from '../../../actions/bulletins';
import CustomUpload from "../../CustomUpload/CustomUpload";

const ConnectCardediting = (props) => {
 


    const onChange = (checkedValues) => {
        let tempObj = {
            id : props.id,
            arr: checkedValues
        }
        props.setConnectCardCheckedValues(tempObj);
    }

    const [firstoptions, setFirstoptions] = useState(['','']);
    const [secondoptions, setSecondoptions] = useState(['', '']);
    let optionone = [];
    let optiontwo = [];

    const onStateChange = (e) => {
        let tempObj = {
            id: props.id,
            str: e.target.value
        }
        switch(e.target.name) {
            case "title":
                props.setConnectCardTitle(tempObj);
                break
            case "bodyText":
                props.setConnectCardBodyText(tempObj);
                break
            case "questionOne":
                props.setConnectCardQuestionOne(tempObj);
                break
            
            case "questionTwo":
                props.setConnectCardQuestionTwo(tempObj);
                break
        }
    }

    const onOptionChange = (e, index) => {
        let tempObj;
        switch(e.target.name){
            case "option_one":
                optionone = [
                    ...firstoptions.slice(0,index), 
                    e.target.value, 
                    ...firstoptions.slice(index+1)
                ];
                tempObj = {
                    id : props.id,
                    str: optionone,
                }
                props.setConnectCardOptionOne(tempObj);
                setFirstoptions(optionone);
                break
            case "option_two":
                optiontwo = [...secondoptions.slice(0,index), e.target.value, ...secondoptions.slice(index+1)];
                tempObj = {
                    id : props.id,
                    str: optiontwo,
                }
                props.setConnectCardOptionTwo(tempObj);
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
                        value={props.title}
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
                        value = {props.bodyText}
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
                        value = {props.questionOne}
                        onChange={onStateChange}
                        placeholder="I made a decision today"
                    />
                </Form.Item>
                <Form.Item label = "OPTIONS">
                    <Input
                        type = "text"
                        placeholder="To Follow Jesus"
                        name="option_one"
                        value={props.questionOneOptionOne}
                        onChange={(e) => onOptionChange(e, 0)}
                        style={{marginBottom:"20px"}}
                    />
                    <Input
                        type = "text"
                        placeholder="To Redency my life to Jesus"
                        name="option_one"
                        onChange={(e) => onOptionChange(e, 1)}
                        value={props.questionOneOptionTwo}
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
                        value={props.questionTwo}
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
    title: state.builletins.connectCard_Title,
    bodyText: state.builletins.connectCard_bodyText,
    questionOne: state.builletins.connectCard_Question_One,
    questionOneOptionOne: state.builletins.connectCard_Question_One_Option_One,
    questionOneOptionTwo: state.builletins.connectCard_Question_One_Option_Two,
    questionTwo: state.builletins.connectCard_Question_Two,
    questionTwoOptionOne: state.builletins.connectCard_Question_Two_Option_One,
    questionTwoOptionTwo: state.builletins.connectCard_Question_Two_Option_Two,
})

export default connect(mapStateToProps, {
    setConnectCardTitle,
    setConnectCardBodyText,
    setConnectCardQuestionOne,
    setConnectCardOptionOne,
    setConnectCardQuestionTwo,
    setConnectCardOptionTwo,
    setConnectCardCheckedValues,
})(ConnectCardediting)