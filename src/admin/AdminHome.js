import React, { useState, useEffect } from 'react';
import {Col, Row, Input, Button, Modal, Form, message } from 'antd';
import {useHistory, Link} from 'react-router-dom';

import placeholder from './user_icon.png';

import Sidebar from '../sidebar/Sidebar';
import ProgressCard from './ProgressCard';
import DocumentRow from './DocumentRow';

import { getFolder } from '../action/documentAction';
import { isAuth, getUsers, register } from '../action/authAction';
import { color } from '../config/config';
import SearchInput from './SearchInput.js';
import AdminSubHeader from './AdminSubHeader.js';

import './admin.css';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


const AdminHome = () => {
    let history = useHistory();

    const [{alt, src}, setImg] = useState({
        src: placeholder,
        alt: 'Upload an Image'
    });
    
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [officePhone, setOfficePhone] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [_state, set_state] = useState("");
    const [avatar, setAvatar] = useState(src);

    const [ expand, setExpand ] = useState(-1);
    const [ folders, setFolders ] = useState([]);
    const [ authority, setAuthority ] = useState('');
    const [users, setUsers] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [addModalVisible, setAddModalVisible] = useState(false);
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
            console.log(res.data)
                setUsers(res.data);
            
        });
        getFolder(function(res){
            if(!res.err) setFolders(res.data);
            else alert(res.data);
        });
    }, []);

    function toggleExpand(index) {
        if(index === expand) setExpand(-1);
        else setExpand(index);
    }

    const handleImg = (e) => {
        if(e.target.files[0]) {
            console.log(e.target.files[0]);
            setAvatar(e.target.files[0]);
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
        }
    }
  
    function onSubmit() {
        let formData = new FormData();
        formData.append("name", user );
        formData.append("email", email);
        formData.append("password", password);
        formData.append("mobile_phone", mobilePhone);
        formData.append("office_phone", officePhone);
        formData.append("address", address);
        formData.append("postal_code", postalCode);
        formData.append("country", country);
        formData.append("state", _state);
        formData.append("avatar", avatar);

        register(formData, function(res){
            console.log("suffessfully ")
            if (res.data == "Successfully Registered") {
                console.log("successfully")
                message.info("Successfully Registered")
                history.push('/');
            }
        })
    }

    const changeSearchKey = (value) => {
        setSearchKey(value.target.value);
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
                    <Sidebar authority={authority} selected="1"/>
                </Col>
                <Col span={20} className="admin-container" style={{backgroundColor: color.background}}>
                    <Row style={{marginBottom: "20px"}}>
                        <Col span={2}></Col>
                        <Col span={4}><h1 className="admin-title">Dashboard</h1></Col>
                        <Col span={10}>
                            <SearchInput onChange={changeSearchKey}/>
                        </Col>
                        <Col span={3}>
                            <Button className="admin-header-button disabled">Export</Button>
                        </Col>
                        <Col span={3}>
                            {/* <Button className="admin-header-button disabled">Export</Button> */}
                            <Button className="admin-header-button" style={{background: color.main}} onClick={()=>setAddModalVisible(true)}>+ Add</Button>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20}>
                            <AdminSubHeader title="Progress" to="/admin/progress" />
                            <div className="admin-progress-container">
                                <Row style={{width:'100%'}} gutter={[40,40]}>
                                    {
                                        filter_users.map((item, index)=>(
                                            index < 4 &&
                                            <Col sm={6} xs={12} key={index}>
                                                <ProgressCard key={index} index={index+1} userInfo={item}  />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            </div>
                        </Col>
                        {/* <Col span={5} style={{paddingLeft:'20px', paddingBottom:'20px'}}>
                            <div className="admin-recent-activity-container">
                                <AdminSubHeader title="Recent Activity" to="/admin/recent" />
                            </div>
                            
                        </Col> */}
                        <Col span={2}></Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20} style={{backgroundColor:'white'}}>
                            <AdminSubHeader title="Document" to="/admin/document" />
                            <p style={{margin: "10px 10%", textAlign: "left", color: "gray"}}>client</p>
                            <div className="admin-document-container">
                                {
                                    filter_users.map((item, index)=>(
                                        index < 4 &&
                                        <DocumentRow key={index} folders={folders.map(each => {if(each.user_id === item._id) return each})} name={item.name} alter="Jeff Baker" date={item.created_at.substring(0,10) + " " + item.created_at.substring(11,16)} state={item.user_state} phase={item.phases[item.user_state.phase]} avatar={item.avatar} index = {index} expand={expand} toggleExpand={toggleExpand} editVisible={false}/>
                                    ))
                                }
                                
                            </div>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </Col>
                <Modal className="user-upload-modal"
                title="Add Customer."
                centered
                visible={addModalVisible}
                onOk={()=>onSubmit()}
                onCancel={()=>setAddModalVisible(false)}
                >
                    <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
                        <Form.Item
                            name={['user', 'username']}
                            label="Name"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input onChange={(e)=>setUser(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="Email"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input onChange={(e)=>setEmail(e.target.value)} />
                        </Form.Item>

                        <Form.Item
                            name={['user', 'password']}
                            label="Password"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input type="password" onChange={(e)=>setPassword(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'mobilePhone']}
                            label="Mobile Phone"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input onChange={(e)=>setMobilePhone(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'officePhone']}
                            label="Office Phone"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input onChange={(e)=>setOfficePhone(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'address']}
                            label="Address"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input onChange={(e)=>setAddress(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'postalCode']}
                            label="Postal Code"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input onChange={(e)=>setPostalCode(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'country']}
                            label="Country"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input onChange={(e)=>setCountry(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'state']}
                            label="State"
                            rules={[
                                {
                                required: true,
                                },
                            ]}
                            >
                            <Input onChange={(e)=>set_state(e.target.value)} />
                        </Form.Item>
                        
                        <Form.Item
                            name={['user', 'avatar']}
                            label="Avatar"
                            type="file"
                            style={{margin:'0 auto'}}
                        >
                            <input 
                                type="file" 
                                accept=".png, .jpg, .jpeg" 
                                id="photo" 
                                className="register-visually-hidden"
                                onChange={handleImg}
                            />
                            <label htmlFor="photo" className="register-form-img__file-label">
                                
                            </label>
                            <img src={src} alt={alt} className="register-form-img__img-preview"/>
                        </Form.Item>
                        
                    </Form>
                </Modal>
            </Row>
      
    );
  };

export default AdminHome;