import React from 'react';
import {MoreOutlined, CloseOutlined} from '@ant-design/icons';
import Step from './Step';
import {Row, Col, Progress, Button } from 'antd';
import './admin.css';
import { color } from '../config/config';

const ProgressCard = (props) => {
    const userInfo = props.userInfo;
    const index = props.index;
    function setInfo(event) {
        event.stopPropagation();
        if(props.setInfo) props.setInfo(index);
    }
    return (
        <div className="admin-progress-card-container" style={{backgroundColor: color.background}} onClick={setInfo}>
            <div className="progress-card-container" >
                <div className="progress-card-toolbar">
                    <CloseOutlined className="progress-card-cross" style={{color: color.main}} />
                    <MoreOutlined className="progress-card-more" style={{color: color.main}} />
                </div>
                <div className="progress-card-avatar">
                    <div className="square"  style={{background: "url('/"+userInfo.avatar+"')",backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}>
                    
                    </div>
                </div>
                <p className="progress-card-name" >{userInfo.name}</p>
                <p className="progress-card-email" >{userInfo.email + ' | ' + userInfo.mobile_phone}</p>
                <div style={{display:'flex', justifyContent: "center", paddingTop:'2px'}}>
                    {/* <Button  size='small' style={{width: "80px", marginRight: "30px", borderRadius: "5px"}}>+ Add</Button> */}
                    {/* <Button size='small' style={{width: "120px", borderRadius: "5px", backgroundColor: color.main, color: "white"}} onClick={setInfo}>Edit</Button> */}
                </div>
            </div>
        </div>
    );
};

export default ProgressCard;