import React, {useState} from "react";
import {Button} from 'antd';
import './Announcepreview.scss';

const Announcepreview = () => {

    return (
            <div className='scroll-bar' style={{margin:"0"}} >
                <h3 className='app-header'>Announcement</h3>
                <div className='app-image'>
                    <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
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

export default Announcepreview