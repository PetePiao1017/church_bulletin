import React, {useState} from 'react';
import {Row, Col, Card} from 'antd';
import ReactCardFlip from "react-card-flip";
import { Announcement, ConnectCard, Event, OnlineGiving, OrderOfService, PrayerRequest, Video, Website } from '../../components/SVG';

const Addsection = (props) => {
    const [flip, setFlip] = useState('');

    const onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }
    const onclick = (ev, id) => {
        props.getValueCallback(id)
        setFlip(id)
    }
    return(
    <Col span = {20} className='add-section'>
        <h3>Add a section</h3>
        <p className='subtitle'>Drag any section below into the phone on the right.</p>
        <Row gutter={16}>
            <Col span = {1} />
            <Col span={11}>
                <ReactCardFlip 
                    isFlipped={flip === "Announcement"} 
                    flipDirection="vertical"
                >
                    <Card 
                        className='draggable' 
                        draggable 
                        onClick={(e) => {
                            onclick(e, "Announcement")
                            setTimeout(() => {
                                setFlip('')
                            }, 1000)
                        }} 
                        onDragStart={(e) => onDragStart(e, "Announcement")} 
                        size={"small"}
                    >
                        <Announcement />
                        <p className='category'>Announcement</p>
                    </Card>
                    <Card>
                        <img src = "./check_icon.png" style={{width:"40px"}} />
                        <p className='category'>Added</p>
                    </Card>
                </ReactCardFlip>
            </Col>
            <Col span={11}>
                <ReactCardFlip 
                    isFlipped={flip === "Order Of Service"} 
                    flipDirection="vertical"
                >
                    <Card 
                        className='draggable' 
                        draggable 
                        onClick={(e) => {
                            onclick(e, "Order Of Service")
                            setTimeout(() => {
                                setFlip('')
                            }, 1000)
                        }} 
                        onDragStart={(e) => onDragStart(e, "Order Of Service")} 
                        size={"small"}
                    >
                        <OrderOfService />
                        <p className='category'>Order Of Service</p>
                    </Card>
                    <Card>
                        <img src = "./check_icon.png" style={{width:"40px"}} />
                        <p className='category'>Added</p>
                    </Card>
                </ReactCardFlip>
            </Col>
            <Col span = {1} />
        </Row>
        <br />
        <Row gutter={16}>
            <Col span = {1} />
            <Col span={11}>
                <ReactCardFlip 
                    isFlipped={flip === "Event"} 
                    flipDirection="vertical"
                >
                    <Card 
                        className='draggable' 
                        draggable 
                        onClick={(e) => {
                            onclick(e, "Event")
                            setTimeout(() => {
                                setFlip('')
                            }, 1000)
                        }} 
                        onDragStart={(e) => onDragStart(e, "Event")} 
                        size={"small"}
                    >
                        <Event />
                        <p className='category'>Event</p>
                    </Card>
                    <Card>
                        <img src = "./check_icon.png" style={{width:"40px"}} />
                        <p className='category'>Added</p>
                    </Card>
                </ReactCardFlip>
            </Col>
            <Col span={11}>
                <ReactCardFlip 
                    isFlipped={flip === "Connect Card"} 
                    flipDirection="vertical"
                >
                    <Card 
                        className='draggable' 
                        draggable 
                        onClick={(e) => {
                            onclick(e, "Connect Card")
                            setTimeout(() => {
                                setFlip('')
                            }, 1000)
                        }} 
                        onDragStart={(e) => onDragStart(e, "Connect Card")} 
                        size={"small"}
                    >
                        <ConnectCard />
                        <p className='category'>Connect Card</p>
                    </Card>
                    <Card>
                        <img src = "./check_icon.png" style={{width:"40px"}} />
                        <p className='category'>Added</p>
                    </Card>
                </ReactCardFlip>
            </Col>
            <Col span = {1} />
        </Row>
        <br />
        <Row gutter={16}>
            <Col span = {1} />
            <Col span={11}>
                <ReactCardFlip 
                    isFlipped={flip === "Prayer Request"} 
                    flipDirection="vertical"
                >
                    <Card 
                        className='draggable' 
                        draggable 
                        onClick={(e) => {
                            onclick(e, "Prayer Request")
                            setTimeout(() => {
                                setFlip('')
                            }, 1000)
                        }} 
                        onDragStart={(e) => onDragStart(e, "Prayer Request")} 
                        size={"small"}
                    >
                        <PrayerRequest />
                        <p className='category'>Prayer Request</p>
                    </Card>
                    <Card>
                        <img src = "./check_icon.png" style={{width:"40px"}} />
                        <p className='category'>Added</p>
                    </Card>
                </ReactCardFlip>
            </Col>
            <Col span={11}>
                <ReactCardFlip 
                    isFlipped={flip === "Online Giving"} 
                    flipDirection="vertical"
                >
                    <Card 
                        className='draggable' 
                        draggable 
                        onClick={(e) => {
                            onclick(e, "Online Giving")
                            setTimeout(() => {
                                setFlip('')
                            }, 1000)
                        }} 
                        onDragStart={(e) => onDragStart(e, "Online Giving")} 
                        size={"small"}
                    >
                        <OnlineGiving />
                        <p className='category'>Online Giving</p>
                    </Card>
                    <Card>
                        <img src = "./check_icon.png" style={{width:"40px"}} />
                        <p className='category'>Added</p>
                    </Card>
                </ReactCardFlip>
            </Col>
            <Col span = {1} />
        </Row>
        <br />
        <Row gutter={16}>
            <Col span = {1} />
            <Col span={11}>
                <ReactCardFlip 
                    isFlipped={flip === "Website"} 
                    flipDirection="vertical"
                >
                    <Card 
                        className='draggable' 
                        draggable 
                        onClick={(e) => {
                            onclick(e, "Website")
                            setTimeout(() => {
                                setFlip('')
                            }, 1000)
                        }} 
                        onDragStart={(e) => onDragStart(e, "Website")} 
                        size={"small"}
                    >
                        <Website />
                        <p className='category'>Website</p>
                    </Card>
                    <Card>
                        <img src = "./check_icon.png" style={{width:"40px"}} />
                        <p className='category'>Added</p>
                    </Card>
                </ReactCardFlip>
            </Col>
            <Col span={11}>
                <ReactCardFlip 
                    isFlipped={flip === "Video"} 
                    flipDirection="vertical"
                >
                    <Card 
                        className='draggable' 
                        draggable 
                        onClick={(e) => {
                            onclick(e, "Video")
                            setTimeout(() => {
                                setFlip('')
                            }, 1000)
                        }} 
                        onDragStart={(e) => onDragStart(e, "Video")} 
                        size={"small"}
                    >
                        <Video />
                        <p className='category'>Video</p>
                    </Card>
                    <Card>
                        <img src = "./check_icon.png" style={{width:"40px"}} />
                        <p className='category'>Added</p>
                    </Card>
                </ReactCardFlip>
            </Col>
            <Col span = {1} />
        </Row>
        <br />
    </Col>
    )
}

export default Addsection