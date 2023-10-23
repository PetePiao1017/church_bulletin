import React from "react";
import {GlobalOutlined} from '@ant-design/icons'
import { connect } from "react-redux";

const Websitepreview = (props) => {

    return (
        <div className='scroll-bar' style={{margin:"0"}} >
            <h3 className='app-header'>{props.title}</h3>
            
            {
                props.type === "Website" || props.type.length === 0
                ? <div className='app-image' />
                :   
                <div className="body-text">
                    <div className="app-image">{props.embed_code}</div>
                </div>
            }
            <div style={{height:"20vh", backgroundColor:"rgb(245, 247, 250)", width:"90%", marginLeft:"20px"}}>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.website_Title,
    link: state.builletins.website_Link,
    type: state.builletins.website_Type,
    embed_code: state.builletins.website_embed_code,
})

export default connect(mapStateToProps) (Websitepreview)