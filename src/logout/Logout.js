import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {logout} from '../action/authAction';

const Logout = (props) => {
    const history = useHistory();
    useEffect(()=>{
        logout(function(res){
            if(!res.err) {
                history.push('/');
            }
            else {
                window.alert(res.err);
            }
        });
    });
    return (
        <div className="home-container">

        </div>
      
    );
};

export default Logout;