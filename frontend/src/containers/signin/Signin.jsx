import React, {useState} from 'react'
import './Signin.scss'
import { Input, Button, Form } from 'antd';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

const Signin = () => {

    const navigate = useNavigate();
    
    const signup = () => {
        navigate('/signup', {replace: true})
    }

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFinish = (e) => {
        login(username, password);
    };

    return(
        <div className='login-container'>
            <div className="box">
                <h2>Login</h2>
                <Form
                    name = "basic"
                    autoComplete='off'
                    onFinish={onFinish}
                    layout = {"vertical"}
                >
                    <Form.Item
                        label = "Username"
                        name = "username"
                        rules={[
                            {
                              required: true,
                              message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input 
                            type="text"
                            placeholder='Input Username'
                            value = {username}
                            onChange = {onChange}
                        
                        />
                    </Form.Item>
                    <Form.Item
                        label = "Password"
                        name = "password"
                        rules={[
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input 
                            type="text"
                            placeholder='Input Password'
                            value = {password}
                            onChange = {onChange}
                        
                        />
                    </Form.Item>
                    <div className='signup-link'>
                        <p>Don't have an account?        
                            <span
                                onClick={() => signup()}
                            >Sign Up</span>
                        </p>
                    </div>
                    <Button
                        type = "primary"
                        htmlType='submit' 
                    >
                        Login    
                    </Button>
                </Form>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {login} )(Signin)