import React, {useState}  from "react";
// import type { DatePickerProps } from 'antd';
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

    const format = 'HH:mm';

    const onStateChage = (e) => {
        console.log("=======", e.target.texts);
        switch(e.target.name) {
            case "title" :
                props.setEventTitle(e.target.value);
                break
            case "date" :
                props.setEventDate(e.target.value);
                break
            case "time_start" :
                props.setEventTimeStart(e.target.value);
                break
            case "time_end":
                props.setEvnetTimeEnd(e.target.value);
                break
            case "location":
                props.setEventLocation(e.target.value);
                break
            case "bodyText":
                props.setEventBodyText(e.target.value);
                break
            case "btnText":
                props.setEventBtnText(e.target.value);
                break
            case "btnLink":
                props.setEventBtnLink(e.target.value);
        }
    }

    const onDateChage  = (date, dateString) => {
        props.setEventDate(dateString);
    }

    const onTimeStartChange = (time,timeString) => {
        props.setEventTimeStart(timeString);
    }

    const onTimeEndChange = (time, timeString) => {
        props.setEventTimeEnd(timeString);
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
                        />
                </Form.Item>
               
                <Form.Item label = "DATE">
                    <DatePicker
                        // texts={{name: "date"}}
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
                    <Input.TextArea name="location" value={props.location} onChange={onStateChage} rows = {2} />
                </Form.Item>

                <Form.Item label = "BODY TEXT">
                    <Input.TextArea name="bodyText" value={props.bodyText} onChange={onStateChage} rows = {4} />
                </Form.Item>

                <Form.Item label = "BUTTON">
                    <Input  type="text" placeholder="Button Text" name="btnText" value={props.btnText} onChange={onStateChage} style = {{marginBottom:"20px"}}/>
                    <Input  type="text" placeholder="Button Link" name="btnLink" value={props.btnLink} onChange={onStateChage} />
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

const mapStateToProps = (state) => ({
    title: state.builletins.Event_Title,
    date: state.builletins.event_Date,
    time_start: state.builletins.event_Time_Start,
    time_end: state.builletins.event_Time_End,
    location: state.builletins.event_Location,
    bodyText: state.builletins.event_bodyText,
    btnText: state.builletins.event_btnText,
    btnLink: state.builletins.event_btnLink,
})

export default connect(mapStateToProps, {
    setEventTitle,
    setEventDate,
    setEventTimeStart,
    setEventTimeEnd,
    setEventLocation,
    setEventBodyText,
    setEventBtnText,
    setEventBtnLink,
})(Eventediting)
