import React from "react";
import { connect } from "react-redux";
import { Row, Col} from 'antd'
import {CalendarFilled, EnvironmentOutlined} from '@ant-design/icons'

import { convertDate } from "../../../utils/convertDate";
import './Eventpreview.scss';

const Eventpreview = (props) => {
    let title = props.title.filter((item) => item.id === props.id);
    let date = props.date.filter((item) => item.id === props.id);
    let time_start = props.time_start.filter(item => item.id === props.id);
    let time_end = props.time_end.filter(item => item.id === props.id);
    let location = props.location.filter(item => item.id === props.id);
    let bodyText = props.bodyText.filter(item => item.id === props.id);
    let btnText = props.btnText.filter(item => item.id === props.id);
    let imageurl = props.imageurl.filter(item => item.id === props.id);
    return (
            <div className='scroll-bar' style={{margin:"0"}} >
                <h3 className='app-header' style={{marginTop:"0"}}>
                    {title.length === 0 ? "Event" : title[0].str}
                </h3>
                <div className='app-image'>
                {
                    imageurl.length === 0
                    ? <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
                    : <img src = {imageurl[0].str} alt = "preview" style = {{width : "100%", height:"100%"}} />
                }
                </div>
                <br />
                <Row className="date">
                        <Col>
                            <CalendarFilled /> 
                        </Col>
                        <Col>
                            <div style={{fontSize:"8px"}}>
                                {date.length === 0 ? "" : 
                                (date[0].str)}
                            </div>
                            <div style={{fontSize:"8px"}}>
                                {time_start.length === 0 ? "" : time_start[0].str} - 
                                {time_end.length === 0 ? "" : time_end[0].str}
                            </div>
                        </Col>
                </Row>
                <Row className="location" gutter={16}>
                        <Col>
                            <EnvironmentOutlined /> 
                        </Col>
                        <Col>
                            <div style={{fontSize:"8px"}}>{location.length === 0 ? "" : location[0].str}</div>
                            <div style={{display: "none"}}>12:00 pm - 1:00 pm</div>
                        </Col>
                </Row>
                <div className="body-text">
                    {bodyText.length === 0 ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText[0].str}
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
                        {btnText.length === 0 ? "Submit" : btnText[0].str}
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