import React, {useState} from "react";
import {Progress, Input, Row, Col, Upload, message, Button} from 'antd';
import {CloseOutlined, FileAddOutlined, MoreOutlined} from '@ant-design/icons';
import ImgPrev from './ImgPrev';
import { color } from '../config/config';
import "./admin.css"
import {getFolder, createNewFolder, uploadDocument } from '../action/documentAction';

const { Dragger } = Upload;

const DocumentSidebar = (props) => {
    const userInfo = props.userInfo || {};
    const setUnvisible = props.setUnVisible;
    const [file, setFile] = useState(undefined);
    function sendFile() {
        let formData = new FormData();
        formData.append("user_id", userInfo._id);
        formData.append("folder_name", "admin");
        formData.append("document", file.file.originFileObj);

        uploadDocument(formData, function(res){
            if (res.status == 200){
                message.info("Document has upload successfully.",3);
                setFile(undefined);
            }
            else console.log('error')
        });
    }
    return (
        <div>
            <button onClick={setUnvisible} className="circle-return-btn" style={{backgroundColor: color.background, color: color.main, fontWeight: "bolder", fontFamily: "monospace"}}>&gt;</button>
            <button onClick={setUnvisible} className="circle-detail-btn" style={{backgroundColor: color.background, color: color.main, fontWeight: "bolder", fontFamily: "monospace"}}><MoreOutlined style={{fontSize: "16px", fontWeight: "900"}} /></button>
            <div style={{padding: "15% 15% 4% 15%"}}>
                <div className="progress-card-avatar">
                    <div className="square" style={{backgroundImage: "url('/"+userInfo.avatar+"')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
                    </div>
                </div>
            </div>
            <p className="admin-information-card-name" >{userInfo.name}</p>
            <div style={{padding:'10px'}}>
                <Row style={{marginBottom:'10px'}}>
                    <Input placeholder="Basic usage" value={userInfo.name} style={{width:'100%'}} />
                </Row>
                <Row style={{marginBottom:'10px'}}>
                    <Input placeholder="Basic usage" value={userInfo.email} style={{width:'100%'}} />
                </Row>
                <Row gutter={[5,5]}>
                    <Col span={12}>
                        <Input placeholder="Basic usage" value={userInfo.mobile_phone} style={{width:'100%'}} />
                    </Col>
                    <Col span={12}>
                        <Input placeholder="Basic usage" value={userInfo.office_phone} style={{width:'100%'}} />
                    </Col>
                </Row>

                <Row style={{marginTop:'30px', marginBottom:'10px'}}>
                    <Input placeholder="Basic usage" value={userInfo.address} style={{width:'100%'}} />
                </Row>
                <Row gutter={[5,5]} style={{marginBottom:'10px'}}>
                    <Col span={8}>
                        <Input placeholder="Basic usage" value={userInfo.postal_code} style={{width:'100%'}} />
                    </Col>
                    <Col span={8}>
                        <Input placeholder="Basic usage" value={userInfo.country} style={{width:'100%'}} />
                    </Col>
                    <Col span={8}>
                        <Input placeholder="Basic usage" value={userInfo.state} style={{width:'100%'}} />
                    </Col>
                </Row>
                <Dragger maxCount={1} fileList={file && file.fileList} onChange={setFile} multiple={false}>
                    <p className="ant-upload-drag-icon" style={{paddingTop:'20px', marginBottom:'0px'}}>
                    <FileAddOutlined />
                    </p>
                    <p style={{ paddingBottom:'20px'}}>Drag And Drop</p>
                </Dragger>
                <Row style={{marginTop:'10px', justifyContent:'center'}}>
                    <Button type="primary" style={{width:'60%'}} onClick={sendFile}>Confirm</Button>
                </Row>
            </div>
            
        </div>
    );
};

export default DocumentSidebar;