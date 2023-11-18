import React, {useState} from "react";
import './VideoSection.scss';
import { DeleteFilled } from "@ant-design/icons";

const VideoSection = (props) => {
    const [visible, setVisible] = useState(false);


    const onChange = (e) => {
        props.videoEditerCallback(props.id, e.target.value);
    }
    return(
        <div 
            className="video-container"
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
        >
            <input
                type = "text"
                className="video-link"
                placeholder="Type or Paste your video link"
                onChange={onChange}
                value={props.value}
                />
            {visible ?
                <div style={{display: "inline"}}>
                    <DeleteFilled 
                        className="delete-icon" 
                        onClick={() => props.deleteItemCallback(props.id)}    
                    />
                </div>
            : ""}
        </div>
    )
}

export default VideoSection