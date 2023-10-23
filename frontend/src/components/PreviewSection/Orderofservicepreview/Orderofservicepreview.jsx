import React, { useEffect, useState } from "react";
import './Orderofservicepreview.scss';
import { connect } from "react-redux";

const Orderofservicepreview = (props) => {
    return(
            <div className='scroll-bar' style={{margin:"0"}} >
                <h3 className='app-header' style={{marginTop:"0"}}>{props.title}</h3>
                <div className='app-image'>
                    
                    <img 
                        src = {props.imageurl}  
                        style={{width:"100%", height:"100%"}} 
                         />
                   
                </div>
                <div className="service-topic">
                    <h3 className={!props.orderofservice_Topic_Title ? "topic-header" :"topic-header-active"}>
                        {
                        !props.orderofservice_Topic_Title ? "Service Topics 101" : props.orderofservice_Topic_Title
                        }</h3>
                    <p className={!props.orderofservice_Topic_Content ? "topic-content" : "topic-content-active"}>
                        {
                        !props.orderofservice_Topic_Content ? "Add edit and delete your service topics using the panel on the left Add edit and delete your service topics using the panel on the left"
                        : props.orderofservice_Topic_Content
                        }
                    </p>
                </div>
            </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.orderofservice_Title,
    orderofservice_Topic_Title: state.builletins.orderofservice_Topic_Title,
    orderofservice_Topic_Content: state.builletins.orderofservice_Topic_Content,
    imageurl: state.builletins.orderofservice_imageurl,
})

export default connect(mapStateToProps)(Orderofservicepreview)