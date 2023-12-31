import React, {useEffect, useState} from "react";
import {Row, Col, Dropdown, Space} from 'antd';
import { DeleteFilled } from "@ant-design/icons";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './EventSection.scss';


const EventSection = (props) => {

    
    const [value, onChange] = useState(new Date());
    const [date, setDate] = useState(0);
    const [month, setMonth] = useState("");
    const [visible, setVisible] = useState(true);
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");

    useEffect(() => {
        const value = new Date();
        setDate(value.getDate());
        setMonth(value.toLocaleString("default", {month: 'long'}));
    },[])

    const onTextChange = (e) => {
        if(e.target.name === "title") setTitle(e.target.value);
        if(e.target.name === "detail") setDetail(e.target.value);
    }

    useEffect(() => {
        props.eventEditerCallback(props.id, title, detail, date, month)
    },[title, detail,date,month])

    useEffect(() => {
        if(value !== new Date()){
            setDate(value.getDate());
            setMonth(value.toLocaleString('default', { month: 'long' }));
        }
    },[value]);

    useEffect(() => {
        if(props.value){
            if(props.value.month) setMonth(props.value.month);
            if(props.value.date) setDate(props.value.date);
            if(props.value.title) setTitle(props.value.title);
            if(props.value.detail) setDetail(props.value.detail);
        }
    },[props.value])

    const items = [
        {
            key: '1',
            label: (
                <Calendar 
                    onChange={onChange} 
                    value={value}
                />
            )
        }
    ];

    return(
        <Row 
            className="event-container"
            gutter={16}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            style={{
                border: !visible ? "none": "1px solid #57b0fb"
            }}
        >
            <Col span = {4} className="calendar">
                <Dropdown 
                    menu = {{items}} 
                    trigger={['click']}
                    placement="top" 
                    arrow={{ pointAtCenter: true }}
                >
                    <div>
                        <h5 className="month">{month}</h5>
                        <div className="day"> {date}</div>
                    </div>
                </Dropdown>
            </Col>
            <Col 
                span = {20}
                className="event-include"
            >   
                <div>
                    <input 
                        className="event-title" 
                        type = "text"
                        placeholder="Event Title"
                        name = "title"
                        onChange={(e) => onTextChange(e)}
                        value = {title}
                    />
                </div>
                <div>
                    <input 
                        className="event-detail" 
                        type = "text"
                        placeholder="Put any other details here... time, location, etc"
                        name = "detail"
                        onChange={(e) => onTextChange(e)}
                        value = {detail}
                    />
                </div>
                <div className="event-description">
                    {
                        visible ? 
                        <p className="description">
                            Enter the event details above. Click the calendar to adjust the date. Recipients will be able to RSVP here with one click from their email.
                        </p>
                        :
                        <Space className="question">
                            <h3>Are you going?</h3>
                            <Space>
                                <h3 style={{color: "red"}}>Yes</h3>
                                <h3 style={{color: "red"}}>No</h3>
                                <h3 style={{color: "red"}}>Maybe</h3>
                            </Space>
                        </Space>
                    }
                    
                </div>
            </Col>
            {
                visible ?
                <div style={{display: "inline"}}>
                    <DeleteFilled 
                        className="delete-icon-event" 
                        onClick={() => props.deleteItemCallback(props.id)}
                    />
                </div>
                :""
            }
            
        </Row>
    )
}

export default EventSection