import React, {useEffect,useState} from 'react';
import {Row, Col} from 'antd';
import UserProfile from './UserProfile';
import Document from './Document';
import './home.css';


const HomeUser = (props) => {

    const userInfo = props.userInfo;
    
    return (
        <div className="home-container">
            <Row>
                <Col span={6}>
                    <UserProfile userInfo={userInfo} />
                </Col>
                <Col span={18}>
                    <Document />
                </Col>
            </Row>
        </div>
      
    );
};

export default HomeUser;