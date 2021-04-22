import React, { useEffect,useState }  from 'react';
import {Link,withRouter} from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import {connect} from 'react-redux';
import {signupUser,checkAuthentication} from './action';
import { toast } from 'react-toastify';
import LinearProgress from '@material-ui/core/LinearProgress';

const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    };

const Signup = (props)=> {
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(props.isUserLoggedIn){
          props.history.push("/chat")
        }else if(token){
          props.verifyToken(token)
        }
    //eslint-disable-next-line
    },[]);

    useEffect(()=>{
        if(props.isUserLoggedIn){
            props.history.push("/chat")
          }
    //eslint-disable-next-line
    },[props.isUserLoggedIn]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirm_pass: ""
      });
      const { email, password, name,confirm_pass } = user;
      const [signingUp,setSigningUp] = useState(false);
    
      const onChange = (e) => {
          setUser({
              ...user,
              [e.target.name]: e.target.value
          })
      }
    
     const onFinish = async (e) => {
            setSigningUp(true);
            e.preventDefault();
            if(!(email && password && name && confirm_pass)){
                toast.error('All fields are required',options);
                return;
            
            }else if(password !== confirm_pass){
                toast.error('Both password must be same',options);
                return;
            }else{
               await props.signup(user);
            }
            setSigningUp(false);

       };

    return (
        <div className="login-cover">
        <div className="login-form-cover" style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/image/background.jpg'})`,backgroundSize: 'cover'}}>
                <div className="login-form">
                        <form onSubmit={onFinish}>
                            <div className="form-header">
                                Welkom bijj WINCK 
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="label">username</label>
                                <input 
                                  type="text"
                                  name="name"
                                  className="form-control custom-input"
                                  placeholder="username"
                                  onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="label">email</label>
                                <input 
                                  type="text"
                                  name="email"
                                  className="form-control custom-input"
                                  onChange={onChange}
                                  placeholder="email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="label">password</label>
                                <input 
                                  type="password"
                                  name="password"
                                  placeholder="Enter password"
                                  className="form-control custom-input"
                                  onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="label">confirm password</label>
                                <input 
                                  type="password"
                                  name="confirm_pass"
                                  placeholder="Re enter password"
                                  className="form-control custom-input"
                                  onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <button className="btn-primary form-control">
                                    SIGN UP
                                </button>
                            </div>
                            <div className="gray-color">
                                <p className="text-center"> 
                                <span>Already having account ? <Link to="/login" >sign</Link></span>  </p>
                            </div>
                        {signingUp && <LinearProgress />}
                        </form>
                </div>
                <div className="square blue-curved">
                    <div className="contact-msg">
                      <div className="info">
                            <div className="text-center b-font"> 
                                    complex technology, maar enduvik in gurib
                            </div>
                            <div className="d-flex-sp-center info-label">
                                <div className="d-flex-sp-center m-5">
                                    <div className="icon"><MailOutlineIcon /></div><div>Email@gmail.com</div>
                                </div>
                                <div className="d-flex-sp-center m-5">
                                    <div className="icon"><PhoneIcon /></div><div>+918989786545</div>
                                </div>
                            </div>
                      </div>
                    </div> 
                </div>
        </div>
  </div>
    )

}

const mapStateTProps = (state)=>({
    isUserLoggedIn: state.loginReducer.loggedInUser,
    loading: state.loginReducer.loading
})
const mapDispatchToProps = (dispatch)=>({
    signup: async (value)=> dispatch(signupUser(value)),
    verifyToken: (token)=> dispatch(checkAuthentication(token))
})
export default connect(mapStateTProps,mapDispatchToProps)(withRouter(Signup));

{/*
import { Form, Input, Button,Row,Col,Typography} from 'antd';
<Row style={{marginTop: "30px"}}>
<Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
<Typography.Title level={2} type="secondary" style={{textAlign:"center"}}>Chat app</Typography.Title>
<Form  onFinish={this.onFinish} layout="vertical">
    <Form.Item
        name="name"
        label="Username"
        rules={[
        {   
            required: true,
        },
        ]}
    >
    <Input />
    </Form.Item>
    <Form.Item
        name="email"
        label="Email"
        rules={[
        {   
            required: true,
            type: "email"
        },
        ]}
    >
    <Input />
    </Form.Item>
    <Form.Item
        name="password"
        label="Password"
        rules={[
        {   
            required: true,
        },
        ]}
    >
    <Input.Password />
    </Form.Item>
    <Form.Item
        name="confirm-password"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
        {
            required: true,
            message: 'Please confirm your password!',
        },
        ({ getFieldValue }) => ({
            validator(_, value) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }
        return Promise.reject('The two passwords that you entered do not match!');
    },
}),
]}
    >
    <Input.Password />
    </Form.Item>
    <Form.Item>
        <Button type="primary" htmlType="submit" block>
            sign up
        </Button>
        <span>Allready having account ? <Link to="/login" >sign in</Link></span>
    </Form.Item>
</Form>
</Col>
</Row> */}