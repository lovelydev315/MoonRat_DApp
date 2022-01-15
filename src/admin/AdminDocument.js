import React, {useState, useEffect} from 'react';
import {Col, Row, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import ProgressCard from './ProgressCard';
import DocumentRow from './DocumentRow';
import Phase from '../dashboard/content/home/Phase';
import DocumentSidebar from './DocumentSidebar';
import DocumentCard from './DocumentCard';

import { getFolder } from '../action/documentAction';
import { isAuth, getUsers } from '../action/authAction';
import { color } from '../config/config';
import SearchInput from './SearchInput.js';
import InformationSidebar from './InformationSidebar.js';
import { AppstoreFilled, MenuOutlined } from '@ant-design/icons';

import './admin.css';

const AdminDocument = () => {
    let history = useHistory();
    const [ detail, setDetail ] = useState(false);
    const [ authority, setAuthority ] = useState('');
    const [ info, setInfo ] = useState(-1);
    const [ users, setUsers ] = useState([]);
    const [ searchKey, setSearchKey ] = useState('');
    const [folders, setFolders] = useState([]);
    const [expand, setExpand] = useState(-1);

    function toggleExpand(index) {
        if(index === expand) setExpand(-1);
        else setExpand(index);
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
        getFolder(function(res) {
            if(!res.err) setFolders(res.data);
            else alert(res.data);
            console.log("folder: ",res.data);
        })
        
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
                <Sidebar authority={authority} selected="3" />
            </Col>
            <Col span={info === -1 ? 20 : 14} className="admin-container" style={{backgroundColor: color.background}}>
                <Row style={{marginBottom: "20px"}}>
                    <Col span={2}></Col>
                    <Col span={4}><h1 className="admin-title">Documents</h1></Col>
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
                            <Row style={{marginBottom: "20px", paddingTop:'20px'}}>
                                <Col span={1}></Col>
                                <Col span={16} className="admin-process-button-div">
                                    {/* <Button className="admin-header-button" style={{background: "#498be8a1"}}>Filter 1</Button>
                                    <Button className="admin-header-button" style={{background: "#498be8a1", marginLeft: "20px"}}>Filter 2</Button>
                                    <Button className="admin-header-button" style={{background: "#498be8a1", marginLeft: "20px"}}>Other</Button> */}
                                </Col>
                                <Col span={4}></Col>
                                <Col span={2} className="admin-process-button-div-right">
                                    <div >
                                        <AppstoreFilled style={{color: color.main, border: detail ? "2px solid "+color.main : "1px solid "+color.main, borderRadius: "4px", padding: detail ? "2px" : "3px", opacity: detail ? 1 : 0.7}} onClick={()=>setDetail(true)} />
                                    </div>
                                    <div >
                                        <MenuOutlined style={{color: color.main, border: !detail ? "2px solid "+color.main : "1px solid "+color.main, borderRadius: "4px", padding: !detail ? "2px" : "3px", opacity: !detail ? 1 : 0.7}} onClick={()=>setDetail(false)} />
                                    </div>
                                </Col>
                                <Col span={1}></Col>
                            </Row>
                            <Row>
                                <Col span={1}></Col>
                                <Col span={22}>
                                {
                                    !detail ? filter_users.map((item, index)=>(
                                        <DocumentRow key={index} name={item.name}  folders={folders.map(each => {if(each.user_id === item._id) return each})} name={item.name} alter="Jeff Baker" date={item.created_at.substring(0,10) + " " + item.created_at.substring(11,16)} state={item.user_state} phase={item.phases[item.user_state.phase]} avatar={item.avatar} margin="5px" index={index} expand={expand} toggleExpand={toggleExpand} setInfo={setInfo} editVisible={true}/>
                                    )) : <div style={{display: "flex", flexFlow: "wrap", justifyContent: "space-around"}}>
                                        {filter_users.map((item, index)=>(
                                            <div style={{flex: "0 0 50px", width: "300px", margin: "10px"}} key={index}>
                                                <DocumentCard userInfo={item} index={index} setInfo={setInfo} />
                                            </div>
                                        ))}
                                    </div>
                                }
                                </Col>
                                <Col span={1}></Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={2}>
                    </Col>
                </Row>
                
            </Col>
            <Col span={info === -1 ? 0 : 6}>
                <DocumentSidebar userInfo={users[info]} setUnVisible={()=>setInfo(-1)} />
            </Col>
        </Row>
    );
  };

export default AdminDocument;