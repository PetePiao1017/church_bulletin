import React from "react";
import {Button, Checkbox, Form, Input} from 'antd'
import {connect} from 'react-redux';

const Connectcardpreview = (props) => {

    console.log(props.connectcard_checkedvalues)
    return(
        <div >
            <h3 className='app-header'>{props.title}</h3>
            <div className='app-image'>
                <img src = "./gallery.png"  style={{width:"50px"}} alt = "Gallery Image" />
            </div>
            <div className="body-text">
            <p> {props.bodyText}</p>
            </div>
            {
                props.connectcard_checkedvalues.length === 0
                ?
                <>
                    <label>Name</label>
                        <Input type = "text" />
                    <br />
                    <label>Email</label>
                        <Input type = "text" />
                    <br />
                </>

                : props.connectcard_checkedvalues.map((item, index) => {
                    return(
                        <>
                        <div key = {index}>
                            <label>{item}</label>
                                <Input type = "text" />
                        </div>
                        <br />
                        </>
                    )
                })
            }
           
            <p>{props.questionOne}</p>
                <Checkbox>{props.questionOneOptionOne}</Checkbox>
                <Checkbox>{props.questionOneOptionTwo}</Checkbox>
            <p>{props.questionTwo}</p>
                <Checkbox>{props.questionTwoOptionOne}</Checkbox>
                <Checkbox>{props.questionTwoOptionTwo}</Checkbox>
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