import React, { useEffect } from "react";
import {connect} from 'react-redux';
import { convertDate } from "../../../utils/convertDate";

const Headerpreview = (props) => {
    return (
        <div className="scroll-bar" style={{margin : "0"}}>
            <h3 className='app-header' style={{marginTop:"0", marginBottom:"0"}}>
                {!props.title ? "   " + " Bulletin" : props.title}
            </h3>
            <h3 className='app-date'></h3>
            <p style={{marginTop:"2px", fontSize:"10px"}}>{convertDate(props._date_)}</p>
            <div 
                className='app-image' style={{height:"20vh", width:"98%"}}
                >
            {
                    !props.imageurl
                    ? <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
                    : <img src = {props.imageurl} alt = "preview" style = {{width : "100%", height:"100%"}} />
                }
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    title: state.builletins.header_title,
    _date_: state.builletins.header_date,
    imageurl : state.builletins.header_imageurl
}) 

export default connect(mapStateToProps)(Headerpreview)