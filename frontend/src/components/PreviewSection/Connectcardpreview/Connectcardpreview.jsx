import React from "react";
import {Button, Checkbox, Form, Input} from 'antd'
import {connect} from 'react-redux';

const Connectcardpreview = (props) => {
    let title = props.title.filter((item) => item.id === props.id);
    let bodyText = props.bodyText.filter((item) => item.id === props.id);
    let connectcard_checkedvalues = props.connectcard_checkedvalues.filter((item) => item.id === props.id);
    let questionOne = props.questionOne.filter((item) => item.id === props.id);
    let questionTwo = props.questionTwo.filter((item) => item.id === props.id);

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
                    margin: "0 auto",
                    display:"flex", 
                    alignItems:"center"
                    }}>
                    <img src = {props.imageurl} alt = "image"/>
                </div>
                
            }
            <div className="body-text">
                <p>
                    {bodyText.length === 0 ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText[0].str}
                </p>
            </div>
            <div  style={{width : "80%", margin: "0 auto"}}>
                {
                    props.connectcard_checkedvalues.length === 0
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
                            <>
                                <p style={{textAlign:"left", fontSize:"8px"}}>{item}</p>
                                <input type = "text" />
                            </>
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
    questionOneOptionOne: state.builletins.connectcard_Question_One_Option_One,
    questionOneOptionTwo: state.builletins.connectcard_Question_One_Option_Two,
    questionTwo: state.builletins.connectcard_Question_Two,
    questionTwoOptionOne: state.builletins.connectcard_Question_Two_Option_One,
    questionTwoOptionTwo: state.builletins.connectcard_Question_Two_Option_Two,
    connectcard_checkedvalues : state.builletins.connectcard_checkedvalues,
})

export default connect(mapStateToProps)(Connectcardpreview)