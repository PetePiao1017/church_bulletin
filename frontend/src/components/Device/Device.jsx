import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import "./Device.scss"
import { DeleteFilled, RightOutlined } from "@ant-design/icons";
import {Text} from '../../components';
import { Button, Row, Col, Space, Radio } from "antd";
import { convertDate } from "../../utils/convertDate";

import {deleteBulletin, sendSMS} from '../../actions/bulletins'


const Device = (props) => {

    return(
       <>
        {
            props.data !== undefined 
            ? 
            <div 
                className='device-component'
                onClick={() => props.editBulleteinCallback(props.data._id)}
            >
                <div className="indicator">
                    <div className={props.active ? "circle-active" : "circle"} />
                    {
                       !props.active ? <h5 className="due-date">{`Active in ${props.dateDifference} days`}</h5>
                       : <h5 className="due-date">Active</h5>
                    }
                </div>
                <div className='border-screen-extra'>
                    <div className='tool-right' />
                    <div className='tool-up' />
                    <div className='tool-down' />
                    <div className='border-screen'>
                        <div className='device__screen' style={{background: props.bulletins.background}}>
                            <div className="scroll-bar">
                                <h4 className="title" style={{color: props.bulletins.heading_text}}>{props.data.header_title}</h4>
                                <p className="date">{convertDate(props.data.header_date)}</p>
                                {
                                    props.data.header_imageurl ? 
                                    <div className="header-image">
                                        <img src = {props.data.header_imageurl} />
                                    </div>
                                    : ""
                                }
                                {
                                    props.data.todoList ? props.data.todoList.map((item, index) => {
                                        if(item.type !== "Add Section"){
                                            let index = item.data.findIndex(element => element.dataType === "title");
                                            if(index === -1){
                                                return (
                                                <div 
                                                    key = {index} 
                                                    className="category"
                                                    style={{
                                                        backgroundColor: props.bulletins.section_backgorund
                                                    }}
                                                >
                                                    <p className="title" style={{color: props.bulletins.title_text}}>{item.type}</p>
                                                    <RightOutlined  style={{width:"8px"}}/>
                                                </div>)
                                            }
                                            else return(
                                                <div className="category" key = {index} style={{background: props.bulletins.section_background}}>
                                                    <p className="title">{item.data[index].value}</p>
                                                    <RightOutlined  style={{width:"8px"}}/>
                                                </div>
                                            )
                                        }
                                        else{
                                            return(
                                                <div className="section-list" key = {index}>
                                                    {
                                                        item.data.map((element, subIndex) => {
                                                            switch(element.type){
                                                                case "edit":
                                                                    return <Text key = {subIndex} value = {element.value} />
                                                                case "cursor":
                                                                    return <div className="btn-txt">
                                                                                <Button type = "primary" >{element.value}</Button>
                                                                            </div>
                                                                case "gallery":
                                                                    return <div className="image-upload"> 
                                                                        <img src = {element.value}  style={{width:"100px"}}/>
                                                                    </div>
                                                                case "attach":
                                                                    return <p style={{cursor: "pointer", textAlign: "center"}}>{element.value}</p>
                                                                case "event":
                                                                    return <Row className="event">
                                                                        <Col span = {8} className = "calendar">
                                                                            <div className="month">{element.value.month}</div>
                                                                            <div className="date">{element.value.date}</div>
                                                                        </Col>
                                                                        <Col span = {16} className = "event-detail">
                                                                            <h3 className="title">{element.value.title}</h3>
                                                                            <p className="detail">{element.value.detail}</p>
                                                                            <Space className="question">
                                                                                <h5>Are you going?</h5>
                                                                                <Space>
                                                                                    <p style={{color: "red", fontSize:"12px"}}>Yes</p>
                                                                                    <p style={{color: "red", fontSize:"12px"}}>No</p>
                                                                                    <p style={{color: "red", fontSize:"12px"}}>Maybe</p>
                                                                                </Space>
                                                                            </Space>
                                                                        </Col>
                                                                    </Row>
                                                                case "video":
                                                                    return <div 
                                                                                className="video" 
                                                                                style={{
                                                                                    width: "100%", 
                                                                                    height: "60px", 
                                                                                    background:"#ffdde1",
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center",
                                                                                }}
                                                                            >
                                                                                <p style={{
                                                                                    background: "white", 
                                                                                    padding: "3px",
                                                                                    borderRadius:"6px",
                                                                                }}>
                                                                                    {element.value}
                                                                                </p>
                                                                            </div>
                                                                case "checked":
                                                                    return <div className="checked">
                                                                                <h4>{element.value.title}</h4>
                                                                                <Radio.Group>
                                                                                    <Space 
                                                                                        align = "start" 
                                                                                        direction ="vertical" 
                                                                                        className="radio-group"
                                                                                    >
                                                                                        <Radio value="apple" className="one-survey">
                                                                                            <input 
                                                                                                type = "text" 
                                                                                                name = "answer1"
                                                                                                placeholder="Just a few"
                                                                                                className="answer-text"
                                                                                                value = {element.value.answer1}
                                                                                            />
                                                                                        </Radio>
                                                                                        <Radio value = "apple1" className="one-survey">
                                                                                            <input 
                                                                                                type = "text"
                                                                                                name = "answer2"
                                                                                                placeholder="Too many to bother trying"
                                                                                                className="answer-text"
                                                                                                value = {element.value.answer2}
                                                                                            />
                                                                                        </Radio>
                                                                                        <Radio value = "apple2" className="one-survey">
                                                                                            <input 
                                                                                                type = "text"
                                                                                                name = "answer3"
                                                                                                placeholder="I always bite it before I find out"
                                                                                                className="answer-text"
                                                                                                value = {element.value.answer3}
                                                                                            />
                                                                                        </Radio>
                                                                                    </Space>
                                                                            </Radio.Group>
                                                                        </div>
                                                                case "quote":
                                                                    return <div className="quote">
                                                                            <h4 className="content">{element.value.content}</h4>
                                                                            <h4 className="writer">{element.value.text}</h4>
                                                                        </div>
                                                            }
                                                        })
                                                    }
                                                </div>
                                            )
                                        }
                                    })
                                    :""
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="delete-btn">
                    <DeleteFilled 
                        onClick={(e) =>{
                            e.stopPropagation();
                            props.deleteBulletin(props.data._id);
                        }}
                    />
                </div>
            </div>
            : ""
        }
       </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    bulletins: state.builletins
})

export default connect(mapStateToProps, {deleteBulletin, sendSMS})(Device);

