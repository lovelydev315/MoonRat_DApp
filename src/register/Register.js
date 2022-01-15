import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import placeholder from './user_icon.png';
import { Form, Input, Button, message } from 'antd';
import {register} from '../action/authAction';
import './register.css';
import { useHistory } from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const Register = () => {
    let history = useHistory();
    const [{alt, src}, setImg] = useState({
        src: placeholder,
        alt: 'Upload an Image'
    });
    
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [officePhone, setOfficePhone] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [_state, set_state] = useState("");
    const [avatar, setAvatar] = useState(src);

    const onFinish = (values) => {
    //   console.log(values);
    };

    const handleImg = (e) => {
        if(e.target.files[0]) {
            console.log(e.target.files[0]);
            setAvatar(e.target.files[0]);
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });
        }
    }
  
    function onSubmit() {
        let formData = new FormData();
        formData.append("name", user );
        formData.append("email", email);
        formData.append("password", password);
        formData.append("mobile_phone", mobilePhone);
        formData.append("office_phone", officePhone);
        formData.append("address", address);
        formData.append("postal_code", postalCode);
        formData.append("country", country);
        formData.append("state", _state);
        formData.append("avatar", avatar);

        register(formData, function(res){
            console.log("suffessfully ")
            if (res.data == "Successfully Registered") {
                console.log("successfully")
                message.info("Successfully Registered")
                history.push('/');
            }
        })
    }

    return (
        <div style={{display:'flex', height:'100vh'}}>
            <div className="login-container">
                <h1>Register</h1>
                <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'username']}
                        label="Name"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input onChange={(e)=>setUser(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input onChange={(e)=>setEmail(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        name={['user', 'password']}
                        label="Password"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input type="password" onChange={(e)=>setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'mobilePhone']}
                        label="Mobile Phone"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input onChange={(e)=>setMobilePhone(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'officePhone']}
                        label="Office Phone"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input onChange={(e)=>setOfficePhone(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'address']}
                        label="Address"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input onChange={(e)=>setAddress(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'postalCode']}
                        label="Postal Code"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input onChange={(e)=>setPostalCode(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'country']}
                        label="Country"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input onChange={(e)=>setCountry(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'state']}
                        label="State"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <Input onChange={(e)=>set_state(e.target.value)} />
                    </Form.Item>
                    
                    <Form.Item
                        name={['user', 'avatar']}
                        label="Avatar"
                        type="file"
                        style={{margin:'0 auto'}}
                    >
                        <input 
                            type="file" 
                            accept=".png, .jpg, .jpeg" 
                            id="photo" 
                            className="register-visually-hidden"
                            onChange={handleImg}
                        />
                        <label htmlFor="photo" className="register-form-img__file-label">
                            
                        </label>
                        <img src={src} alt={alt} className="register-form-img__img-preview"/>
                    </Form.Item>
                    
                    <Form.Item style={{marginTop:'20px'}} wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit" onClick={onSubmit}>
                            Register
                        </Button>
                        <Link to='/customer/login' style={{marginLeft:'30px'}}>
                            <span>Login</span>
                        </Link>
                    </Form.Item>
                    
                </Form>
            </div>
        </div>
    );
  };

export default Register;
