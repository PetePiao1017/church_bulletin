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
        navigate('/', {replace:true});
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    });


    const { 
        name,
        email,
        password,
        confirm_password,
    } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onFinish = (e) => {
        props.register(formData)
            .then(data => {
                if(data === "Pending"){
                    navigate('/pending', {replace: true})
                }
            })
    };
    
    return(
        <div className='signup-container'>
            {contextHolder}
            <div className='signup'>
                <h3 className='title'>Please Register At St.Paul</h3>
                <Form
                    name = "basic"
                    layout="vertical"
                    onFinish = {onFinish}
                    autoComplete='off'
                >
                    <Form.Item 
                        label="Full Name"
                        rules = {[
                            {   required: true, 
                                message: 'Please input your full name!'
                            }
                        ]}
                    >
                        <Input 
                            type = "text"
                            name = "name"
                            value = {name}
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
                    <p className='signin-link'>Already have an account?     
                    <span
                        onClick={() => signin()}
                        >
                        sign in 
                        </span>
                    </p>
                    <Button 
                        type = "primary" 
                        htmlType='submit'
                    >
                        Register
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
  

export default connect(mapStateToProps, {register})(Signup)