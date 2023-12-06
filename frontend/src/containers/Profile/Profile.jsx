import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Radio} from 'antd';
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';

import { updateProfile } from '../../actions/auth';
const Profile = (props) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        church_name: '',
        church_url: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
    });

    const [value, setValue] = useState(1);

    useEffect(() => {
        if(props.user){
            setFormData({
                church_name: props.user.church_name,
                church_url: props.user.church_url,
                firstname: props.user.firstname,
                lastname: props.user.lastname,
                email: props.user.email,
                password: '',
                confirm_password: '',
            })
        }
    },[props.user])
    const { 
        church_name, 
        church_url,
        firstname,
        lastname,
        email,
        password,
        confirm_password,
    } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onFinish = (e) => {
        props.updateProfile(formData);
    };
    
    const onRadioChange = (e) => {
        setValue(e.target.value);
        if(e.target.value === 2){
            setFormData({
                ...formData,
            })
        }
    }
    return(
        <div className='signup-container'>
            <div className='signup'>
                <h3 className='title'>Edit Your Profile</h3>
                <Form
                    name = "basic"
                    layout="vertical"
                    onFinish = {onFinish}
                    autoComplete='off'
                >
                    <Form.Item 
                        label="Church Name"
                        rules = {[
                            {   required: true, 
                                message: 'Please input your Church name!'
                            }
                        ]}
                    >
                        <Input 
                            type = "text"
                            name = "church_name"
                            value = {church_name}
                            onChange={onChange}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Choose the website for your bulletins"
                        rules = {[
                            {   required: true, 
                                message: 'Please input your bulletins!'
                            }
                        ]}    
                    >
                        <Input 
                            type = "text"
                            name = "church_url"
                            value = {church_url}
                            onChange={onChange}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="First Name"
                        rules = {[
                            {   required: true, 
                                message: 'Please input your first name'
                            }
                        ]}    
                    >
                        <Input 
                            type = "text"
                            name = "firstname"
                            value = {firstname}
                            onChange={onChange}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Last Name"
                        rules = {[
                            {   required: true, 
                                message: 'Please input your last name!'
                            }
                        ]}    
                    >
                        <Input 
                            type = "text"
                            name = "lastname"
                            value = {lastname}
                            onChange={onChange}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Email Address"
                        rules = {[
                            {   required: true, 
                                message: 'Please input your email!'
                            }
                        ]}
                    >
                        <Input 
                            type = "text"
                            name = "email"
                            value = {email}
                            onChange={onChange}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Input Password"
                        rules = {[
                            {   required: true, 
                                message: 'Please input your password!'
                            }
                        ]}
                    >
                        <Input 
                            type = "password"
                            name = "password"
                            value = {password}
                            onChange={onChange}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Confirm Password"
                        rules = {[
                            {   required: true, 
                                message: 'Please confirm your password'
                            }
                        ]}
                    >
                        <Input 
                            type = "password"
                            name = "confirm_password"
                            value = {confirm_password}
                            onChange={onChange}
                        />
                    </Form.Item>
                    <Button 
                        type = "primary" 
                        htmlType='submit'
                    >
                        Submit
                    </Button>
                    <Button 
                        type = "primary"
                        onClick={() => navigate('/main', {replace: true})}
                        style={{float: "right"}}
                    >
                        Go Back
                    </Button>
                </Form>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    user: state.auth.user
});
  

export default connect(mapStateToProps, {updateProfile})(Profile)