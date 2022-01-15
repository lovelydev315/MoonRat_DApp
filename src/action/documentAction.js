import axios from "axios";
import instance from './axios';

export const getFolder = (cb)  => {

    instance.get("/api/files/getFolder",{withCredentials:true})
    .then((res) =>{
      return cb(res);
        
    })
    .catch((err) => {
        console.log(err);
    });
}

export const createNewFolder = (folder_name, cb)  => {

  instance.post("/api/files/createNewFolder", { folder_name }, {withCredentials:true})
  .then((res) =>{
    return cb({ err: false, data: res.data });
  })
  .catch((err) => {
    return cb({ err: true, data: err.response.data });
  });
}

export const uploadDocument = (value, cb)  => {
  const headers = {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    withCredentials: true
  };
  console.log(value);
  instance.post("/api/files/uploadDocument",  value , headers)
  .then((res) =>{
    return cb(res);
  })
  .catch((err) => {
    return cb(err);
  });
}

export const getPhase = (cb)  => {
  
    instance.get("/api/phase/getPhase",{withCredentials:true})
    .then((res) =>{
      return cb(res);
        
    })
    .catch((err) => {
        console.log(err);
    });

}

export const getCredit = (cb)  => {
  
    instance.get("/api/credit/getCredit",{withCredentials:true})
    .then((res) =>{
      return cb(res);
        
    })
    .catch((err) => {
        console.log(err);
    });

}

export const updateCredit = (user_id, user_state, cb) => {
  console.log(user_id, user_state);
  instance.post("/api/admin/updateCredit", user_id, user_state, {withCredentials:true})
  .then((res)=>{
    return cb(true);
  })
  .catch((err)=>{
    console.log(err);
    return cb(false);
  });
}