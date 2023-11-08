import React, { useState } from "react";
import './ButtonText.scss'

const ButtonText = () => {

    const [visible, setVisible] = useState(false);

    const [placeholdervisible, setPlaceholderVisible] = useState(true);

    const [value, setValue] = useState("");

    console.log(visible)

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const showInput = () => {
        console.log("OK")
        setVisible(true);
    }


    return(
        <div 
            className="buttontext"
            onMouseDown={() => showInput()}
        >
            {
                visible ? 
                    <input 
                        type = "text" 
                        className="input-box"
                        value = {value}
                        onChange={onChange}
                        name = "button-text"
                        placeholder="abcdef"
                        onFocus={() => {setPlaceholderVisible(false); showInput()}}
                    />
                    : ""
            }
            {
                placeholdervisible ? 
                <p className="placeholder">
                    Button Text
                </p>
                : ""
            }
            
        </div>
    )
}

export default ButtonText