import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {connect} from 'react-redux';

import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { UserTable } from "../../components";
import { Row, Col, Menu, Button } from 'antd';
import './UserManage.scss';

const items = [
    {
    label: 'User Management',
    key: 'user',
    icon: <UserOutlined />,
    },
    {
    label: 'Set Access Permission',
    key: 'bulletin',
    icon: <AppstoreOutlined />,
    },
]
  

const UserManage = (props) => {
    const [current, setCurrent] = useState('user');

    useEffect(() => {
        if(!props.isAuthenticated){
            navigate("/", {replace:true});
        }
    },[props.isAuthenticated])
    const onClick = (e) => {
      setCurrent(e.key);
    };
    const navigate = useNavigate();
    const renderContent = () => {
        switch(current){
            case "user":
                return <UserTable />
            default:
                break
        }
    }
    return(
        <>
            <Row className="button-group">
                <Button 
                    type = "primary" 
                    onClick = {() => navigate("/main", {replace: true})}
                    style={{
                        marginLeft: "50px",
                        marginTop: "30px"
                    }}
                >
                        Back to Main Page
                </Button>
            </Row>
            <Row className = "manage-container">
                <Col span = {5}>
                    <Menu
                        mode="inline"
                        onClick={onClick} 
                        selectedKeys={[current]}
                        style={{
                            width: 350,
                            height:700,
                        }}
                        items={items}
                    />
                </Col>
                <Col span = {19}>
                    {renderContent()}
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(UserManage);