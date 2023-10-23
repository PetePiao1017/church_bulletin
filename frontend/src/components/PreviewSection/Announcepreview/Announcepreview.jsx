import React, {useState} from "react";
import {Button} from 'antd';
import {connect} from 'react-redux';

import './Announcepreview.scss';

const Announcepreview = (props) => {
    return (
            <div className='scroll-bar' style={{margin:"0"}} >
                <h3 className='app-header' style={{marginTop:"0"}}>{props.title}</h3>
                <div className='app-image'>
                    {
                        !props.imageurl 
                            ? <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
                            : <img src = {props.imageurl} alt = "preview" style = {{width : "100%"}} />
                    }
                </div>
                <br />
                <div className="body-text">
                   <p> {!props.bodyText ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : props.bodyText}</p>
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
                        {!props.buttonText ? "Button Text" : props.buttonText}
                    </button>
                </div>
            </div>
        
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.announcment_Title,
    bodyText: state.builletins.announcment_bodyText,
    buttonLink: state.builletins.announcment_buttonLink,
    buttonText: state.builletins.announcment_buttonText,
    imageurl : state.builletins.announcment_imageurl,
})

export default connect(mapStateToProps)(Announcepreview)