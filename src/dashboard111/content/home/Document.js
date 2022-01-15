import React, { useState, useEffect } from 'react';
import {Row, Col, Input, Button, Modal, message} from 'antd';
import {FolderOutlined, FileOutlined, MenuOutlined, AppstoreOutlined, CheckOutlined } from '@ant-design/icons';
import {getFolder, createNewFolder, uploadDocument } from '../../../action/documentAction';
import {color, height} from '../../../config/config';
import SearchInput from './SearchInput';
import './home.css';

const Document = (props) => {

    const [ folders, setFolders ] = useState([]);
    const [ searchKey, setSearchKey ] = useState('');
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [fileName, setFileName] = useState('');
    const [folderName, setFolderName] = useState('general');
    const [document, setDocument] = useState({});

    useEffect(() => {
        getFolder(function(res){
            if(!res.err) {
                setFolders(res.data);
            }
        });
    }, []);
    
    const filter = (search) => {
        let searchKey = search.target.value;
        let folder_buf = JSON.parse(JSON.stringify(folders));
        let arr_buf = [];
        for (let j = 0 ; j < folder_buf.length ; j++){
            arr_buf=[];
            for (let i = 0 ; i<folder_buf[j].file_array.length ; i++) {
                if (folder_buf[j].file_array[i].name.includes(searchKey)) arr_buf.push(folder_buf[j].file_array[i]);
            }
            folder_buf[j].file_array = arr_buf;
        }
        
        return folder_buf;
    }

    const addNewFolder = () => {
        let new_folder_name = window.prompt('Type here');
        if (new_folder_name !== null) {
            createNewFolder(new_folder_name, (res) => {
                if(res.err) message.error("Failed.");
                let new_folders = JSON.parse(JSON.stringify(folders));
                new_folders.push(res.data);
                new_folders = new_folders.sort((a,b) => a.folder_name.localeCompare(b.folder_name));
                setFolders(new_folders);
            });
        }
    }

    const changeSearchKey = (value) => {
        setSearchKey(value);
    }

    const handleDocument = (e) =>{
        if(e.target.files[0]) {
            setDocument(e.target.files[0]);
        }
    }

    const uploadHandler = () => {
        setAddModalVisible(false);
        let formData = new FormData();
        formData.append("folder_name", folderName );
        formData.append("file_name", fileName );
        formData.append("document", document);
        console.log(document);

        uploadDocument(formData, function(res){
            if (res.status == 200){
                message.info("Document has upload successfully.",3);
                const newFolders = [...folders];
                let state;
                for(let i = 0; i < newFolders.length; i++) {
                    if(newFolders[i]._id === res.data._id) {
                        newFolders[i] = res.data;
                        state = true;
                    }
                }
                if(!state) newFolders.push(res.data);
                setFolders(newFolders);
            }
        });

    }


    let filter_folders;
    if (searchKey!="") filter_folders = filter(searchKey);
    else filter_folders = folders;

    return (
        <div className="user-document-container">
            <div className="admin-subheader" style={{backgroundColor: color.main}}>
                <h3>Documents</h3>
            </div>
            <div>
                <Row style={{marginTop:'20px', display: "flex", alignItems: "center "}}>
                    <Col span={1}></Col>
                    <Col span={6}>
                        <SearchInput onChange={changeSearchKey} />
                    </Col>
                    <Col span={6}>
                        
                        </Col>
                    <Col span={10}>
                        <div style={{width:'50px',float:'right'}}>
                            {/* <Row>
                                <Col span={12} className="user-document-grid-list-btn active" style={{color:color.main, borderColor:color.main}} >
                                    <AppstoreOutlined/>
                                    
                                </Col>
                                <Col  span={12} className="user-document-grid-list-btn" style={{color:color.main, borderColor:color.main}} >
                                    <MenuOutlined/>
                                </Col>
                            </Row> */}
                            <Button style={{background: color.main, color: "white", borderRadius: "5px", border: "none", lineHeight: "25px"}} onClick={()=>setAddModalVisible(true)}>+ Add</Button>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <div style={{marginTop:'20px'}}>
                    <Row className='user-document-file-table-header'>
                        <Col span={1}></Col>
                        <Col span={2}></Col>
                        <Col span={2}></Col>
                        <Col span={4}>Name</Col>
                        <Col span={4}>File Type</Col>
                        <Col span={6}>Date Added</Col>
                        <Col span={5}>Modified</Col>
                        <Col span={1}></Col>
                    </Row>
                    {filter_folders.map(each => {
                        return each.file_array.map((eachFile, index) => (
                            <a href={"/documents/" + each.user_id + "/" + each.folder_name + "/" + eachFile.path} target="_blank" key={"file"+index}>
                                <Row style={{backgroundColor:color.light,paddingLeft:'10px',paddingRight:'10px'}} className="user-document-file-table-row" key={"folder"+index}>
                                    <Col span={1}> <div style={{width:'25px',height:'25px', backgroundColor:'white',borderRadius:'5px'}}><CheckOutlined style={{color:color.main}} /></div></Col>
                                    <Col span={2}>
                                        <div style={{display: "flex"}}>
                                            <FolderOutlined style={{fontSize:'25px', color:color.main, lineHeight:'0.3'}}/>
                                            <span>{each.folder_name}</span>
                                        </div>
                                    </Col>
                                    <Col span={2}></Col>
                                    <Col span={4} style={{lineHeight:'1.8'}}>{eachFile.name}</Col>
                                    <Col span={4}>{eachFile.type}</Col>
                                    <Col span={6} style={{lineHeight:'1.8'}}>{each.created_at.substring(0,10)}</Col>
                                    <Col span={5} style={{lineHeight:'1.8'}}>{each.updated_at.substring(0,10)}</Col>
                                    <Col span={1}></Col>
                                </Row>
                            </a>
                        ))
                    })}
                </div>
            </div>
            <Modal className="user-upload-modal"
                title="File Upload."
                centered
                visible={addModalVisible}
                onOk={()=>uploadHandler()}
                onCancel={()=>setAddModalVisible(false)}
            >
                <Input placeholder="Please input folder name." value="general" style={{margin:'20px 0px'}} onChange={(e)=>setFolderName(e.target.value)} />
                <Input placeholder="Please input file name." style={{margin:'20px 0px'}} onChange={(e)=>setFileName(e.target.value)} />
                <Input type="file" onChange={handleDocument} />
            </Modal>
        </div>
      
    );
};

export default Document;