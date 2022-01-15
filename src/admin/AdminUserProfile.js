import React from 'react';
import { Avatar} from 'antd';
import AdminPhase from './AdminPhase';



const UserProfile = () => {
    
    return (
        <div className="profile-container">
            <div>
                <Avatar 
                    style={{margin:'auto', backgroundColor:'white'}}   
                    size={100} 
                    icon={<img className="user-image" width="50%" src={process.env.PUBLIC_URL+'/user_icon.png'} />} 
                />
            </div>
            <h1>John Doe</h1>
            <h3 style={{textAlign:'left'}}>Phase</h3>
            <AdminPhase number={1}/>
            <AdminPhase number={2}/>
            <AdminPhase number={3}/>
            <AdminPhase number={4}/>
            <AdminPhase number={5}/>
            <AdminPhase number={6}/>
            <AdminPhase number={7}/>

        </div>
      
    );
};

export default UserProfile;