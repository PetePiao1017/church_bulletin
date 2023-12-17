import React, { useState, useEffect } from "react";
import {Button} from 'antd'
import {connect} from 'react-redux';
import "./Connectcardpreview.scss"

const Connectcardpreview = (props) => {

    const [title, setTitle] = useState("");
    const [bodyText, setBodyText] = useState("");
    const [checkedValues, setCheckedValues] = useState([]);
    const [questionone, setQuestionone] = useState("");
    const [questiontwo, setQuestionTwo] = useState("");
    const [optionone, setOptionone] = useState([]);
    const [optiontwo, setOptiontwo] = useState([]);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        let index = props.todoList.findIndex(item => item.id === props.id);

        if(index !== -1){
            let title_index = props.todoList[index].data.findIndex(item => item.dataType === "title");
            let bodyText_index = props.todoList[index].data.findIndex(item => item.dataType === "bodyText");
            let image_index = props.todoList[index].data.findIndex(item => item.dataType === "imageUrl");
            let checkedvalues_index = props.todoList[index].data.findIndex(item => item.dataType === "checkedValues");
            let questionone_index = props.todoList[index].data.findIndex(item => item.dataType === "questionOne");
            let questiontwo_index = props.todoList[index].data.findIndex(item => item.dataType === "questionTwo");
            let optionone_index = props.todoList[index].data.findIndex(item => item.dataType === "option_one");
            let optiontwo_index = props.todoList[index].data.findIndex(item => item.dataType === "option_two");

            if(title_index !== -1) setTitle(props.todoList[index].data[title_index].value);
            if(bodyText_index !== -1) setBodyText(props.todoList[index].data[bodyText_index].value);
            if(image_index !== -1) setImageUrl(props.todoList[index].data[image_index].value);
            if(checkedvalues_index !== -1) setCheckedValues(props.todoList[index].data[checkedvalues_index].value);
            if(questionone_index !== -1) setQuestionone(props.todoList[index].data[questionone_index].value);
            if(questiontwo_index !== -1) setQuestionTwo(props.todoList[index].data[questiontwo_index].value);
            if(optionone_index !== -1) setOptionone(props.todoList[index].data[optionone_index].value);
            if(optiontwo_index !== -1) setOptiontwo(props.todoList[index].data[optiontwo_index].value);
            

        }
    },[props.todoList]);

    return(
        <div className='scroll-bar'>
            <br />
            <br />
            <br />
            <h3 style={{color: props.bulletins.heading_text}}>
                {title === "" ? "Connect Card" : title}
            </h3>
            {
                <div style={{
                    width:"100%", 
                    height:"30%", 
                    background:"rgb(226, 232, 240)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                    }}>
                    {
                        imageUrl === ""
                        ? <img src = "./gallery.png"   alt = "Gallery Image" style = {{width : "50px", height:"50px"}} />
                        : <img src = {imageUrl} alt = "preview" style = {{width : "100%", height:"100%"}} />
                    }
                </div>
                
            }
            <div className="body-text">
                <p>
                    {bodyText === "" ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText}
                </p>
            </div>
            <div  style={{width : "80%", margin: "0 auto"}}>
                {
                    checkedValues.length === 0
                    ?   
                        <>
                            <p style={{textAlign:"left", fontSize:"8px"}}>Name</p>
                            <input type = "text" />
                            <p style={{textAlign:"left", fontSize:"8px"}}>Email</p>
                            <input type = "text" />
                        
                        </>
                    
                    :
                    checkedValues.map((item, index) => {
                        return(
                            <div key = {index}>
                                <p style={{textAlign:"left", fontSize:"8px"}}>{item}</p>
                                <input type = "text" />
                            </div>
                        )
                    })
                }
            </div>
            <div style={{textAlign:"left", fontSize:"9px", marginLeft: "10px"}}>
                <p >
                    {
                        questionone === ""
                        ? "I made a decision today"
                        : questionone
                    }
                </p>
                {
                    optionone.length === 0 
                    ? 
                    <div>
                        <div>
                            <input type = "checkbox" style={{verticalAlign: "middle"}}/> 
                            <label>To follow Jesus</label>
                        </div>
                        <div>
                            <input type = "checkbox" style={{verticalAlign: "middle"}}/> <label>To redicate my life to Jesus</label>
                        </div>
                    </div>
                    : 
                    optionone.map((item, index) => {
                        return (
                            <div>
                                <input key = {index} type = "checkbox" style={{verticalAlign: "middle"}} /> 
                                <label>{item}</label> 
                            </div>
                        )
                    })
                }
                
            </div>
            <div style={{textAlign:"left", fontSize:"9px", marginLeft: "10px"}}>
                <p >
                    {
                        questiontwo === "" 
                        ? "How did you hear about us?"
                        : questiontwo
                    }
                </p>
                {
                    optiontwo.length === 0 
                    ? 
                    <div>
                        <div>
                            <input type = "checkbox" style={{verticalAlign: "middle"}}/> 
                            <label>Friend/Family</label>
                        </div>
                        <div>
                            <input type = "checkbox" style={{verticalAlign: "middle"}}/> <label>Church/Website</label>
                        </div>
                    </div>
                    : 
                    optiontwo.map((item, index) => {
                        return (
                            <div>
                                <input key = {index} type = "checkbox" style={{verticalAlign: "middle"}} /> 
                                <label>{item}</label> 
                            </div>
                        )
                    })
                }
                
            </div>
            <div className="btn-link">   
                <Button type="primary">Submit</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    todoList: state.builletins.todoList,
    bulletins: state.builletins,
})

export default connect(mapStateToProps)(Connectcardpreview)