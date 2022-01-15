import instance from './axios';

export const isAuth = (cb)  => {
    instance.get("/api/customer/authchecker",{withCredentials:true})
      .then((res) =>{
        if (res.status == 200) {
          return cb({ err: false, data: res.data });
        }
          
      })
      .catch((err) => {
          return cb({ err: true, data: err.response.data })
      });
}

export const register = (body, cb) => {
  console.log(body);
  const headers = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  instance.post("/api/customer/register", body, headers)
    .then((res) =>{
      return cb(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login =  ({ email, password, type }, cb) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  };

  const body = JSON.stringify({ email, password });

  let url;
  switch(type) {
    case "admin":
      url = "/api/admin/login";
      break;
    case "customer":
      url = "/api/customer/login";
      break;
    default:
      url = "/api/customer/login";
  }
  
  instance.post(url, body, headers)
    .then((res) => {
      if (res.status == 200) {
        return cb({ err: false, data: res.data });
      }
    }
    )
    .catch((err) => {
      console.log(err);
      return cb({ err: true, data: err.response.data });
    });
};

export const logout = (cb) => {
  
    instance.get("/api/logout/logout", { withCredentials: true })
    .then((res) =>{
      return cb(res);
    })
    .catch((err) => {
      return cb(err);
    });
}

export const getUsers = (cb)=> {
  instance.get("/api/admin/getUsers",{withCredentials:true})
    .then((res) =>{
      if (res.status == 200) {
        return cb({ err: false, data: res.data });
      }
        
    })
    .catch((err) => {
        return cb({ err: true, data: err.response ? err.response.data : err });
    });
}

export const getUserInfo = (cb) => {
  instance.get("/api/customer/getInfo", {withCredentials:true})
    .then((res) => {
      if(res.status === 200) {
        return cb({err: false, data: res.data});
      }
    })
    .catch((err) => {
        return cb({ err: true, data: err.response ? err.response.data : err });
    });
}

export const updateCredit = (user_id, user_state, cb) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  };
  console.log(user_id, user_state);
  instance.post("/api/admin/updateCredit", {user_id, user_state}, headers)
  .then((res)=>{
    return cb(true);
  })
  .catch((err)=>{
    console.log(err);
    return cb(false);
  });
}