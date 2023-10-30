import React, {useState}  from "react";
import { Button,  Form, Input, DatePicker, TimePicker} from 'antd';


import {
    setEventTitle,
    setEventDate,
    setEventTimeStart,
    setEventTimeEnd,
    setEventLocation,
    setEventBodyText,
    setEventBtnText,
    setEventBtnLink,
} from '../../../actions/bulletins';
import { connect } from "react-redux";
import CustomUpload from "../../CustomUpload/CustomUpload";

const Eventediting = (props) => {
    let location, bodyText, btnText, btnLink;
    const format = 'HH:mm';

    const onStateChage = (e) => {
        let tempObj = {
            id: props.id,
            str: e.target.value
        }
        switch(e.target.name) {
            case "title" :
                props.setEventTitle(tempObj);
                break
            case "location":
                location += e.target.value;
                props.setEventLocation(tempObj);
                break
            case "bodyText":
                bodyText += e.target.value;
                props.setEventBodyText(tempObj);
                break
            case "btnText":
                btnText += e.target.value;
                props.setEventBtnText(tempObj);
                break
            case "btnLink":
                btnLink += e.target.value;
                props.setEventBtnLink(tempObj);
        }
    }

    const onDateChage  = (date, dateString) => {
        let tempObj = {
            id: props.id,
            str: dateString
        }
        props.setEventDate(tempObj);
    }

    const onTimeStartChange = (time,timeString) => {
        let tempObj = {
            id: props.id,
            str: timeString
        }
        props.setEventTimeStart(tempObj);
    }

    const onTimeEndChange = (time, timeString) => {
        let tempObj = {
            id: props.id,
            str: timeString
        }
        props.setEventTimeEnd(tempObj);
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



export default connect(null, {
    setEventTitle,
    setEventDate,
    setEventTimeStart,
    setEventTimeEnd,
    setEventLocation,
    setEventBodyText,
    setEventBtnText,
    setEventBtnLink,
})(Eventediting)
