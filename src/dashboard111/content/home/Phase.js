import React from 'react';
import {Progress} from 'antd';
import {color} from '../../../config/config';
import './home.css';

const Phase = (props) => {
    
    const phase_num = props.phase.phase;
    const stage_len = props.phase.stages.length;
    const user_phase = props.user_state.phase;
    const user_stage = props.user_state.stage;
    
    return (
        <div style={{position:'relative'}}>
            <div className="user-phase-container-background">
                <div style={{width:user_phase > phase_num ? "100%" :(user_phase < phase_num ? "0%" : user_stage*100/stage_len + "%"), display:'inline-block', height:'100%', backgroundColor:color.main}}></div>
                <div style={{width:user_phase > phase_num ? "0%" :(user_phase < phase_num ? "100%" : (100 - user_stage*100/stage_len) + "%"), display:'inline-block' , height:'100%', backgroundColor:"white"}}></div>
            </div>
            <div className="user-phase-container" style={{borderColor:color.main}}>
                <span className="user-phase-number-container" >
                    <div className="user-phase-number" 
                        style={{
                            color: phase_num >= user_phase ? "white" : color.main,
                            backgroundColor: phase_num >= user_phase ? color.main : "white"
                        }}>{ phase_num }</div>
                </span>
                <span className="user-phase-text-container">
                    <span>Phase {phase_num} | {phase_num < user_phase ? "Complete":(phase_num === user_phase ?"In progress":"Incomplete")}</span>
                </span>
                <div style={{width:'60%', display:'inline-block'}}>
                    
                </div>
            </div>
            
        </div>
        
    );
};

export default Phase;