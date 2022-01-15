import React, {useEffect,useState} from 'react';
import {Row, Col} from 'antd';



  

const Step = (props) => {
    const current = props.current;
    const length = props.length;
    const height = props.height;
    const color = props.color;
    const marginTop = props.marginTop;
    const steps = [];
    for(let i = 0; i < length; i++) {
        let style = {};
        if(i < current) style.backgroundColor = color;
        if(i < length - 1) {
            if(i < current) style.borderRight = "1px solid white";
            else style.borderRight = "2px solid " + color;
        }
        style.height = "100%";
        style.width = 100/length + "%";
        if(i === 0) style.borderRadius = "9999px 0px 0px 9999px";
        if(i === length - 1)style.borderRadius = "0px 9999px 9999px 0px";
        steps.push(<div key={i} style={style}></div>)
    }
    // useEffect(() => {
    //     for (i = 0; i < 10; i++) {
    //         if ( i == props.current-1) {
    //             buffer.push(<Col key={i} style={{border:'2px solid white', borderRadius:'5px', backgroundColor:'red',height:'10px'}} span={2}></Col>);
    //         }else if(i<props.current-1) {
    //             buffer.push(<Col key={i} style={{border:'2px solid white', borderRadius:'5px', backgroundColor:'white',height:'10px'}} span={2}></Col>);
    //         }else {
    //             buffer.push(<Col key={i} style={{border:'2px solid white', borderRadius:'5px', backgroundColor:'transparent',height:'10px'}} span={2}></Col>);  
    //         }
    //     }
    //     setSteps(buffer);
    // },[]);
    return (
        <div className="progress-card-status-bar" style={{height: height, border: "2px solid "+color, marginTop: marginTop}}>
            {steps}
        </div>
    );
};

export default Step;