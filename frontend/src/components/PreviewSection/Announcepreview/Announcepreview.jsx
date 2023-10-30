import React from "react";
import {connect} from 'react-redux';

import './Announcepreview.scss';

const Announcepreview = (props) => {
    let title = props.title.filter((item) => item.id === props.id);
    let bodyText = props.bodyText.filter((item) => item.id === props.id);
    let buttonText = props.buttonText.filter(item => item.id === props.id);
    let imageurl = props.imageurl.filter(item => item.id === props.id);
    return (
            <div className='scroll-bar' style={{margin:"0"}} >
                <h3 className='app-header' 
                    style={{marginTop:"0"}}>
                    {title.length === 0 ? "Announcement" : title[0].str}
                </h3>
                <div className='app-image'>
                    {
                        imageurl.length === 0
                            ? <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
                            : <img src = {imageurl[0].str} alt = "preview" style = {{width : "100%", height:"100%"}} />
                    }
                </div>
                <br />
                <div className="body-text">
                   <p> {bodyText.length === 0 ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText[0].str}</p>
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
                        {buttonText.length === 0 ? "Button Text" : buttonText[0].str}
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
    file: state.builletins.announcement_file,
})

export default connect(mapStateToProps)(Announcepreview)