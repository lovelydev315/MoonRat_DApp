import React from "react";
import {Link} from 'react-router-dom';
import { color } from '../config/config';

const AdminSubHeader = (props) => {
  const to = props.to || "";
  return (
    <div className="admin-subheader" style={{backgroundColor: color.main}} onClick={props.onClick || function(){}}>
      <Link to={to} style={{color: 'inherit', cursor: "default"}}>
        <h3>{props.title}</h3>
        <p className="circle-white" style={{color: color.main}}>&gt;</p>
      </Link>
    </div>
  )
}

export default AdminSubHeader;