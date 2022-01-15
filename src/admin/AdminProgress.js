import React, {useState, useEffect} from 'react';
import {Col, Row, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import ProgressCard from './ProgressCard';
import DocumentRow from './DocumentRow';

import { getCredit, getPhase } from '../action/documentAction';
import { isAuth, getUsers } from '../action/authAction';
import { color } from '../config/config';
import SearchInput from './SearchInput.js';
import InformationSidebar from './InformationSidebar.js';
import { AppstoreFilled, MenuOutlined } from '@ant-design/icons';

import './admin.css';

const AdminProgress = () => {
    let history = useHistory();
    const [ authority, setAuthority ] = useState('');
    const [ focus, setFocus ] = useState('detail');
    const [ users, setUsers ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ searchKey, setSearchKey ] = useState('');

    function setUnVisible () {
        setFocus('detail');
    }
    function progressClickHandler(item) {
        setFocus('list');
        setSelected(item);
        console.log(item);
    }
    function changeUserInfo(newUserState) {
        console.log(newUserState);
        const changedUsers = [...users];
        changedUsers.map((each) => {
            if(each._id === selected._id) {
                each.user_state = newUserState;
            }
        });
        console.log(changedUsers);
        setUsers(changedUsers);
    }
    useEffect(() => {
        isAuth((res) => {
            if(!res.err) {
                if (res.data.authority != "admin") {
                    message.warn("You don't have permission to enter this page.")
                    history.push('/');
                    
                }
                else setAuthority(res.data.authority);
            }
            else {
                message.warn("Unauthorized.")
                history.push('/');
            }
        });
        getUsers(function(res){
            setUsers(res.data);
            console.log(res.data);
        });
        
    }, [])
    const changeSearchKey = (value) => {
            setSearchKey(value);
    }
    const filter = (searchKey) => {
        return users.filter(each => each.name.indexOf(searchKey) !== -1);
    }

    let filter_users;
    if (searchKey) filter_users = filter(searchKey);
    else filter_users = users;

    return (
        <Row>
            <Col span={4} style={{paddingLeft: "20px"}}>
                <Sidebar authority={authority} selected="2"/>
            </Col>
            <Col span={focus === 'detail' ? 20 : 14} className="admin-container" style={{backgroundColor: color.background}}>
                <Row style={{marginBottom: "20px"}}>
                    <Col span={2}></Col>
                    <Col span={4}><h1 className="admin-title">Progress</h1></Col>
                    <Col span={10}>
                        <SearchInput onChange={(event) => changeSearchKey(event.target.value)} />
                    </Col>
                    <Col span={3}></Col>
                    <Col span={3}>
                        <Button className="admin-header-button disabled">Export</Button>
                        {/* <Button className="admin-header-button" style={{background: color.main}}>+ Add</Button> */}
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={20}>
                        <div style={{backgroundColor:'white', borderRadius:'8px'}}>
                             {/* <Row style={{marginBottom: "20px", paddingTop:'20px'}}>
                                <Col span={1}></Col>
                                <Col span={16} className="admin-process-button-div">
                                     <Button className="admin-header-button" style={{background: "#498be8a1"}}>Filter 1</Button>
                                    <Button className="admin-header-button" style={{background: "#498be8a1", marginLeft: "20px"}}>Filter 2</Button>
                                    <Button className="admin-header-button" style={{background: "#498be8a1", marginLeft: "20px"}}>Other</Button> 
                                </Col>
                                <Col span={4}></Col>
                                <Col span={2} className="admin-process-button-div-right">
                                     <div >
                                        <AppstoreFilled style={{color: color.main, border: (focus === "detail") ? "2px solid "+color.main : "1px solid "+color.main, borderRadius: "4px", padding: (focus === "detail") ? "2px" : "3px", opacity: (focus === "detail") ? 1 : 0.7}} />
                                    </div>
                                    <div >
                                        <MenuOutlined style={{color: color.main, border: (focus === "list") ? "2px solid "+color.main : "1px solid "+color.main, borderRadius: "4px", padding: (focus === "list") ? "2px" : "3px", opacity: (focus === "list") ? 1 : 0.7}} />
                                    </div> 
                                </Col> 
                                <Col span={1}></Col>
                            </Row>  */}
                            <Row>
                                <Col span={1}></Col>
                                <Col span={22}>
                                    <div className="admin-progress-container">
                                        <Row style={{width:'100%'}} gutter={[40,40]}>
                                            {
                                                filter_users.map((item, index)=>(
                                                    <Col sm={6} xs={12} key={index} onClick={() => progressClickHandler(item)}>
                                                        <ProgressCard index={index+1} userInfo={item} />
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                        
                                    </div>
                                </Col>
                                <Col span={1}></Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={2}>
                    </Col>
                </Row>
                
            </Col>
            <Col span={focus === 'detail' ? 0 : 6}>
                {selected &&
                    <InformationSidebar userInfo={selected} setUnVisible={setUnVisible} onChange={(newUserState)=>changeUserInfo(newUserState)} />
                }
            </Col>
        </Row>
    );
  };

export default AdminProgress;