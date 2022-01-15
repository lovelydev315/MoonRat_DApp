import React, { userState } from 'react';
import {Row, Col, Progress, Button } from 'antd';
import {CheckOutlined, UpOutlined, FolderOutlined, FileOutlined, PropertySafetyFilled} from '@ant-design/icons';
import { color } from '../config/config';

import './admin.css';

const DocumentRow = (props) => {
    const name = props.name;
    const alter = props.alter;
    const date = props.date;
    const phase = props.phase;
    const state = props.state;
    const margin = props.margin !== undefined ? props.margin : "3%";
    const folders = props.folders;
    const index = props.index;
    const expand = props.expand;
    const toggleExpand = props.toggleExpand || function() {};
    console.log(folders);
    function setInfo(event) {
        event.stopPropagation();
        if(props.setInfo) props.setInfo(index);
    }
    return (
        <div className="document-row-container" style={{backgroundColor: color.background, marginLeft: margin, marginRight: margin}}>
            <Row className="document-row" onClick={()=>toggleExpand(index)}>
                <Col span={2}>
                    <div style={{borderRadius:'9999px',backgroundColor:'white',width:'30px',height:'30px',margin:'0 auto', display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <CheckOutlined style={{color: color.main, fontWeight: "bold"}}/>
                    </div>
                </Col>
                <Col span={3} style={{display:'flex', alignItems: 'center'}}>
                    <div style={{width: "25px"}}>
                        <div className="square" style={{backgroundImage: "url('/"+props.avatar+"')", backgroundRepeat: "no-repeat", backgroundPosition:'center', backgroundSize: "cover"}}>
                        </div>
                    </div>
                    <p style={{marginBottom:'0px', paddingLeft:'12px', fontWeight: "bold", lineHeight:'1.3'}}>{name}</p>
                </Col>
                <Col span={5}>
                    <div style={{marginBottom:'0px', fontWeight: "bold", lineHeight:'2.0'}}>{alter}</div>
                </Col>
                <Col span={5}>
                    <div style={{marginBottom:'0px', fontWeight: "bold", lineHeight:'2.0'}}>{date}</div>
                </Col>
                <Col span={3}>
                    <div style={{marginBottom:'0px', fontWeight: "bold", lineHeight:'2.0'}}>{Math.round(state.stage * 100 / phase.stages.length)+"% | "+phase.name}</div>
                </Col>
                <Col span={6} style={{display:'flex', justifyContent: "flex-end", paddingTop:'2px'}}>
                    {/* <Button  size='small' style={{width: "80px", marginRight: "30px", borderRadius: "5px"}}>+ Add</Button> */}
                    {props.editVisible==true && <Button size='small' style={{width: "80px", marginRight: "30px", borderRadius: "5px", backgroundColor: color.main, color: "white"}} onClick={setInfo}>Edit</Button>}
                    
                </Col>
            </Row>
            <Row className="document-row-detail" style = {expand !== index && {display: "none"}}>
                {/* <Col span={24} className="document-row-detail-header">
                    <UpOutlined className="document-row-detail-header-toggle" style={{color: color.main}} />
                    <input type="text" className="document-row-detail-header-search" style={{color: color.main}} />
                </Col> */}
                {folders && folders.length && folders.map(each => {
                    return each && each.file_array.map((eachFile, index) => (
                        <Col span={4} style={{padding: "20px"}} key={"file"+index}>
                            <a style={{display: "flex", justifyContent: "space-around", alignItems: "center"}} href={"/documents/" + each.user_id + "/" + each.folder_name + "/" + eachFile.path} target="_blank">
                                <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                    <FolderOutlined style={{color: color.main, fontSize: "40px"}} />
                                    <span>{each.folder_name}</span>
                                </div>
                                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>
                                    <FileOutlined style={{color: color.main, fontSize: "30px", margin: "5px 0"}} />
                                    <span style={{ whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden'}}>{eachFile.name}</span>
                                </div>
                            </a>
                        </Col>
                    ))
                })}
            </Row>
        </div>
      
    );
  };

export default DocumentRow;