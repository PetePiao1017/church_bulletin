import React from "react";
import {Button, Input, Form} from 'antd'
import TextArea from "antd/es/input/TextArea";

const Prayerrequest = () => {

    return (
        <div className='scroll-bar' style={{marginLeft:"10%", width:"80%", marginTop:"0", height:"80vh"}} >
            <h3 className='app-header'>Prayer Request</h3>
            <div className='app-image'>
                <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
            </div>
            <div className="body-text">
            <p> Type into the Body Text field on the left for your text to show up here.</p>
            </div>
            <Form layout="vertical">
                <Form.Item label = "Name">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label = "Email">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label = "Prayer Request">
                    <TextArea type="text" />
                </Form.Item>
            </Form>
            <div className="btn-link">   
                <Button type="primary">Submit</Button>
            </div>
        </div>
    )
}

export default Prayerrequest