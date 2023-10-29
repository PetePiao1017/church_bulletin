import React, { useEffect, useState } from "react";
import './Orderofservicepreview.scss';
import { connect } from "react-redux";

const Orderofservicepreview = (props) => {
    let title = props.title.filter((item) => item.id === props.id);
    let orderofservice_Topic_Title = props.orderofservice_Topic_Title.filter((item) => item.id === props.id);
    let orderofservice_Topic_Content = props.orderofservice_Topic_Content.filter(item => item.id === props.id);
    return(
            <div className='scroll-bar' style={{margin:"0"}} >
                <h3 className='app-header' style={{marginTop:"0"}}>
                    {title.length === 0 ? "Order Of Service" : title[0].str}
                </h3>
                <div className='app-image'>
                    
                    <img 
                        src = {props.imageurl}  
                        style={{width:"100%", height:"100%"}} 
                        />
                   
                </div>
                <div className="service-topic">
                    <h3 className={orderofservice_Topic_Title.length === 0 ? "topic-header" :"topic-header-active"}>
                        {
                        orderofservice_Topic_Title.length === 0 ? "Service Topics 101" : orderofservice_Topic_Title[0].str
                        }</h3>
                    <p className={orderofservice_Topic_Content.length === 0 ? "topic-content" : "topic-content-active"}>
                        {
                        orderofservice_Topic_Content.length === 0 ? "Add edit and delete your service topics using the panel on the left Add edit and delete your service topics using the panel on the left"
                        : orderofservice_Topic_Content[0].str
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