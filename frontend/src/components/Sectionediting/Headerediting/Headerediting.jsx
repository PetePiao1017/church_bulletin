import React from 'react';
import {Form, Input, DatePicker, Button} from 'antd';
import {connect} from 'react-redux';
import { setHeaderDate, setHeaderTitle } from '../../../actions/bulletins';

import CustomUpload from "../../CustomUpload/CustomUpload"; 
import "./Headerediting.scss"


const Headerediting = (props) => {
    


    const onDateChange = (date, dateString) => {
        props.setHeaderDate(dateString)
    }

    const ontitleChange = (e) => {
        props.setHeaderTitle(e.target.value);
    }

    
    return(
        <div>
            <h3>Edit Header</h3>
            <Form layout='vertical' className='form-container'>
                <Form.Item label = "BULLETIN TITLE">
                    <Input 
                        type = "text"
                        name = "title"
                        value={props.title}
                        onChange={ontitleChange}
                    />
                </Form.Item>
                <Form.Item label = "DATE">
                    <DatePicker
                        onChange={onDateChange}
                        style={{width:"100%"}}
                    />
                </Form.Item>
                <Form.Item label = "IMAGE">
                    <CustomUpload 
                        type = {"Headerediting"}
                    />
                </Form.Item>
                <Button 
                    type = "primary"
                    style={{float:"right"}}    
                >
                    Done Editing
                </Button>
            </Form>
        </div>
        
    )
}

const mapStateToProps = (state) =>  ({
    title: state.builletins.header_title,
})


export default connect(mapStateToProps, {setHeaderDate, setHeaderTitle})(Headerediting)