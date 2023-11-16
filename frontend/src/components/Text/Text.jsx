import React, {useState} from "react";
import ReactQuill from 'react-quill';
import { DeleteFilled } from "@ant-design/icons";
import 'react-quill/dist/quill.snow.css';

import './Text.scss';

const Text = (props) => {
    const [visible, setVisible] = useState(false);

    return(
        <div 
            className="text-container"
            
            style={{
                padding: "5px",
                marginBottom:"10px",
                border: !visible ? "none": "1px solid #57b0fb",
                
            }}
        >
            {
                visible ? 
                <ReactQuill 
                    theme="snow"
                    value={props.value}
                    onFocus={() => setVisible(true)}
                    onBlur={() => setVisible(false)}
                    onChange = {(value) => props.textEditerCallback(props.id, value)}
                />
                :
                <div 
                    onClick={() => setVisible(true)}
                    style={{
                        textAlign: "left",
                        border: "1px solid rgb(245, 247, 250)",
                        borderRadius: "5px",
                        padding:"5px",
                        paddingBottom: "15px",
                        color: "grey"
                    }}
                >
                    {!props.value 
                        ? "Type Some Good News Here" 
                        : <div dangerouslySetInnerHTML={{ __html: props.value }} />

                    }
                </div>
            }
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

export default Text