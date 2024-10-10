import '../css/mem_info.css'
import { FiEdit } from "react-icons/fi";
import {Alert, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

export default function Info() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [errormsg, setErrormsg] = useState(false);
    const [show,setShow]=useState(true)
    const [displayaccount,setDisplayAccount]=useState(true)
    const [modify,setModify]=useState(false)
    const [status,setStatus]=useState('')
    const [loginname, setUsername] = useState("");
    const [psw, setPassword] = useState("");
    const [serverResponse,setServerResponse]=useState("")
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
                  setErrormsg(true)
                  if (data.message1) {
                      setServerResponse(data.message1)
                  }if(data.message2) {
                       setServerResponse(data.message2)
                  }if(data.message1 && data.message2) {
                       setServerResponse(data.message1+ ' & ' +data.message2)
                  }
                  if (data.status==='success'){
                      setErrormsg(true)
                      setServerResponse("Registered successfully")
                      setStatus('success')
                      reset()
                  }
                  setStatus(data.status)
              });
          }else {
                  setErrormsg(true)
                  setServerResponse("Passwords do not match")
                  setStatus('danger')
            }
     }

  return(
  <main className="container-fluid">
    {errormsg &&
                  <Alert variant={status} onClose={() => {
                      setShow(false)
                  }} dismissible>
                      <p>
                          {serverResponse}
                      </p>
                  </Alert>
    }
    <div className="account_title">
      <h1>Account</h1>
        {show &&
            <button className="edit" onClick={() => {
                setModify(true);
                setDisplayAccount(false);
                setShow(false)
            }}><FiEdit/></button>
        }

    </div>
      <div className="account_form">
          {displayaccount &&
              <form id="display" onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-holder">
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text"
                              {...register("username", {required: true, maxLength: 20})}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email"
                              {...register("email", {required: true, maxLength: 64})}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              {...register("password", {required: true, minLength: 3})}
                />
              </Form.Group>
            </div>
          </form>
      }
      {modify &&
          <form  id="modify"  onSubmit={handleSubmit(handleSignUp)}>
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
              <div className="modify_btn">
                  <button type="submit" className="submit-btn">Submit</button>
                  <button type="button" className="submit-btn" onClick={() => {
                      setModify(false);
                      setDisplayAccount(true);
                      setShow(true)
                  }}>Cancel
                  </button>
              </div>
          </form>
      }

      </div>
  </main>
  )
}