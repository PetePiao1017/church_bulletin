import React, { useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
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

    const renderText = () => {
        if(!value) return <p style={{fontSize:"25px", textAlign: "center", color:"white"}}>{props.value}</p>
        else return <p style={{fontSize:"25px", textAlign: "center", color:"white"}}>{value}</p>
    }

    const renderPlaceHolder = () => {
        console.log(props.value)
        if(placeholdervisible === true && props.value === ""){
            return <p 
            className="placeholder"
            onClick={() => showCursor()}    
        >
            Button Text
        </p>
        }
    }
    return(
        <div 
            className="buttontext-container"
            onFocus={() => {setBordervisible(true); setVisible(true)}}
            onBlur={() => {setBordervisible(false); setVisible(false)}}
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
                        : renderText()
                }
                
                {renderPlaceHolder()}
            </div>
            {visible ?
                <div style={{display: "inline"}}>
                    <DeleteFilled 
                        className="delete-icon-button" 
                        onClick={() => props.deleteItemCallback(props.id)}
                    />
                </div>
            : ""}
        </div>
    )
}

export default ButtonText