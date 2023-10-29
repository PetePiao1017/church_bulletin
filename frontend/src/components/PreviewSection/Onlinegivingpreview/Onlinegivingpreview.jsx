import React from "react";
import {Button} from 'antd'
import { OnlineGiving } from "../../SVG";
import { connect } from "react-redux";


const Onlinegivingpreview = (props) => {
    let title = props.title.filter((item) => item.id === props.id);
    let bodyText = props.online_bodyText.filter((item) => item.id === props.id);
    return(
        <div className='scroll-bar'>
            <h3 className='app-header'>
                {title.length === 0 ? "Online Giving" : title[0].str}
            </h3>
            <div className="body-text">
                <p> {bodyText.length === 0 ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText[0].str}</p>
            </div>
            {
                props.online_type == "Embed"
                ?   <div style={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent: "center",
                        height:"30vh",
                        backgroundColor: "rgb(245, 247, 250)"
                    }}>
                        <OnlineGiving />
                    </div>
                :   <div className="btn-link">   
                        <Button type="primary">Give now</Button>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.online_Title,
    online_bodyText: state.builletins.online_bodyText,
    online_type : state.builletins.online_Type
})

export default connect(mapStateToProps)(Onlinegivingpreview)