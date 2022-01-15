import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Button, Modal, Checkbox} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {login} from '../action/authAction';
import {useHistory} from 'react-router-dom';
import {color, border_radius} from '../config/config';
import './login.css';
import '../components/component.css';


  

function Login() {
    let history = useHistory();
    const { ethereum } = window;
    const [checkOne, setCheckOne] = useState(false);
    const [checkTwo, setCheckTwo] = useState(false);

    const onCheckOneChange = (e) => {
        Modal.destroyAll();
        console.log('checked = ', e.target.checked);
        setCheckOne(e.target.checked);
    };
    const onCheckTwoChange = (e) => {
        Modal.destroyAll();
        console.log('checked = ', e.target.checked);
        setCheckTwo(e.target.checked);
    };

    function init() {
        
        return Boolean(ethereum && ethereum.isMetaMask);
    }
    const MetaMaskClientCheck = () => {
        //Now we check to see if MetaMask is installed
        if (!init()) {
          //If it isn't installed we ask the user to click to install it
          
        } else {
          //If it is installed we change our button text
          
          console.log('Connect!');
          onClickConnect();
        }
    };
    const onClickConnect = async () => {
        try {
          // Will open the MetaMask UI
          // You should disable this button while the request is pending!
          await ethereum.request({ method: 'eth_requestAccounts' });
            history.push('/dashboard');
        } catch (error) {
          console.error(error);
        }
      };

    function confirm() {
        
        Modal.confirm({
            title: 'Disclaimer',
            icon: <ExclamationCircleOutlined />,
            width:800,
            content: 
                <div>
                    <p>Trading cryptocurrencies carries a high level of risk, and may not be suitable for all investors. Before deciding to trade cryptocurrency you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore you should not invest money that you cannot afford to lose. ICO's, IEO's, STO's and any other form of offering will not guarantee a return on your investment.

You should be aware of all the risks associated with cryptocurrency trading, and seek advice from an independent financial advisor

Any opinions, news, research, analyses, prices, or other information contained on this website is provided as general market commentary, and does not constitute investment advice. The MoonRat.Finance will not accept liability for any loss or damage, including without limitation to, any loss of profit, which may arise directly or indirectly from use of or reliance on such information. All opinions expressed on this site are owned by the respective writer and should never be considered as advice in any form.

The MoonRat.Finance makes no representation or warranties as to the accuracy and or timelines of the information contained herein. A qualified professional should be consulted before making any financial decisions.</p>

                    <Checkbox
                        checked={checkOne}
                        onChange={onCheckOneChange}
                    >
                        I understand and accept that I will trade/invest MRAT/SMRAT at my own risks
                    </Checkbox>
                    <Checkbox
                        checked={checkTwo}
                        onChange={onCheckTwoChange}
                    >
                        I understand and accept that this app only works smoothly with Metamask/TrustWallet
                    </Checkbox>

                </div>,
            okText: 'Accept',
            cancelText: 'Decline'
        });
    }

    return (
        <div className="login-container" style={{backgroundColor:color.component_background}}>
            <div className = "logo-container">
                <img src = {process.env.PUBLIC_URL+"/logo.png"} width={120} height={120}></img>
                <h2 className = "logo-main-text"> AntiDip</h2>
            </div>
            
            <div style={{textAlign:'center'}}>
                <h3>
                You are not connected to MoonRat Dapp yet
                </h3>
                <p>To use the Dapp, make sure:</p>
                <p>
                You are using the Binance Smart Chain network
                </p>
            </div>

            <div className = "buy-button-container" style={{borderRadius:border_radius.button, marginTop:'20px'}} onClick={MetaMaskClientCheck}>
                    <span>Connect to Wallet</span>
            </div>
        </div>
    );
    
}

export default Login;
