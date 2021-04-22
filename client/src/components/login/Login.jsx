import React , {useEffect,useState} from 'react';
import {Link,withRouter} from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import './login.css';
import {connect} from 'react-redux'
import {loginUser,checkAuthentication} from './action';
import LinearProgress from '@material-ui/core/LinearProgress';
import { toast } from 'react-toastify';

const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    };

export const Login = (props)=> {
  const [width,setWidth] = useState(window.innerWidth);
  const [loggingIn,setLoggingIn] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(props.isUserLoggedIn){
      props.history.push("/chat")
    }else if(token){
      props.verifyToken(token)
    }

    window.addEventListener('resize',()=>{
      setWidth(window.innerWidth);
      console.log(width > 800);
    });
    //eslint-disable-next-line
  },[props.isUserLoggedIn]);


  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
      setUser({
          ...user,
          [e.target.name]: e.target.value
      })
  }

  const onFinish =  async (e) => {
    setLoggingIn(true);
    e.preventDefault();
    if(email && password){
      await props.signin(user);
    }else{
     toast.error('something went wrong',options);
    }
    setLoggingIn(false);
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
                              <label htmlFor="email" className="label">email</label>
                              <input 
                                type="text"
                                name="email"
                                className="form-control custom-input"
                                onChange={onChange}
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
                              <button className="btn-primary form-control" disabled={loggingIn}>
                                SUBMIT
                              </button>
                          </div>
                          <div className="gray-color">
                              <p className="text-center"> 
                              <span>Not having account ? <Link to="/signup" >sign up</Link></span>  </p>
                          </div>
                          {loggingIn && <LinearProgress />}
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

    );
}

const mapStateToProps = (state)=>({
  isUserLoggedIn: state.loginReducer.loggedInUser,
  loading: state.loginReducer.loading
})

const mapDispatchToProps = (dispatch)=>({
  signin: async (value)=> dispatch(loginUser(value)),
  verifyToken: async (token)=> dispatch(checkAuthentication(token))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));

// import { Form, Input, Button,Row,Col,Typography} from 'antd';
//   <Row style={{marginTop: "30px"}}>
//   <Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
//   <Typography.Title level={2} type="secondary" style={{textAlign:"center"}}>Chat app</Typography.Title>
//     <Form  onFinish={onFinish} layout="vertical">
//       <Form.Item
//           name="email"
//           label="Email"
//           rules={[
//           {   
//               required: true,
//               type: "email"
//           },
//           ]}
//       >
//       <Input />
//       </Form.Item>
//       <Form.Item
//           name="password"
//           label="Password"
//           rules={[
//           {   
//               required: true,
//           },
//           ]}
//       >
//       <Input.Password />
//       </Form.Item>
//       <Form.Item>
//           <Button type="primary" htmlType="submit" block>
//               Submit
//           </Button>
//           <span>Not having account ? <Link to="/signup" >sign up</Link></span>
//       </Form.Item>
// </Form>
//     </Col>
// </Row>