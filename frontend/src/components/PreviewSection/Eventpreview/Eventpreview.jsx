import React from "react";
import { connect } from "react-redux";
import {Button, Row, Col} from 'antd'
import {CalendarFilled, EnvironmentOutlined} from '@ant-design/icons'

import { convertDate } from "../../../utils/convertDate";
import './Eventpreview.scss';

const Eventpreview = (props) => {
    return (
            <div className='scroll-bar' style={{margin:"0"}} >
                <h3 className='app-header' style={{marginTop:"0"}}>{props.title}</h3>
                <div className='app-image'>
                    <img src = {props.imageurl}  style={{width:"100%", height:"100%"}} alt = "Gallery Image" />
                </div>
                <br />
                <Row className="date">
                        <Col>
                            <CalendarFilled /> 
                        </Col>
                        <Col>
                            <div style={{fontSize:"8px"}}>{convertDate(props.date)}</div>
                            <div style={{fontSize:"8px"}}>{props.time_start} - {props.time_end}</div>
                        </Col>
                </Row>
                <Row className="location" gutter={16}>
                        <Col>
                            <EnvironmentOutlined /> 
                        </Col>
                        <Col>
                            <div style={{fontSize:"8px"}}>{props.location}</div>
                            <div style={{display: "none"}}>12:00 pm - 1:00 pm</div>
                        </Col>
                </Row>
                <div className="body-text">
                    {!props.bodyText ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : props.bodyText}
                </div>
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
                        {!props.btnText ? "Submit" : props.btnText}
                    </button>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.event_Title,
    date: state.builletins.event_Date,
    time_start: state.builletins.event_Time_Start,
    time_end: state.builletins.event_Time_End,
    location: state.builletins.event_Location,
    bodyText: state.builletins.event_bodyText,
    btnText: state.builletins.event_btnText,
    btnLink: state.builletins.event_btnLink,
    imageurl: state.builletins.event_imageurl
})

export default connect(mapStateToProps)(Eventpreview)