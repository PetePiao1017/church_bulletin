import React from "react";
import {Button} from 'antd'
import { GiftFilled } from "@ant-design/icons";


const Onlinegivingpreview = () => {
    return(
        <div className='scroll-bar' style={{margin:"0"}} >
            <h3 className='app-header'>Online Giving</h3>
            <div className='app-image'>
                <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
            </div>
            
            <div className="body-text">
                <p> Type into the Body Text field on the left for your text to show up here.</p>
            </div>
            <div style={{height:"20vh", backgroundColor:"rgb(245, 247, 250)", width:"90%", marginLeft:"20px"}}>
                
            </div>
            <div className="btn-link">   
                <Button type="primary">Button Text</Button>
            </div>
        </div>
    )
}

export default Onlinegivingpreview