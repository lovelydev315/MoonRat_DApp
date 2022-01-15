import React from 'react';
import {Col, Row, Button } from 'antd';

import './admin.css';

const ContentHeader = () => {
    return (
        <div>
            <Row gutter={[10,10]}>
                <Col span={3}> <Button size="medium">Filter 1</Button> </Col>
                <Col span={3}> <Button size="medium">Filter 2</Button> </Col>
                <Col span={3}> <Button size="medium">Filter 3</Button> </Col>
                <Col span={12}></Col>
                <Col span={3}> <Button size="medium">Filter 3</Button> </Col>
            </Row>
        </div>
    );
  };

export default ContentHeader;