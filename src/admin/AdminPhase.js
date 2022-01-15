import React from 'react';
import './admin.css';

const AdminPhase = (props) => {
    
    return (
        <div className="phase-container">
            <div style={{width:'40%', display:'inline-block', textAlign:'center'}}>
                <div style={{width:'20px', height:"20px", display:'inline-block', backgroundColor:'white', borderRadius:'9999px'}}>{props.number}</div>
            </div>
            <div style={{width:'60%', display:'inline-block'}}>
                <ol style={{marginBottom:'0px'}}>
                    <li style={{fontSize:'8px', textAlign:'left'}}>Organize Finances</li>
                    <li style={{fontSize:'8px', textAlign:'left'}}>Prioritise Saving</li>
                </ol>
            </div>
        </div>
      
    );
};

export default AdminPhase;