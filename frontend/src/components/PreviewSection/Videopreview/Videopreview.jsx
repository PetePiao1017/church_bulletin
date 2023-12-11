import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Video } from "../../SVG";
import './Videopreview.scss'

const Videopreview = (props) => {
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [video_link, setVideoLink] = useState("");
    const [platform, setPlatform] = useState("");

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let bodyText_index = props.todoList[index].data.findIndex(item => item.dataType === "bodyText");
            let video_link = props.todoList[index].data.findIndex(item => item.dataType === "video_link");
            let platform = props.todoList[index].data.findIndex(item => item.dataType === "platform");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(bodyText_index !== -1) setBodyText(props.todoList[index].data[bodyText_index].value);
            if(video_link !== -1) setVideoLink(props.todoList[index].data[video_link].value);
            if(platform !== -1) setPlatform(props.todoList[index].data[platform].value);
        }
    },[props.todoList]);
    return (
        <div className='scroll-bar-video' style={{margin:"0", overflowX: "hidden"}} >
            <br />
            <br />
            <h3 className='app-header'>
                {title === "" ? "Video" : title}
            </h3>
            <div className="body-text">
                <p>{bodyText === "" ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText}</p>
            </div>
            <div className = "video-container-section" >
                <Video />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList
})

export default connect(mapStateToProps)(Videopreview)