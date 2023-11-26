import React, { useEffect, useState, useMemo, } from "react";
import { Dropdown, Button, ColorPicker, theme } from 'antd';
import './Toolbar.scss'

const Toolbar = (props) =>{

    
    const [explanation, setExplanation] = useState("");
    const { token } = theme.useToken();
    const [color, setColor] = useState(token.colorPrimary);
    const bgColor = useMemo(() => (typeof color === 'string' 
        ? color 
        : color.toHexString()), [color]);
    const btnStyle = {
        backgroundColor: bgColor,
        width: "100%"
    };
    const items = [
        {
          label:  
            <ColorPicker 
                value={color} 
                onChange={setColor}
            >
                <Button 
                    type="primary" 
                    style={btnStyle}
                    
                >
                    Click to pick the Color
                </Button>
            </ColorPicker>,
          key: '0',
        },
        {
          label: <a href="#">2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: 
                <Button 
                    type = "primary" 
                    danger 
                    style={{width: "100%"}}
                    onClick={() => props.setContentValueToolbarCallback(props.id, "delete")}
                >
                    Delete
                </Button>,
          key: '3',
        },
      ];      

 
    const showExplanation = (str) => {
        switch(str){
            case "edit":
                setExplanation("Add a text box to your note");
                break
            case "gallery":
                setExplanation("Add a photo, image, GIF to your note");
                break
            case "attach":
                setExplanation("Attach a file to your note");
                break
            case "cursor":
                setExplanation("Add an action button or link to your note");
                break
            case "event":
                setExplanation("Add an event where recipients can RSVP");
                break
            case "video":
                setExplanation("Add a YouTube or Vimeo video to your note");
                break
            case "checked":
                setExplanation("Add a survy question reciptions can vote on");
                break
            case "quote":
                setExplanation("Add an inspirational quote to  your note");
                break
            default:
                setExplanation("");
                break
            
        }
    }
    return(
        <div 
            className="toolbar-container"
            onClick={(e) => e.stopPropagation()}
        >
            <p 
                className="explanation"
                style=
                {{
                    textAlign:"center",
                    color: `${!explanation ? "white" : "black"}`,
                }}
            >
                {!explanation ? "'" : explanation}
            </p>
            <div className="toolbar">
                <img 
                    className = "edit" 
                    src="./edit_icon.png" 
                    onMouseOver={() => showExplanation("edit")}
                    onMouseLeave={() => setExplanation("")}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setContentValueToolbarCallback(props.id, "edit");
                    }}
                />
                <img 
                    className = "gallery" 
                    src="./gallery_icon.png"
                    onMouseOver={() => showExplanation("gallery")}
                    onMouseLeave={() => setExplanation("")}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setContentValueToolbarCallback(props.id, "gallery")
                    }}
                />
                <img 
                    className = "attach" 
                    src="./attach_icon.png"
                    onMouseOver={() => showExplanation("attach")}
                    onMouseLeave={() => setExplanation("")}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setContentValueToolbarCallback(props.id, "attach")
                    }}
                />
                <img 
                    className = "cursor" 
                    src="./cursor_icon.png" 
                    onMouseOver={() => showExplanation("cursor")}
                    onMouseLeave={() => setExplanation("")}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setContentValueToolbarCallback(props.id, "cursor")
                    }}
                />
                <img 
                    className = "event" 
                    src="./event_icon.png" 
                    onMouseOver={() => showExplanation("event")}
                    onMouseLeave={() => setExplanation("")}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setContentValueToolbarCallback(props.id, "event")
                    }}
                />
                <img 
                    className = "video" 
                    src="./video_icon.png" 
                    onMouseOver={() => showExplanation("video")}
                    onMouseLeave={() => setExplanation("")}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setContentValueToolbarCallback(props.id, "video")
                    }}
                />
                <img 
                    className = "checked" 
                    src="./checked_icon.png" 
                    onMouseOver={() => showExplanation("checked")}
                    onMouseLeave={() => setExplanation("")}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setContentValueToolbarCallback(props.id, "checked")
                    }}
                />  
                <img 
                    className = "quote" 
                    src="./quote_icon.png" 
                    onMouseOver={() => showExplanation("quote")}
                    onMouseLeave={() => setExplanation("")}
                    onClick={(e) => {
                        e.stopPropagation();
                        props.setContentValueToolbarCallback(props.id, "quote")
                    }}
                />
                <Dropdown
                    menu = {{items,}}
                    trigger={['click']}
                >
                    <img 
                        className = "threedots" 
                        src="./threedots_icon.png"
                        onClick={(e) => e.stopPropagation()}

                    />
                </Dropdown>
            </div>
        </div>
        
    )
}

export default Toolbar