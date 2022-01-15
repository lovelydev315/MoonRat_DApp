import React , {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import {color, border_radius} from  '../config/config';
import Web3 from 'web3';
import { message} from 'antd';
import {ShoppingFilled, CopyOutlined, FundViewOutlined, HomeFilled, EnvironmentFilled, WarningFilled, FundFilled, SignalFilled, ExportOutlined } from '@ant-design/icons';
import copy from "copy-to-clipboard";  

import './component.css';


function LeftSideBar() {
    let history = useHistory();
    const { ethereum } = window;

    useEffect(() => {
        getAddress();
    }, []);

    const [address, setAddress] = useState('');
    
    const getAddress = async ()=> {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:3000')
        const network = await web3.eth.net.getNetworkType();
        console.log(network) // should give you main if you're connected to the main network via metamask...
        const accounts = await web3.eth.getAccounts()
       setAddress(accounts);
    }

    function setClipboard(value, message_str) {
        copy(value);
        message.success(message_str, 2);
    }

    return (
        <div className="left-sidebar-container">
            <div className = "logo-container">
                <img src = {process.env.PUBLIC_URL+"/logo.png"} width={120} height={120}></img>
                <h2 className = "logo-main-text"> AntiDip</h2>
                <p className = "logo-sub-text" > A New Way To Earn Money</p>
            </div>
            <a target='_blank' href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x68590a47578e5060a29fd99654f4556dbfa05d10">
                <div className = "buy-button-container" style={{borderRadius:border_radius.button}}>
                    <ShoppingFilled />
                    <span>  Buy SMART</span>
                </div>
            </a>
            <div className="information-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.component_background}}>
                <h2 style={{color:'white'}}>Address Information</h2>
                <p style={{fontWeight:'bold'}}>Your Address</p>
                <p>{address}</p>
                <div className = "information-button-container" style ={{marginBottom:'10px'}}>
                    <div className="information-button" onClick={()=>setClipboard(address, "Copy Address to Clipboard Successfully!")}>
                        <CopyOutlined className="copy-button" />
                        <span>Copy address</span>
                    </div>
                    <a target='_blank' href={"https://bscscan.com/address/"+address}>
                        <div className="information-button">
                            <FundViewOutlined className="copy-button" />
                            <span>View on BSC scan Explorer</span>
                        </div>
                    </a>
                    
                </div>
                <p style={{fontWeight:'bold'}}>Your Smart Balance</p>
                <p>Smart 0.00</p>
                <p>(0.00$)</p>
            </div>
            <div className="menu-container" style={{borderRadius:border_radius.small_component, borderColor:color.line_color, backgroundColor:color.component_background}}>
                <div className = "menu-item" style={{borderColor:color.line_color}}>
                    <div className = "menu-item-icon">
                        <HomeFilled />
                    </div>
                    <div className = "menu-item-text">
                        HomePage
                    </div>
                </div>
                <div className = "menu-item" style={{borderColor:color.line_color}}>
                    <div className = "menu-item-icon">
                        <EnvironmentFilled />
                    </div>
                    <div className = "menu-item-text">
                        Guide
                    </div>
                </div>
                <div className = "menu-item" style={{borderColor:color.line_color}}>
                    <div className = "menu-item-icon">
                        <WarningFilled />
                    </div>
                    <div className = "menu-item-text">
                        Disclaimer
                    </div>
                </div>
                
                <a target='_blank' href="https://bscscan.com/token/0x68590a47578e5060a29fd99654f4556dbfa05d10">
                    <div className = "menu-item" style={{borderColor:color.line_color}}>
                        <div className = "menu-item-icon">
                            <FundFilled />
                        </div>
                        <div className = "menu-item-text">
                            Contract
                        </div>
                    </div>
                </a>
                
                
                <a target='_blank' href="https://dex.guru/token/0x68590a47578e5060a29fd99654f4556dbfa05d10-bsc">
                    <div className = "menu-item no-border" style={{borderColor:color.line_color}}>
                        <div className = "menu-item-icon">
                            <SignalFilled />
                        </div>
                        <div className = "menu-item-text">
                            chart
                        </div>
                    </div>
                </a>
                
            </div>
            <div className = "buy-button-container" style={{borderRadius:border_radius.button}}>
                <ExportOutlined />
                <span>  Logout</span>
            </div>
        </div>
    );
    
}

export default LeftSideBar;