import React from "react";
import { Button,  Form, Input, Checkbox} from 'antd';

import {setSmallSectionData} from "../../../actions/bulletins";

import { connect } from "react-redux";

import './PrayerRequestediting.scss'

const PrayerRequestediting = (props) => {
    
    let bodyText;
    const onStateChange = (e) => {
        switch(e.target.name) {
            case "title":
                props.setSmallSectionData(props.id, "Prayer Request", "title", e.target.value);
                break
            case "bodyText" :
                bodyText += e.target.value;
                props.setSmallSectionData(props.id, "Prayer Request", "bodyText", e.target.value);
                break
        }
    }

    
    const onChange = (checkedValues) => {
        props.setSmallSectionData(props.id, "Prayer Request", "checkedvalues", checkedValues);
    };


    return(
        <div style={{width: "100%", margin: "0 auto"}}>
            <h4 className="top-header">Edit Prayer Request</h4>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={props.title}
                        onChange={onStateChange}
                        placeholder="Prayer Request"
                    />
                </Form.Item>
                <Form.Item label = "BODY TEXT">
                    <Input.TextArea name="bodyText" value={bodyText} onChange={onStateChange} rows = {4} />
                </Form.Item>

                <Form.Item label = "SELECT FIELDS TO INCLUDE">
                <   Checkbox.Group 
                        onChange={onChange} 
                        style = {{width: "100%"}}
                        defaultValue={['Name', 'Email']}
                        >
                        <div style = {{display:"grid"}}>
                            <Checkbox value = "Name" >Name</Checkbox>
                            <Checkbox value = "Email">Email</Checkbox>
                            <Checkbox value = "Phonenumber">Phonenumber</Checkbox>
                            <Checkbox value = "Address">Address</Checkbox>
                            <p>Additional Options</p>
                            <Checkbox value = "indicate_condition">Indicate Conditional</Checkbox>
                            <Checkbox value = "desire_contact">Indicate desire to be contacted</Checkbox>
                        </div>
                    </Checkbox.Group>
                </Form.Item>
                <Button 
                    type = "primary"
                    style={{float:"right"}}    
                >Done Editing</Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    title: state.builletins.Prayer_Title,
    prayer_bodyText: state.builletins.prayer_bodyText,
})

export default connect(mapStateToProps,{ setSmallSectionData })(PrayerRequestediting)