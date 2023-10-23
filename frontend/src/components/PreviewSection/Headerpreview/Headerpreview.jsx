import React, { useEffect } from "react";
import {connect} from 'react-redux';

const Headerpreview = (props) => {
    return (
        <div style={{margin:"0"}}>
            <h3 className='app-header' style={{marginTop:"0", marginBottom:"0"}}>
                {!props.title ? props.user.church_name + " Bulletin" : props.title}
            </h3>
            {/* <h3 className='app-date'>{props.date}</h3> */}
            <p style={{marginTop:"2px", fontSize:"10px"}}>October 28, 2023</p>
            <div 
                className='app-image' style={{height:"20vh"}}
                >
                {
                    
                    !props.imageurl ? "" : <img src = "./background.jpg" style={{width:"100%", height:"100%"}} />

                }
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    title: state.builletins.header_title,
    date: state.builletins.header_date,
    imageurl : state.builletins.header_imageurl
}) 

export default connect(mapStateToProps)(Headerpreview)