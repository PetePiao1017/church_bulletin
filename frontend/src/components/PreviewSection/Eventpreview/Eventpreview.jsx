import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col} from 'antd'
import {CalendarFilled, EnvironmentOutlined} from '@ant-design/icons'

import './Eventpreview.scss';

const Eventpreview = (props) => {

    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [location, setLocation] = useState("");
    const [btnText, setBtnText] = useState("");
    const [date, setDate] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let bodyText_index = props.todoList[index].data.findIndex(item => item.dataType === "bodyText");
            let image_index = props.todoList[index].data.findIndex(item => item.dataType === "imageUrl");
            let btnText_index = props.todoList[index].data.findIndex(item => item.dataType === "btnText");
            let date_index = props.todoList[index].data.findIndex(item => item.dataType === "date");
            let timeStart_index = props.todoList[index].data.findIndex(item => item.dataType === "event_timestart");
            let timeEnd_index = props.todoList[index].data.findIndex(item => item.dataType === "event_timeend");
            let location_index = props.todoList[index].data.findIndex(item => item.dataType === "location");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(bodyText_index !== -1) setBodyText(props.todoList[index].data[bodyText_index].value);
            if(image_index !== -1) setImageUrl(props.todoList[index].data[image_index].value);
            if(btnText_index !== -1) setBtnText(props.todoList[index].data[btnText_index].value);
            if(date_index !== -1) setDate(props.todoList[index].data[date_index].value);
            if(timeStart_index !== -1) setTimeStart(props.todoList[index].data[timeStart_index].value);
            if(timeEnd_index !== -1) setTimeEnd(props.todoList[index].data[timeEnd_index].value);
            if(location_index !== -1) setLocation(props.todoList[index].data[location_index].value);
            

        }
    },[props.todoList]);
    return (
            <div className='scroll-bar'>
                <br />
                <br />
                <br />
                <h3 className='app-header'>
                    {title === "" ? "Event" : title}
                </h3>
                <div className='app-image'>
                {
                    imageUrl === ""
                    ? <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
                    : <img src = {imageUrl} alt = "preview" style = {{width : "100%", height:"100%"}} />
                }
                </div>
                <br />
                <Row className="dateContainer">
                    <Row className="date">
                            <Col className="date-icon">
                                <CalendarFilled /> 
                            </Col>
                            <Col className="date-content">
                                <div style={{fontSize:"8px"}}>
                                    {date}
                                </div>
                                <div style={{fontSize:"8px"}}>
                                    {timeStart} - 
                                    {timeEnd}
                                </div>
                            </Col>
                    </Row>
                    <Row className="location">
                            <Col className="location-icon">
                                <EnvironmentOutlined /> 
                            </Col>
                            <Col className="location-content">
                                <div style={{fontSize:"8px"}}>{location}</div>
                            </Col>
                    </Row>
                </Row>
                <div className="body-text">
                    {bodyText=== "" ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText}
                </div>
                <br />
                <br />
                <div className="btn-link">
                    <button 
                        type="button" 
                        style={{
                            backgroundColor: "rgb(23, 25, 35)",
                            color:"white",
                            padding:"8px",
                            borderRadius:"6px"
                        }}
                    >
                        {btnText === "" ? "Submit" : btnText}
                    </button>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList
})

export default connect(mapStateToProps)(Eventpreview)