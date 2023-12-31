import React, {useState}  from "react";
import { Button,  Form, Input, DatePicker, TimePicker} from 'antd';


import {setSmallSectionData } from '../../../actions/bulletins';
import { connect } from "react-redux";
import CustomUpload from "../../CustomUpload/CustomUpload";

const Eventediting = (props) => {
    let location, bodyText, btnText, btnLink;
    const format = 'HH:mm';

    const onStateChage = (e) => {
        switch(e.target.name) {
            case "title" :
                props.setSmallSectionData(props.id, "Event", "title", e.target.value);
                break
            case "location":
                location += e.target.value;
                props.setSmallSectionData(props.id, "Event", "location", e.target.value);
                break
            case "bodyText":
                bodyText += e.target.value;
                props.setSmallSectionData(props.id, "Event", "bodyText", e.target.value);
                break
            case "btnText":
                btnText += e.target.value;
                props.setSmallSectionData(props.id, "Event", "btnText", e.target.value);
                break
            case "btnLink":
                btnLink += e.target.value;
                props.setSmallSectionData(props.id, "Event", "btnLink", e.target.value);
        }
    }

    const onDateChage  = (date, dateString) => {
        props.setSmallSectionData(props.id, "Event", "date", dateString);
    }

    const onTimeStartChange = (time,timeString) => {
        let tempObj = {
            id: props.id,
            str: timeString
        }
        props.setSmallSectionData(props.id, "Event", "event_timestart", timeString);
    }

    const onTimeEndChange = (time, timeString) => {
        let tempObj = {
            id: props.id,
            str: timeString
        }
        props.setSmallSectionData(props.id, "Event", "event_timeend", timeString);
    }

    return (
        <div className="orderofservice">
            <h4 className="top-header">Edit Event</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "BULLETIN TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={props.title}
                        onChange={onStateChage}
                    />
                </Form.Item>
                <Form.Item label = "IMAGE">
                    <CustomUpload
                        type = "Event"
                        id = {props.id}
                        />
                </Form.Item>
               
                <Form.Item label = "DATE">
                    <DatePicker
                        onChange={onDateChage}
                        style={{width:"100%"}}
                    />
                </Form.Item>

                <p>TIME</p>
                    <div style={{display:"flex"}}>
                        <TimePicker 
                            onChange={onTimeStartChange}
                            format={format} 
                        /> -
                        <TimePicker 
                            onChange={onTimeEndChange}
                            format={format} 
                        /> 
                    </div>
                <br />
                <Form.Item label = "LOCATION">
                    <Input type = "text" name="location" value={location} onChange={onStateChage}  />
                </Form.Item>

                <Form.Item label = "BODY TEXT">
                    <Input.TextArea name="bodyText" value={bodyText} onChange={onStateChage} rows = {4} />
                </Form.Item>

                <Form.Item label = "BUTTON">
                    <Input  
                        type="text" 
                        placeholder="Button Text" 
                        name="btnText" 
                        value={btnText} 
                        onChange={onStateChage} 
                        style = {{marginBottom:"20px"}}/>
                    <Input  
                        type="text" 
                        placeholder="Button Link" 
                        name="btnLink" 
                        value={btnLink} 
                        onChange={onStateChage} />
                </Form.Item>
                
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

export default connect(null, {setSmallSectionData,})(Eventediting)
