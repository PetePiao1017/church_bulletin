import React from "react";
import {Button} from 'antd'
import {connect} from 'react-redux';
import "./Connectcardpreview.scss"

const Connectcardpreview = (props) => {
    let title = props.title.filter((item) => item.id === props.id);
    let bodyText = props.bodyText.filter((item) => item.id === props.id);
    let connectcard_checkedvalues = props.connectcard_checkedvalues.filter((item) => item.id === props.id);
    let imageurl = props.imageurl.filter(item => item.id === props.id);
    let questionOne = props.questionOne.filter(item => item.id === props.id);
    let questionTwo = props.questionTwo.filter(item => item.id === props.id);
    let optionone = props.optionone.filter(item => item.id === props.id);
    let optiontwo = props.optiontwo.filter(item => item.id === props.id);
    return(
        <div className='scroll-bar' 
            style={{
                marginTop:"0", 
                height:"73vh"}} >
            <h3 className='app-header'>
                {title.length === 0 ? "Connect Card" : title[0].str}
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
                        imageurl.length === 0
                        ? <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
                        : <img src = {imageurl[0].str} alt = "preview" style = {{width : "100%", height:"100%"}} />
                    }
                </div>
                
            }
            <div className="body-text">
                <p>
                    {bodyText.length === 0 ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText[0].str}
                </p>
            </div>
            <div  style={{width : "80%", margin: "0 auto"}}>
                {
                    connectcard_checkedvalues.length === 0
                    ?   
                        <>
                            <p style={{textAlign:"left", fontSize:"8px"}}>Name</p>
                            <input type = "text" />
                            <p style={{textAlign:"left", fontSize:"8px"}}>Email</p>
                            <input type = "text" />
                        
                        </>
                    
                    :
                    connectcard_checkedvalues[0].arr.map((item, index) => {
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
                        questionOne.length === 0 
                        ? "I made a decision today"
                        : questionOne[0].str
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
                    optionone[0].str.map((item, index) => {
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
                        questionTwo.length === 0 
                        ? "How did you hear about us?"
                        : questionOne[0].str
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
                    optiontwo[0].str.map((item, index) => {
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
    title: state.builletins.connectcard_Title,
    bodyText: state.builletins.connectcard_bodyText,
    questionOne: state.builletins.connectcard_Question_One,
    questionTwo: state.builletins.connectcard_Question_Two,
    optionone: state.builletins.connectcard_Option_One,
    optiontwo: state.builletins.connectcard_Option_Two,
    connectcard_checkedvalues : state.builletins.connectcard_checkedvalues,
    imageurl: state.builletins.connectcard_imageurl
})

export default connect(mapStateToProps)(Connectcardpreview)