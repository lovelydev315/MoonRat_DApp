import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {color, border_radius} from  '../config/config';
import {Carousel, Row, Col, Input} from 'antd';
import {LikeFilled, CopyOutlined, SendOutlined } from '@ant-design/icons';
import { message} from 'antd';
import copy from "copy-to-clipboard"; 

import './component.css';


function Content() {
    let history = useHistory();

    const [ page, setPage ] = useState('1');

    useEffect(() => {
        
    }, [])

    function setClipboard(value, message_str) {
        copy(value);
        message.success(message_str, 2);
    }
    if (page==2)
    return (
        <div className="content-container">
            <div className = "toolbar-container">
                <div className = "toolbar-item" onClick={()=>setPage(1)}>
                    Claim BNB
                </div>
                <div className = "toolbar-item" onClick={()=>setPage(2)}>
                    Disruptive Transfer
                </div>
                <div className = "toolbar-item" onClick={()=>setPage(3)}>
                    Statistic
                </div>
            </div>
            <div className="content-body-container" style={{borderRadius:border_radius.main_component, borderColor:color.line_color, backgroundColor:color.component_background, paddingTop:'80px', paddingBottom:'80px'}}>
                <div className="transfer-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.small_component_background}}>
                   <p >Disruptive Transfer between 2 wallets.</p>
                   <Input style={{backgroundColor:'transparent', color:'white', borderRadius:border_radius.button, marginTop:'20px'}} placeholder="Recipient Address" />
                   <Input style={{backgroundColor:'transparent', color:'white', borderRadius:border_radius.button, marginTop:'20px'}} placeholder="Amount Smart" />
                   <div className="send-button-container" style={{borderRadius:border_radius.button, marginTop:'20px'}}>
                        <SendOutlined />
                        Transfer
                    </div>
                </div>
            </div>
        </div>
    );
    else if(page == 1)
    return (
        <div className="content-container">
            <div className = "toolbar-container">
                <div className = "toolbar-item" onClick={()=>setPage(1)}>
                    Claim BNB
                </div>
                <div className = "toolbar-item" onClick={()=>setPage(2)}>
                    Disruptive Transfer
                </div>
                <div className = "toolbar-item" onClick={()=>setPage(3)}>
                    Statistic
                </div>
            </div>
            <div className="content-body-container" style={{borderRadius:border_radius.main_component, borderColor:color.line_color, backgroundColor:color.component_background}}>
                <div className = "carousel-container">
                    <Carousel autoplay>
                        <div >
                            <img className="slide-image" src = {process.env.PUBLIC_URL+"/slide1.png"} />
                            <div style={{height:'60px'}}></div>
                        </div>
                        <div>
                            <img className="slide-image" src = {process.env.PUBLIC_URL+"/slide2.png"} />
                            <div style={{height:'60px'}}></div>
                        </div>
                    </Carousel>
                </div>
                <div className="claim-reward-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.small_component_background}}>
                    <Row>
                        <Col span={4} style={{borderRight:'2px solid', borderColor:color.line_color}}>
                            <h2 style={{color:'white'}}>Reward Pool</h2>
                            <img className="icon-image" src={process.env.PUBLIC_URL+"/reward.png"}/>
                            <h2 style={{color:'white'}}>BNB 247.04</h2>
                        </Col>
                        <Col span={20}>
                            <h3 >
                                My Reward: <span>0.000000 BNB</span>
                            </h3>
                            <p style={{color:'blue'}}>pool is always changing based on buys, and collectors by others, learn more here.</p>
                            <h3>
                                You will received 0.000000 BNB (after tax)
                            </h3>
                            <div className="claim-button-container" style={{borderRadius:border_radius.button}}>
                                <LikeFilled />
                                Claim My Reward
                            </div>
                        </Col>
                    </Row>
                </div>
                <Row gutter={5} style={{marginTop:'20px'}}>
                    <Col span={12} >
                        <div className="item-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.small_component_background, marginRight:'20px'}}>
                            <Row>
                                <Col span={4} style={{borderRight:'2px solid', borderColor:color.line_color}}>
                                    <img className="item-icon-image" src={process.env.PUBLIC_URL+"/reward.png"}/>
                                </Col>
                                <Col span={20}>
                                    <h3>
                                        Max Transaction Amount
                                    </h3>
                                    <h3>
                                        Smart 100,000,000,000 
                                        <span className="copy-button" onClick={()=>setClipboard("sdfsdfsdf", "Copy Smart Transaction Amount to Clipboard Successfully!")}>
                                            <CopyOutlined />
                                        </span>
                                         | BNB 2.3632 
                                        <span className="copy-button" onClick={()=>setClipboard("sdfsdfsdf", "Copy BNB Transaction Amount to Clipboard Successfully!")}>
                                            <CopyOutlined />
                                        </span>
                                    </h3>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={12} >
                        <div className="item-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.small_component_background, marginLeft:'20px'}}>
                            <Row>
                                <Col span={4} style={{borderRight:'2px solid', borderColor:color.line_color}}>
                                    <img className="item-icon-image" src={process.env.PUBLIC_URL+"/reward.png"}/>
                                </Col>
                                <Col span={20}>
                                    <h3>
                                        Total Liquidity Pool
                                    </h3>
                                    <h3>
                                        $ 2,836,334.20
                                    </h3>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row gutter={5} style={{marginTop:'20px'}}>
                    <Col span={12} >
                        <div className="item-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.small_component_background, marginRight:'20px'}}>
                            <Row>
                                <Col span={4} style={{borderRight:'2px solid', borderColor:color.line_color}}>
                                    <img className="item-icon-image" src={process.env.PUBLIC_URL+"/reward.png"}/>
                                </Col>
                                <Col span={20}>
                                    <h3>
                                        Total BNB in Liquidity Pool
                                    </h3>
                                    <h3>
                                        BNB 3,998.67 | BUSD 1,424,005.15
                                    </h3>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={12} >
                        <div className="item-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.small_component_background, marginLeft:'20px'}}>
                            <Row>
                                <Col span={4} style={{borderRight:'2px solid', borderColor:color.line_color}}>
                                    <img className="item-icon-image" src={process.env.PUBLIC_URL+"/reward.png"}/>
                                </Col>
                                <Col span={20}>
                                    <h3>
                                        Current 1mil Smart Price
                                    </h3>
                                    <h3>
                                        $ 0.008250916
                                    </h3>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                
            </div>
        </div>
    );
    else 
    return (
        <div className="content-container">
            <div className = "toolbar-container">
                <div className = "toolbar-item" onClick={()=>setPage(1)}>
                    Claim BNB
                </div>
                <div className = "toolbar-item" onClick={()=>setPage(2)}>
                    Disruptive Transfer
                </div>
                <div className = "toolbar-item" onClick={()=>setPage(3)}>
                    Statistic
                </div>
            </div>
            <div className="content-body-container" style={{borderRadius:border_radius.main_component, borderColor:color.line_color, backgroundColor:color.component_background, }}>
                <div className="statistics1-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.small_component_background}}>
                   <Row gutter={10} style= {{paddingBottom:'10px',borderBottom:'2px solid', borderColor:color.line_color}}>
                       <Col span={6}>
                            <p>Symbol</p>
                            <p>SMART</p>
                       </Col>
                       <Col span={6}>
                            <p>Total Supply</p>
                            <p>1,000,000,000,000,000</p>
                       </Col>
                       <Col span={6}>
                            <p>Holders</p>
                            <p>Updating...</p>
                       </Col>
                       <Col span={6}>
                            <p>Token Address</p>
                            <p>0x123123...1232</p>
                       </Col>
                   </Row>
                   <Row gutter={10} style= {{paddingTop:'10px'}}>
                       <Col span={6}>
                            <p>Volume</p>
                            <p>Updating...</p>
                       </Col>
                       <Col span={6}>
                            <p>Market Cap</p>
                            <p>$7,576,138.08</p>
                       </Col>
                       <Col span={6}>
                            <p>Current Circulating Supply</p>
                            <p>Updating...</p>
                       </Col>
                       <Col span={6}>
                            <p>Burned</p>
                            <p>8.63%</p>
                       </Col>
                   </Row>
                </div>

                <div className="statistics2-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.small_component_background}}>
                   <Row gutter={10} >
                       <Col span={6}>
                            <p>Current 1mil SMART Price</p>
                            <p>$0.008250196</p>
                       </Col>
                       <Col span={6}>
                            <p>Total Liquidity Pool</p>
                            <p>$2,836,334.20</p>
                       </Col>
                       <Col span={6}>
                            <p>Total BNB in Liquidity Pool</p>
                            <p>BNB 3,998.67 | BUSD 1,425,244.74</p>
                       </Col>
                       <Col span={6}>
                            <p>Max Transaction Amount</p>
                            <p>SMART 1,000,000,000,000 
                                <span className="copy-button" onClick={()=>setClipboard("sdfsdfsdf", "Copy Max Transaction Amount to Clipboard Successfully!")}>
                                    <CopyOutlined />
                                </span>
                            </p>
                       </Col>
                   </Row>
                </div>
            </div>
        </div>
    );
    
}

export default Content;