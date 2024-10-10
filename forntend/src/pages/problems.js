import '../css/problem.css'
import {useParams, Link} from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Images from '../Images'
import cate_intro from '../intro'
import Accordion from "../componeents/Collapse";
import {FaHome}  from "react-icons/fa";
import logo from "../logo.svg";
import React, {useState} from "react";

export default function Problem(props) {
  const Image = {...Images}
    const {name}=useParams()
    const [introductions, setQuestions] = useState(cate_intro)
  return(
  <main className="container-fluid">
        <Breadcrumb>
            <Breadcrumb.Item href="/"><FaHome /></Breadcrumb.Item>
            <Breadcrumb.Item href="/features">Features
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{name.charAt(0).toUpperCase() + name.slice(1)}</Breadcrumb.Item>
        </Breadcrumb>
      <section id="category">
          <div className="category_img">
              <img src={Image.quality} className={name} alt={name}/>
          </div>
          <div className="category_content">
              <div className="category_title">
                  <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
              </div>
              <div className="category_descri">
                  {introductions.filter((introduction)=> introduction.cate===name).map((introduction)=> (
                      <p className="p_discrib" key={introduction.id} >
                          {introduction.description}
                        </p>
                  ))}
              </div>
          </div>
      </section>
      <section id="problem">
          <Accordion cate={name}/>
      </section>
  </main>
  )
}