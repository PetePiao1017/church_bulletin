import React from 'react'
import {Row, Col} from 'antd';
import { useNavigate } from "react-router-dom";
import './Main.scss';

const Main = () => {
    const navigate = useNavigate();
    return(
        <Row className='main-container'>
            <Col span = {4} />
            <Col className = "list-container" span = {16}>
                <span 
                    className='list-bulletin'
                    onClick={() => navigate('/public', {replace: true})}
                >
                    Create Public Bulletin
                </span>
                <span 
                    className='list-bulletin'
                    onClick={() => navigate('/private', {replace: true})}
                >
                    Create Private Bulletin
                </span>
            </Col>
            <Col span = {4} />
        </Row>
    )
}

export default Main;