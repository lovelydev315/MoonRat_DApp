import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {Col, Row, message } from 'antd';
import Sidebar from '../sidebar/Sidebar';
import HomeUser from './content/home/HomeUser';
import { getUserInfo } from '../action/authAction';
import SearchInput from './SearchInput.js';

import './dashboard.css';
import { isAuth } from '../action/authAction';
import {color} from '../config/config';

const Dashboard = () => {
    let history = useHistory();
    const [ authority, setAuthority ] = useState('');
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        isAuth((res) => {
            if(!res.err) {
                setAuthority(res.data.authority);
                setUserInfo(res.data.customer);
            }
            else {
                message.warn("you are unauthorized", 3);
                history.push('/');
            }
        });
        getUserInfo(function(res){
            if(!res.err) setUserInfo(res.data);
            
            console.log(res.data);
        });
    }, [])
  
    return (
            <Row>
                <Col style={{backgroundColor:'gray', height:'100vh'}} span={3}>
                    <Sidebar authority={authority} />
                </Col>
                <Col span={21}  className="admin-container" style={{backgroundColor: color.background}}>
                    <Row style={{marginBottom: "20px"}}>
                        <Col span={2}></Col>
                        <Col span={4}><h1 className="admin-title">Documents</h1></Col>
                        <Col span={10}>
                            {/* <SearchInput /> */}
                        </Col>
                        <Col span={8}></Col>
                    </Row>
                    <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={20}>
                        {userInfo && <HomeUser userInfo={userInfo} />}
                    </Col>
                    <Col span={2}>

                    </Col>
                    </Row>
                </Col>
            </Row>
      
    );
  };

export default Dashboard;