import React, {useState, useEffect} from 'react';
import {Form, Input, Button, notification} from 'antd';
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';
import { register } from '../../actions/auth';
import './Signup.scss';

const Signup = (props) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, error, title) => {
        api[type]({
          message: title,
          description: error.msg,
        });
    };
    useEffect(() => {
        props.errors.map((item, index) => openNotificationWithIcon('error',props.errors[index], "Errors"))
    }, [props.errors])


    useEffect(() => {
        if(props.isAuthenticated === true) {
            navigate('/main', {replace: true})
        }
    }, [props.isAuthenticated])

    const navigate = useNavigate();

    const signin = () => {
        navigate('/signin', {replace:true});
    }

    const [formData, setFormData] = useState({
        church_name: '',
        church_url: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirm_password: '',
    });

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
        props.register(formData);
    };
    
    return(
        <div className='signup-container'>
            {contextHolder}
            <div className='signup'>
                <h3 className='title'>Let's get Started</h3>
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
                        name = "bulletins"
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
                        name = "firstname"
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
                        name = "lastname"
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
                        name="email"
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
                        name = "password"
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
                        name = "confirm_password"
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
                    <p className='signin-link'>Already have an account?     <span
                        onClick={() => signin()}
                        >
                        sign in 
                        </span>
                    </p>
                    <Button 
                        type = "primary" 
                        htmlType='submit'
                    >
                        Create First BulletIn
                    </Button>
                </Form>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors
});
  

export default connect(mapStateToProps, {register} )(Signup)