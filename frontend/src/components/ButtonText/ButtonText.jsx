import React, { useState } from "react";
import './ButtonText.scss'

const ButtonText = (props) => {

    const [visible, setVisible] = useState(false);

    const [bordervisible, setBordervisible] = useState(true);

    const [placeholdervisible, setPlaceholderVisible] = useState(true);

    const [value, setValue] = useState("");


    const onChange = (e) => {
        if(!e.target.value) setPlaceholderVisible(true)
        setValue(e.target.value);
        props.buttonEditerCallback(e.target.value, props.id)
    }
    const showInput = () => {
        setVisible(true);
    }

    const lostFocus = () => {
        if(!value) setPlaceholderVisible(true)
    }

    const showCursor = () => {
        document.getElementById(`${props.index}`).focus()
    }
    return(
        <div 
            className="buttontext-container"
            onFocus={() => setBordervisible(true)}
            onBlur={() => setBordervisible(false)}
            style={{
                border: !bordervisible ? "none": "1px solid #57b0fb"
                
            }}
        >
            <div 
                className="buttontext"
                onMouseDown={() => showInput()}
            >
                {
                    visible ? 
                        <input
                            id = {props.index}
                            type = "text" 
                            className="input-box"
                            value = {value}
                            onChange={onChange}
                            name = "button-text"
                            onFocus={() => {setPlaceholderVisible(false); showInput()}}
                            onBlur = {() => lostFocus()}
                        />
                        : ""
                }
                {
                    placeholdervisible ? 
                    <p 
                        className="placeholder"
                        onClick={() => showCursor()}    
                    >
                        Button Text
                    </p>
                    : ""
                }
                
            </div>
        </div>
    )
}

export default ButtonText