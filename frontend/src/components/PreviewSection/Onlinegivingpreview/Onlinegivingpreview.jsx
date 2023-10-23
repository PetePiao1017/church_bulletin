import React from "react";
import {Button} from 'antd'
import { GiftFilled } from "@ant-design/icons";
import { connect } from "react-redux";


const Onlinegivingpreview = (props) => {
    return(
        <div className='scroll-bar' style={{margin:"0"}} >
            <h3 className='app-header'>{props.title}</h3>
            <div className='app-image'>
                <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
            </div>
            
            <div className="body-text">
                <p> {props.online_bodyText}</p>
            </div>
            <div style={{height:"20vh", backgroundColor:"rgb(245, 247, 250)", width:"90%", marginLeft:"20px"}}>
                
            </div>
            <div className="btn-link">   
                <Button type="primary">Button Text</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.online_Title,
    online_bodyText: state.builletins.online_bodyText,
})

export default connect(mapStateToProps)(Onlinegivingpreview)