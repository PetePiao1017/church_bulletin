import React, {useState} from "react";
import './VideoSection.scss';
import { DeleteFilled, DragOutlined } from "@ant-design/icons";

const VideoSection = (props) => {
    const [visible, setVisible] = useState(false);


    const onChange = (e) => {
        props.videoEditerCallback(props.id, e.target.value);
    }
    return(
        <div 
            className="video-container"
            onFocus={() => setVisible(true)}
        >
            <input 
                type = "text"
                className="video-link"
                placeholder="Type or Paste your video link"
                onChange={onChange}
                />
            {visible ?
                <div style={{display: "inline"}}>
                    <DragOutlined className="drag-icon"/>
                    <DeleteFilled className="delete-icon" />
                </div>
            : ""}
        </div>
    )
}

export default VideoSection