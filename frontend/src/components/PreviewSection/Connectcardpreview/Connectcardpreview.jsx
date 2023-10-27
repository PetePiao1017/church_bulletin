import React from "react";
import {Button, Checkbox, Form, Input} from 'antd'
import {connect} from 'react-redux';

const Connectcardpreview = (props) => {

    return(
        <div className='scroll-bar' 
            style={{
                marginTop:"0", 
                height:"73vh"}} >
            <h3 className='app-header'>{props.title}</h3>
            {
                <img src = {props.imageurl} alt = "image" />
            }
            <div className="body-text">
            <p>{!props.bodyText ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : props.bodyText}</p>
            </div>
            <Form layout="vertical" style={{width : "80%", margin: "0 auto"}}>
                {
                    !props.checkedvalues
                    ?   
                        <>
                        <Form.Item label = "Name" >
                            <Input type = "text" /> 
                        </Form.Item>
                       <Form.Item label = "Email">
                            <Input type = "text" /> 
                        </Form.Item>
                        </>
                    
                    :
                    props.checkedvalues.map((item, index) => {
                        return(<Form.Item label = {item}>
                            <Input type = "text" />
                        </Form.Item>)
                    })
                }
                <Form.Item label = "Prayer Request">
                    <Input.TextArea type="text" />
                </Form.Item>
            </Form>
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