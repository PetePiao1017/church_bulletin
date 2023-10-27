import React from "react";
import { connect } from "react-redux";
import { Video } from "../../SVG";
import './Videopreview.scss'

const Videopreview = (props) => {
    return (
        <div className='scroll-bar' style={{margin:"0"}} >
            <h3 className='app-header'>{props.title}</h3>
            <div className="body-text">
                <p>{!props.bodyText ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : props.bodyText}</p>
            </div>
            <div className = "video-container" >
                <Video />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.video_Title,
    bodyText: state.builletins.video_bodyText
})

export default connect(mapStateToProps)(Videopreview)