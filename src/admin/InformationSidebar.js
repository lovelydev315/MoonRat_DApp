import React, {useState} from "react";
import {Col, Row, Input, Button, Modal, Slider } from 'antd';
import {CloseOutlined, MoreOutlined} from '@ant-design/icons';
import AdminUserProfile from './AdminUserProfile';
import Phase from '../dashboard/content/home/Phase';
import "./admin.css";
import { color } from '../config/config';
import { updateCredit } from '../action/authAction';

const InformationSidebar = (props) => {
    const userInfo = props.userInfo || {};
    const setUnvisible = props.setUnVisible;
    const onChange = props.onChange || function() {};

    const [modalVisible, setVisible] = useState(false);

    function setModalVisible(modal2Visible) {
        setVisible({ modal2Visible });
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
            <p className="admin-information-card-email" style={{backgroundColor: color.background, padding:'0px 20px'}} >{userInfo.email + ' | ' + userInfo.mobile_phone}</p>
            <div style={{display: "flex", justifyContent: "space-around", padding: "10px 5%"}}>
                <Button className="admin-header-button" style={{background: "#498be8a1"}} onClick={()=>setVisible(true)}>Edit</Button>
                {/* <Button className="admin-header-button" style={{background: "#498be8a1", marginLeft: "20px"}}>Documents</Button> */}
            </div>
            <div style={{padding:'0px 30px'}}>
                {userInfo && Array.isArray(userInfo.phases) && userInfo.phases.length && userInfo.phases.map((each, index) => (
                    <Phase key={"phase"+index} userInfo={userInfo} phase={each} user_state={userInfo.user_state} />
                ))}
            </div>
            <PhaseSet userInfo={userInfo} visible={modalVisible} userState={userInfo.user_state} onChange={onChange} onClose={()=>setVisible(false)} />
        </div>
    );
};

const PhaseSet = (props) =>{
    const userInfo = props.userInfo;
    const userState = props.userState;
    const visible = props.visible;
    const onClose = props.onClose || function(){};
    const onChange = props.onChange || function(){};
    const [newUserState, setNewUserState] = useState(undefined);

    function changeStage(value, length) {
        setNewUserState(newUserState ? {stage: Math.round(value*length/100), phase: newUserState.phase} : {stage: Math.round(value*length/100), phase: userState.phase});
    }

    function raisePhase() {
        setNewUserState(newUserState ? {phase: newUserState.phase + 1, stage: 0} : {phase: userState.phase + 1, stage: 0});
    }

    function cancelChange() {
        setNewUserState(undefined);
        onClose();
    }

    function changeState() {
        if(!newUserState) {
            return onClose();
        }
        updateCredit(userInfo._id, newUserState, function(state) {
            if(state) {
                onChange(newUserState);
                onClose();
            }
            else {
                alert("something wrong. try again later.");
                setNewUserState(undefined);
                onClose();
            }
        })
    }
    return (
        <Modal
            title="Phase Edit"
            centered
            visible={visible}
            onOk={changeState}
            onCancel={cancelChange}
        >
        {userInfo && Array.isArray(userInfo.phases) && userInfo.phases.length && userInfo.phases.map((each, index) => (
            <div key={index}>
            {(index < (newUserState ? newUserState.phase : userState.phase)) ? <div>
                {userInfo.phases[index].name + ' | ' + 'Completed'}
            </div> : (index === (newUserState ? newUserState.phase : userState.phase)) ? <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <span>{userInfo.phases[index].name + ' | '}</span>
                    <Slider value={newUserState ? Math.round(newUserState.stage*100/userInfo.phases[index].stages.length) : Math.round(userState.stage*100/userInfo.phases[index].stages.length)} style={{width: "70%"}} onChange={(value) => changeStage(value, userInfo.phases[index].stages.length)} step={100/userInfo.phases[index].stages.length} />
                    <Button onClick={raisePhase}>finish</Button>
                </div> : <div>
                {userInfo.phases[index].name + ' | ' + 'Incomplete'}
            </div>}
            </div>
        ))}
        </Modal>
    )
}

export default InformationSidebar;