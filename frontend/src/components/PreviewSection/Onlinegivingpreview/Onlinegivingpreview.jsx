import React, { useState, useEffect } from "react";
import {Button} from 'antd'
import { OnlineGiving } from "../../SVG";
import { connect } from "react-redux";


const Onlinegivingpreview = (props) => {

    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [online_type, setOnlineType] = useState("Embed");

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let bodyText_index = props.todoList[index].data.findIndex(item => item.dataType === "bodyText");
            let online_type_index = props.todoList[index].data.findIndex(item => item.dataType === "onlineType");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(bodyText_index !== -1) setBodyText(props.todoList[index].data[bodyText_index].value);
            if(online_type_index !== -1) setOnlineType(props.todoList[index].data[online_type_index].value);

        }
    },[props.todoList]);

    return(
        <div className='scroll-bar'>
            <br />
            <br />
            <br />
            <h3 style={{color: props.bulletins.heading_text}}>
                {title === "" ? "Online Giving" : title}
            </h3>
            <div className="body-text">
                <p> {bodyText === "" ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText}</p>
            </div>
            {
                online_type == "Embed"
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
    todoList: state.builletins.todoList,
    bulletins: state.builletins,
})

export default connect(mapStateToProps)(Onlinegivingpreview)