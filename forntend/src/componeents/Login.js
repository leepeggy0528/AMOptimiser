import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap'
import { login } from '../signIn'

function Login() {
    const [addloginclass, setAddLoginClass] = useState(false)
    const [addsignupclass, setAddSignUpClass] = useState(true)
    const [errormsg, setErrormsg] = useState("");
    const [show,setShow]=useState(false)
    const [status,setStatus]=useState('')
    const [loginname, setUsername] = useState("");
    const [psw, setPassword] = useState("");
    const [serverResponse,setServerResponse]=useState("")
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const loginBtn  = () => {
       setAddLoginClass(false)
        setAddSignUpClass(true)
        console.log('This is the login form.')
    };

    const signupBtn = () => {
        setAddLoginClass(true)
        setAddSignUpClass(false)
         console.log('This is the sign-up form.')
    };

    const handleSignUp = async (data) => {
          if (data.password === data.confirmPassword) {
             const requestOptions= {
              method: "POST",
              mode:'cors',
              headers: {
                  'content-type': 'application/json',
              },
              body: JSON.stringify({
                username: data.username,
                email: data.email,
                password: data.password
            }),
              cache: 'no-cache'
          }
          await fetch(`http://127.0.0.1:5000/signIn/register`, requestOptions)
              .then(res => res.json())
              .then(data => {
                  setShow(true)
                  if (data.message1) {
                      setServerResponse(data.message1)
                  }if(data.message2) {
                       setServerResponse(data.message2)
                  }if(data.message1 && data.message2) {
                       setServerResponse(data.message1+ ' & ' +data.message2)
                  }
                  if (data.status==='success'){
                      setAddLoginClass(false)
                        setAddSignUpClass(true)
                      setShow(true)
                      setServerResponse("Registered successfully")
                      setStatus('success')
                      reset()
                  }
                  setStatus(data.status)
                  // wait(5000)
                  // setShow(false)
              })
              .catch(err => {
                  setErrormsg(err.message);
              });

      }else {
              setShow(true)
                      setServerResponse("Passwords do not match")
                      setStatus('danger')
        }
     }
    const handleSignIn = async (ev) => {
        ev.preventDefault()
        const requestOptions= {
              method: "POST",
              mode:'cors',
              headers: {
                  'content-type': 'application/json',
              },
              body: JSON.stringify({
                username: loginname,
                password: psw
            }),
              cache: 'no-cache'
          }
            await fetch(`http://127.0.0.1:5000/signIn/login`, requestOptions)
              .then(res => res.json())
              .then(data=>{
                   if (data){
                    login(data.access_token);
                       sessionStorage.setItem('username', data.user);
                       alert("Login successfully")
                       if(data.message) {
                           setShow(true)
                           setServerResponse(data.message)
                           setStatus(data.status)
                       }}
                   else{
                       alert('Invalid username or password')
                       reset()
                   }
               })
              .catch(err => {
                  setErrormsg(err.message);
              });
      }

  return(
      <div className="form-structor">
          {show &&
                  <Alert variant={status} onClose={() => {
                      setShow(false)
                  }} dismissible>
                      <p>
                          {serverResponse}
                      </p>
                  </Alert>
              }
          <div className={`signup ${addsignupclass ? 'slide-up' : ''}`}>
              <h2 className={`form-title`} id="signup" onClick={signupBtn}><span>or</span>Sign up</h2>
              <form onSubmit={handleSubmit(handleSignUp)}>
                  <div className="form-holder">
                      <Form.Group>
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text"
                                        {...register("username", {required: true, maxLength: 20})}
                          />
                      </Form.Group>
                      {errors.username?.type === "required" &&
                          <p className="errormsg"><small>Username is required </small></p>}
                      {errors.username?.type === "maxLength" &&
                          <p className="errormsg"><small>Max characters should be 20 </small></p>}
                      <Form.Group>
                          <Form.Label>Email</Form.Label>
                          <Form.Control type="email"
                                        {...register("email", {required: true, maxLength: 64})}
                          />
                      </Form.Group>
                      {errors.email?.type === "required" &&
                          <p className="errormsg"><small>Email is required</small></p>}
                      {errors.email?.type === "maxLength" &&
                          <p className="errormsg"><small>Max characters should be 64</small></p>}
                      <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password"
                                        {...register("password", {required: true, minLength: 3})}
                          />
                      </Form.Group>
                      {errors.password?.type === "required" &&
                          <p className="errormsg"><small>Password is required</small></p>}
                      {errors.password?.type === "minLength" &&
                          <p className="errormsg"><small>Min characters should be 3</small></p>}
                      <Form.Group>
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control type="password"
                                        {...register("confirmPassword", {required: true, minLength: 3})}
                          />
                      </Form.Group>
                      {errors.confirmPassword?.type === "required" &&
                          <p className="errormsg"><small>Confirm Password is required</small></p>}
                      {errors.confirmPassword?.type === "minLength" &&
                          <p className="errormsg"><small>Min characters should be 3</small></p>}
                  </div>
                  <button type="submit" className="submit-btn">Sign up</button>
              </form>
          </div>
          <div className={`login  ${addloginclass ? 'slide-up' : ''}`}>
              <div className="center">
                  <h2 className={`form-title`} id="login" onClick={loginBtn}><span>or</span>Log in</h2>
                  <form onSubmit={handleSignIn}>
                      <div className="form-holder">
                          <input type="text" className="input" placeholder="Username" value={loginname}
        onChange={(e) => setUsername(e.target.value)}/>
                          <input type="password" className="input" placeholder="Password" value={psw}
        onChange={(e) => setPassword(e.target.value)}/>
                      </div>
                      <button className="submit-btn">Log in</button>
                  </form>
              </div>
          </div>
      </div>
  )
}

export default Login