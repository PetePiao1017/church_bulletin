import React from "react";
import {Button, Row, Col} from 'antd'
import {CalendarOutlined, EnvironmentOutlined} from '@ant-design/icons'
import './Eventpreview.scss';

const Eventpreview = () => {
    return (
            <div className='scroll-bar' style={{margin:"0"}} >
                <h3 className='app-header'>Event</h3>
                <div className='app-image'>
                    <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
                </div>
                <div className="date">
                    <Row gutter={16}>
                        <Col>
                            <CalendarOutlined /> 
                        </Col>
                        <Col>
                            <div>Date</div>
                            <div>12:00 pm - 1:00 pm</div>
                        </Col>
                    </Row>
                </div>
                <div className="location">
                    <Row gutter={16}>
                        <Col>
                            <EnvironmentOutlined /> 
                        </Col>
                        <Col>
                            <div>location</div>
                            <div style={{display: "none"}}>12:00 pm - 1:00 pm</div>
                        </Col>
                    </Row>
                </div>
                <div className="body-text">
                   <p> Type into the Body Text field on the left for your text to show up here.</p>
                </div>
                <div className="btn-link">   
                    <Button type="primary">Button Text</Button>
                </div>
            </div>
    )
}

export default Eventpreview