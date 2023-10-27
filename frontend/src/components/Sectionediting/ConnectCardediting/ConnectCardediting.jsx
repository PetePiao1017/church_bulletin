import React,{useState} from "react";
import { Button,  Form, Input, Upload,message, Checkbox} from 'antd';
import { PictureOutlined, UploadOutlined } from "@ant-design/icons";
import { connect } from 'react-redux';
import './ConnectCardediting.scss';

import {    
    setConnectCardTitle,
    setConnectCardBodyText,
    setConnectCardQuestionOne,
    setConnectCardQuestionTwo,
    setConnectCardQuestionOneOptionTwo,
    setConnectCardQuestionTwoOptionTwo,
    setConnectCardQuestionOneOptionOne,
    setConnectCardQuestionTwoOptionOne,
    setConnectCardCheckedValues
} from '../../../actions/bulletins';
import CustomUpload from "../../CustomUpload/CustomUpload";

const ConnectCardediting = (props) => {
 


    const onChange = (checkedValues) => {
        props.setConnectCardCheckedValues(checkedValues);
    }
    const onStateChange = (e) => {
        switch(e.target.name) {
            case "title":
                props.setConnectCardTitle(e.target.value);
                break
            case "bodyText":
                props.setConnectCardBodyText(e.target.value);
                break
            case "questionOne":
                props.setConnectCardQuestionOne(e.target.value);
                break
            case "question_one_option_one":
                props.setConnectCardQuestionOneOptionOne(e.target.value);
                break
            case "question_one_option_two":
                props.setConnectCardQuestionOneOptionTwo(e.target.value);
            case "questionTwo":
                props.setConnectCardQuestionTwo(e.target.value);
                break
            case "question_two_option_one":
                props.setConnectCardQuestionTwoOptionOne(e.target.value);
                break
            case "question_two_option_two":
                props.setConnectCardQuestionTwoOptionTwo(e.target.value);
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
                        placeholder="I made a question today"
                    />
                </Form.Item>
                <Form.Item label = "OPTIONS">
                    <Input
                        type = "text"
                        placeholder="To Follow Jesus"
                        name="question_one_option_one"
                        value={props.questionOneOptionOne}
                        onChange={onStateChange}
                        style={{marginBottom:"20px"}}
                        />
                    <Input
                        type = "text"
                        placeholder="To Redency my life to Jesus"
                        name="question_one_option_two"
                        onChange={onStateChange}
                        value={props.questionOneOptionTwo}
                        style={{marginBottom:"20px"}}
                        />
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
                        onChange={onStateChange}
                        name="question_two_option_one"
                        style={{marginBottom:"20px"}}
                        />
                    <Input
                        type = "text"
                        placeholder="Church/Website"
                        onChange={onStateChange}
                        name="question_two_option_two"
                        style={{marginBottom:"20px"}}
                        />
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
    setConnectCardQuestionOneOptionOne,
    setConnectCardQuestionOneOptionTwo,
    setConnectCardQuestionTwo,
    setConnectCardQuestionTwoOptionOne,
    setConnectCardQuestionTwoOptionTwo,
    setConnectCardCheckedValues,
})(ConnectCardediting)