import React from "react";
import { connect } from "react-redux";

const Videopreview = (props) => {
    return (
        <div className='scroll-bar' style={{margin:"0"}} >
            <h3 className='app-header'>{props.title}</h3>
            <div className="body-text">
                <p>{props.bodyText}</p>
            </div>
            <div style={{height:"20vh", backgroundColor:"rgb(245, 247, 250)", width:"90%", marginLeft:"20px"}}>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.video_Title,
    bodyText: state.builletins.video_bodyText
})

export default connect(mapStateToProps)(Videopreview)