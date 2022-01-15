import React from 'react';
import {Link} from 'react-router-dom';

import './sidebar.css';
import {color} from '../config/config';

const Sidebar = (props) => {
    
    const authority = props.authority;

    return (
        <div className="sidebar-container" >
            {
                props.selected==="1"? 
                <p className="sidebar-text sidebar-text-active" style={{marginTop:'20vh'}} tabIndex="0">
                    <Link to={'/' + authority + '/dashboard'} style={{color: 'inherit'}}>
                        <span>Home</span>
                    </Link>
                </p> : 
                <p className="sidebar-text" style={{marginTop:'20vh'}} tabIndex="0">
                    <Link to={'/' + authority + '/dashboard'} style={{color: 'inherit'}}>
                        <span>Home</span>
                    </Link>
                </p>
            }
            
            {
                authority ==="admin" &&  props.selected==="2" &&
                <p className="sidebar-text sidebar-text-active" tabIndex="0">
                    <Link to={'/' + authority + '/progress'} style={{color: 'inherit'}}>
                        <span>Progress</span>
                    </Link>
                </p>
            }
                { authority ==="admin" &&  props.selected !="2" &&<p className="sidebar-text" tabIndex="0">
                    <Link to={'/' + authority + '/progress'} style={{color: 'inherit'}}>
                        <span>Progress</span>
                    </Link>
                </p>
                }

                
            
            {    authority ==="admin" &&  props.selected === "3" &&
                <p className="sidebar-text sidebar-text-active" tabIndex="0">
                    <Link to={'/' + authority + '/document'} style={{color: 'inherit'}}>
                        <span>Documents</span>
                    </Link>
                </p> 
            }
            {
                authority ==="admin" &&  props.selected != "3" && 
                <p className="sidebar-text " tabIndex="0">
                    <Link to={'/' + authority + '/document'} style={{color: 'inherit'}}>
                        <span>Documents</span>
                    </Link>
                </p>
            } 
            {
                props.selected==="4"? <p className="sidebar-text sidebar-text-active" tabIndex="0">
                    <Link to={'/' + authority + '/support'} style={{color: 'inherit'}}>
                        <span>Support</span>
                    </Link>
                </p> : 
                <p className="sidebar-text"  tabIndex="0">
                    <Link to={'/' + authority + '/support'} style={{color: 'inherit'}}>
                        <span>Support</span>
                    </Link>
                </p>
            }
            <p className="sidebar-text " tabIndex="0">
            <Link to={'/logout'} style={{color: 'inherit'}}>
                <span>Logout</span>
            </Link>
            </p>
        </div>
    );
};

export default Sidebar;