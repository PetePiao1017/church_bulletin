import React from "react";
import { connect } from "react-redux";
import { Website } from "../../SVG";

const Websitepreview = (props) => {

    return (
        <div className='scroll-bar' style={{margin:"0"}} >
            <h3 className='app-header'>{props.title}</h3>
            
            {
                props.type === "Website" || props.type.length === 0
                ? <div style={{
                    display:"flex", 
                    alignItems:"center", 
                    justifyContent:"center",
                    height:"50vh",
                    backgroundColor: "gray"
                }}>
                    <Website />
                </div>
                :   
                <div className="body-text">
                    <p className="app-image">{props.embed_code}</p>
                </div>
            }
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