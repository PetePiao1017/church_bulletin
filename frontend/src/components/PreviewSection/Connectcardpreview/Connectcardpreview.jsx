import React from "react";
import {Button, Checkbox, Form, Input} from 'antd'

const Connectcardpreview = () => {

    return(
        <div className='scroll-bar' style={{marginLeft:"10%", width:"80%", marginTop:"0", height:"80vh"}} >
            <h3 className='app-header'>Connect Card</h3>
            <div className='app-image'>
                <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
            </div>
            <div className="body-text">
            <p> Type into the Body Text field on the left for your text to show up here.</p>
            </div>
            <label>Name</label>
                <Input type = "text" />
            <label>Email</label>
                <Input type = "text" />
            <p>I made a decision today</p>
            <Form.Item>
                <Checkbox>To follow Jesus</Checkbox>
            </Form.Item>
            <Form.Item>
                <Checkbox>To rededicate my life to Jesus</Checkbox>
            </Form.Item>
            <p>How did you hear about us?</p>
            <Form.Item>
                <Checkbox>Friend/Family</Checkbox>
            </Form.Item>
            <Form.Item>
                <Checkbox>Church Website</Checkbox>
            </Form.Item>
            <div className="btn-link">   
                <Button type="primary">Submit</Button>
            </div>
        </div>
    )
}

export default Connectcardpreview