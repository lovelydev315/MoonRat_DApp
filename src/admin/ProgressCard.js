import React from 'react';
import {MoreOutlined, CloseOutlined} from '@ant-design/icons';
import Step from './Step';
import './admin.css';
import { color } from '../config/config';

const ProgressCard = (props) => {
    const index = props.index || 1;
    const row = props.row || 4;
    const userInfo = props.userInfo;
    const marginFalse = props.margin === false ? true : false;
    let marginStyle;
    if(marginFalse) {
        marginStyle = (index % row === 0 || index % row === 1) ? {margin: "0", width: 100/(row+1)+"%"} : {margin: "0 "+100/(row+1)/(row-1)+"%", width: 100/(row+1)+"%"};
    }
    else {
        marginStyle = {margin: "0 "+100/(row+1)/(row+1)+"%", width: 100/(row+1)+"%"};
    }
    return (
        <div className="admin-progress-card-container" style={{backgroundColor: color.background}}>
            <div className="progress-card-container" >
                <div className="progress-card-toolbar">
                    <CloseOutlined className="progress-card-cross" style={{color: color.main}} />
                    <MoreOutlined className="progress-card-more" style={{color: color.main}} />
                </div>
                <div className="progress-card-avatar">
                    <div className="square"  style={{background: "url('/"+props.userInfo.avatar+"')",backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", }}>
                       
                    </div>
                </div>
                <p className="progress-card-name" >{props.userInfo.name}</p>
                <p className="progress-card-email" >{props.userInfo.email + ' | ' + props.userInfo.mobile_phone}</p>
                <Step current={userInfo.user_state.phase} length={Array.isArray(userInfo.phases) && userInfo.phases.length} height="15px" color={color.main} marginTop="15px" />
            </div>
        </div>
    );
};

export default ProgressCard;