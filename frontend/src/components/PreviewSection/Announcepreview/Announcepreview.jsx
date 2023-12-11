import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';

import './Announcepreview.scss';

const Announcepreview = (props) => {
    
    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [buttonText, setButtonText] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let bodyText_index = props.todoList[index].data.findIndex(item => item.dataType === "bodyText");
            let buttonText_index = props.todoList[index].data.findIndex(item => item.dataType === "buttonText");
            let image_index = props.todoList[index].data.findIndex(item => item.dataType === "imageUrl");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(bodyText_index !== -1) setBodyText(props.todoList[index].data[bodyText_index].value);
            if(buttonText_index !== -1) setButtonText(props.todoList[index].data[buttonText_index].value);
            if(image_index !== -1) setImageUrl(props.todoList[index].data[image_index].value);

        }
    },[props.todoList]);

    return (
            <div className='announcement' style={{marginTop: "50px"}}>
                <h3 className='app-header'>
                    {title === "" ? "Announcement" : title}
                </h3>
                <div 
                    style={{
                        width:"100%", 
                        height:"200px", 
                        background:"rgb(226, 232, 240)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {
                        imageUrl === ""
                            ? <img src = "./gallery.png"  alt = "Gallery Image" style = {{width : "50px", height:"50px"}} />
                            : <img src = {imageUrl} alt = "preview" style = {{width : "100%", height:"100%"}} />
                    }
                </div>
                <br />
                <div className="body-text">
                   <p> {bodyText === "" ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText}</p>
                </div>
                <div className="btn-link">
                    <button 
                        type="button" 
                        style={{
                            backgroundColor: "rgb(23, 25, 35)",
                            color:"white",
                            padding:"8px",
                            borderRadius:"6px"
                        }}
                    >
                        {buttonText === "" ? "Button Text" : buttonText}
                    </button>
                </div>
            </div>
        
    )
}

const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList,
})

export default connect(mapStateToProps)(Announcepreview)