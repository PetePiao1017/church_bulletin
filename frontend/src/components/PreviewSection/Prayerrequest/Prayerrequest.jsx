import React from "react";
import {Button, Input, Form} from 'antd'
import TextArea from "antd/es/input/TextArea";
import { connect } from "react-redux";


const Prayerrequest = (props) => {
    let title = props.title.filter((item) => item.id === props.id);
    let bodyText = props.bodyText.filter((item) => item.id === props.id);
    return (
        <div className='scroll-bar' 
            style={{
                marginTop:"0", 
                height:"73vh"}} >
            <h3 className='app-header'>
                {title.length === 0 ? "Prayer Request" : title[0].str}
            </h3>
            <div className="body-text">
                <p> {bodyText.length === 0 ? "Type into the BODY TEXT field on the left for your text to show up here. Customize your copy with bold, italicized, or underlined text. Tip: Leaving a field blank in Loop will exclude it from your bulletin." : bodyText[0].str}</p>
            </div>
            <Form layout="vertical" style={{width : "80%", margin: "0 auto"}}>
                {
                    !props.checkedvalues
                    ?   
                        <>
                        <p style={{textAlign:"left", fontSize:"8px"}}>Name</p>
                        <input type = "text" />
                        <p style={{textAlign:"left", fontSize:"8px"}}>Email</p>
                        <input type = "text" />
                        </>
                    
                    :
                    props.checkedvalues.map((item, index) => {
                        return(
                            <>
                                <p style={{textAlign:"left", fontSize:"8px"}}>{item}</p>
                                <input type = "text" />
                            </>
                        )
                    })
                }
                <br />
                <Form.Item label = "Prayer Request" style={{marginTop: "10px"}}>
                    <TextArea type="text" />
                </Form.Item>
            </Form>
            <div className="btn-link">   
                <Button type="primary">Submit</Button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.prayer_Title,
    bodyText: state.builletins.prayer_bodyText,
    checkedvalues: state.builletins.prayer_checkedvalue,
})

export default (connect)(mapStateToProps) (Prayerrequest)