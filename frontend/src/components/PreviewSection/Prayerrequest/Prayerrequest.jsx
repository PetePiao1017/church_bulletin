import React from "react";
import {Button, Input, Form} from 'antd'
import TextArea from "antd/es/input/TextArea";
import { connect } from "react-redux";


const Prayerrequest = (props) => {
    return (
        <div className='scroll-bar' 
            style={{
                marginTop:"0", 
                height:"73vh"}} >
            <h3 className='app-header'>{props.title}</h3>
            <div className="body-text">
            <p>{props.bodyText}</p>
            </div>
            <Form layout="vertical" style={{width : "80%", margin: "0 auto"}}>
                {
                    !props.checkedvalues
                    ?   
                        <>
                        <Form.Item label = "Name" >
                            <Input type = "text" /> 
                        </Form.Item>
                       <Form.Item label = "Name">
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