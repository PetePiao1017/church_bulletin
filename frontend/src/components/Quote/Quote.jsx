import React, { useEffect, useState } from "react";
import './Quote.scss';
import { DeleteFilled } from "@ant-design/icons";

const Quote = (props) => {
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState("");
    const [writer, setWriter] = useState("");

    const onChange = (e) => {
        if(e.target.name === "content") setContent(e.target.value);
        if(e.target.name === "writer") setWriter(e.target.value);
    };
    
    useEffect(() => {
        props.quoteEditerCallback(props.id, content, writer);
    },[content, writer])

    useEffect(() => {
        if(props.value.content) setContent(props.value.content);
        if(props.value.text) setWriter(props.value.text);
    },[props.value])

    return(
        <div 
            className="quote-container"
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
        >
            <input 
                type = "text"
                className="quote-text"
                placeholder="Don't dig up in doubt what you planed in faith"
                name = "content"
                onChange={onChange}
                value={content}
            />
            <input
                type="text"
                className="quote-person"
                placeholder="Elisabeth Elliot"
                name = "writer"
                onChange={onChange}
                value={writer}
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


export default Quote;