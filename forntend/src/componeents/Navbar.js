import {json, Link, useMatch, useResolvedPath} from "react-router-dom"
import logo from '../logo.svg';
import Login from '../componeents/Login'
import React, {useEffect, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import { useAuth ,logout} from '../signIn'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UpdataFile from "./UpdataFile";
import InputNum from "./InputNum";
import {Alert} from "react-bootstrap";

export default function Navbar1() {
    const [showed, setShowForm] = useState(false)
    const [user] = useAuth();
    useEffect(()=>{
          if (user){
              setShowForm(false)
          }
        }
    )
  return (
      <header>
          <nav className="navbar navbar-expand-sm navbar-dark" id="nav">
              <Link to="/" className="site-title">
                  <img src={logo} className="logo" alt="logo"/>
              </Link>
              <div className="collapse navbar-collapse" id="navbarToggle">
                  <div className=" navbar-nav me-auto">
                      <CustomLink to="/features" className="nav-item nav-link">Features</CustomLink>
                      <CustomLink to="/about" className="nav-item nav-link">About</CustomLink>
                      <CustomLink to="/contact" className="nav-item nav-link">Contact</CustomLink>
                  </div>
                  <div className="navbar-nav">
                      {user ? (
                          <>
                          <DropdownButton
                                key="Primary"
                                id='dropdown-variants-Primary'
                                variant='primary'
                                title={sessionStorage.username}
                              >
                                <Dropdown.Item eventKey="1"><CustomLink to="/member" className="nav-item nav-link">Information</CustomLink></Dropdown.Item>
                                <Dropdown.Item eventKey="2"><CustomLink to="/member/history" className="nav-item nav-link">History</CustomLink></Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="3" onClick={()=>{logout(); sessionStorage.clear()}}>Logout</Dropdown.Item>
                              </DropdownButton>
                          </>
                          ) : (
                            <>
                                <button id="signin" onClick={() => {
                                    setShowForm(true)
                                }}>
                                    Sign in
                                </button>
                            </>
                      )}

                      {/*<a className="nav-item nav-link" href="{{ url_for('logout') }}">Logout {{current_user.username}}</a>*/}
                  </div>
              </div>
          </nav>
          {showed &&
              <section id="sign_in">
                  <div className="login_box">
                      <div className="ub_close">
                          <button className='close_btn' onClick={() => setShowForm(false)}>
                              <AiOutlineClose/>
                          </button>
                      </div>
                      <Login />
                  </div>
              </section>
              }
      </header>
  )
}

function CustomLink({
                        to, children,
                        ...
                            props
                    }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})

    return (
        <Link to={to} {...props}>
            {children}
        </Link>
    )
}