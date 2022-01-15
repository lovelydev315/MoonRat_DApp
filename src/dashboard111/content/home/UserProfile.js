import React from 'react';
import {Row, Col, Avatar, Button} from 'antd';
import Phase from './Phase';
import './home.css';
import {color, height} from '../../../config/config';


const UserProfile = (props) => {
    
    const userInfo = props.userInfo;

    return (
        <div className="user-profile-container">
            <div className="admin-subheader" style={{backgroundColor: color.main}}>
                <h3>Progress Bar</h3>
            </div>
            <div className="user-profile-avatar-container">
                <Avatar 
                    style={{margin:'auto', backgroundColor:color.main}}   
                    size={100} 
                    icon={<img className="user-profile-image" width="50%" src={'/'+userInfo.avatar} />} 
                />
            </div>
            <h1 className="user-profile-name-container">{userInfo.name}</h1>
            <h5 className = "user-profile-email-container" style={{backgroundColor: color.background}}>{userInfo.email} | {userInfo.mobile_phone}</h5>
            <div className= "user-profile-toolbar-container"></div>
            {/* <Row>
                <Col span={12} style={{padding: "10px"}}>
                    <Button className="light-btn" style={{backgroundColor: color.light}}>Edit</Button>
                </Col>
                <Col span={12} style={{padding: "10px"}}>
                    <Button className="light-btn" style={{backgroundColor: color.light}}>Document</Button>
                </Col>
            </Row> */}
            <div style={{marginTop:'10px', padding:'0px 20px'}}>
                {userInfo.phases.length && userInfo.phases.map((each, index) => (
                    <Phase key={"credit"+index} phase={each} user_state={userInfo.user_state} state="in complete" number={index + 1} />
                ))}
            </div>
            

        </div>
      
    );
};

export default UserProfile;