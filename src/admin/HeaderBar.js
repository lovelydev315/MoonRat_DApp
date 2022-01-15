import React from 'react';
import {Col, Row, Input, Button } from 'antd';

import './admin.css';

const ProgressContainer = () => {
  
    return (
        <div >
            <Row>
                <Col span={12}>
                    <div style={{width:'50%'}}>
                        <Input style={{borderRadius:'20px'}} placeholder="Search" />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{paddingRight:'10px', display:'inline-block', width:'50%'}}><Button size="medium">Export</Button> </div>
                    <div style={{paddingLeft:'10px', display:'inline-block' , width:'50%'}}><Button size="medium">+ Add</Button> </div>
                </Col>
            </Row>
        </div>
      
    );
  };

export default ProgressContainer;