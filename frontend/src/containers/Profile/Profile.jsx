import React, {useState} from "react";
import {Row, Col, Button, Input, Form} from 'antd';
import {connect} from 'react-redux';

const Profile = (props) => {
    const [formData, setFormData] = useState({
        church_name: props.church_name,
        church_url: props.church_url,
        firstname: props.firstname,
        lastname: props.lastname,
        email: props.email,
        password: props.password,
        confirm_password: props.password,
    });
    const onFinish = (e) => {
        props.register('');
    };
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return(
        <div className="profile">
            <h3 style={{textAlign: "center"}}>Edit Profile</h3>
            <Row>
                <Col span = {4} />
                <Col span = {16}>
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
                                value = {props.church_name}
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
                                value = {props.church_url}
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
                                value = {props.firstname}
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
                                value = {props.lastname}
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
                                value = {props.email}
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
                                value = {props.password}
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
                                value = {props.confirm_password}
                                onChange={onChange}
                            />
                        </Form.Item>
                        <Button type = "primary" style={{float: "right", marginBottom: "20px"}}>Submit</Button>
                    </Form>
                </Col>
                <Col span = {4} />
            </Row>
        </div>
    )
}


const mapStateToProps = (state) => ({
    church_name: state.auth.church_name,
    church_url: state.auth.church_url,
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
    email: state.auth.email,
    paassword: state.auth.password,
})

export default connect(mapStateToProps)(Profile)