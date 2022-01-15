import React from 'react';
import { useHistory } from "react-router-dom";
import { Row, Col } from 'antd';

import './dashboard.css';
import '../components/LeftSideBar';
import LeftSideBar from '../components/LeftSideBar';
import Content from '../components/Content';

function Dashboard() {
    let history = useHistory();

    return (
        <div className="welcome-div">
            <Row>
                <Col span = {6}>
                    <LeftSideBar />
                </Col>
                <Col span = {18}>
                    <Content />
                </Col>
            </Row>
        </div>
    );
    
}

export default Dashboard;
