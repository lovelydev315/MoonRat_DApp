import React, { useEffect } from 'react';
import {Row, Col, Input, Button} from 'antd';
import {FolderOutlined, FileOutlined } from '@ant-design/icons';
import {getFolder} from '../../../action/documentAction';
import './home.css';

const Document = (props) => {

    const folder = props.folder;

    return (
        <div className="document-container">
            <h1>Document</h1>
            <Row>
                <Col span={7}>
                    <Input placeholder="Search" />
                </Col>
                <Col span={7}></Col>
                <Col span={2}></Col>
                <Col span={4}><Button>Create Folder</Button></Col>
                    
                <Col span={4}><Button>+Add</Button></Col>
            </Row>
            <Row style={{paddingTop:'20px'}}>
                <Col span={3}>
                    <div>
                        <FolderOutlined style={{color:'gray', fontSize:'40px', display:'block'}} />
                        <span style={{color:'gray', fontSize:'15px'}}>PDF</span>
                    </div>
                </Col>
            </Row>
            <div>
                <Row className='file-table-header'>
                    <Col span={2}></Col>
                    <Col span={2}></Col>
                    <Col span={5}>Name</Col>
                    <Col span={5}>File Type</Col>
                    <Col span={5}>Date Added</Col>
                    <Col span={5}>Modified</Col>
                </Row>
                <Row className="file-table-row">
                    <Col span={2}></Col>
                    <Col span={2} style={{fontSize:'20px', }}> <FileOutlined/> </Col>
                    <Col span={5}>Account</Col>
                    <Col span={5}>PDF</Col>
                    <Col span={5}>12-33 AM</Col>
                    <Col span={5}>14-40 PM</Col>
                </Row>
            </div>

            

        </div>
      
    );
};

export default Document;