import React from 'react';
import {Col, Row, Input } from 'antd';

import HeaderBar from './HeaderBar';
import ContentHeader from './ContentHeader';

import './admin.css';

const ProgressContainer = () => {
  
    return (
        <div className="progress-container">
            <Row>
                <Col span={6}><h1 style={{textAlign:'left', display:'inline-block'}}>Progress</h1></Col>
                <Col span={18}><HeaderBar /></Col>
            </Row>
            <hr />
            <ContentHeader />
        </div>
      
    );
  };

export default ProgressContainer;