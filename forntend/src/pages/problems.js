import '../css/problem.css'
import {useParams, Link} from "react-router-dom";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Images from '../Images'
import Accordion from "../componeents/Collapse";
import {FaHome}  from "react-icons/fa";
import logo from "../logo.svg";

export default function Problem(props) {
  const Image = {...Images}
    const {name}=useParams()
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
                  <p className="p_discrib">Quisque finibus nulla id molestie semper. Donec ut tortor ligula.
                      Fusce gravida tellus sed sollicitudin lacinia.Mauris a maximus magna.
                      Aliquam turpis mi, accumsan vel urna faucibus, elementum sagittis massa.
                      Quisque finibus nulla id molestie semper. Donec ut tortor ligula.
                      Fusce gravida tellus sed sollicitudin lacinia.Mauris a maximus magna.
                      Aliquam turpis mi, accumsan vel urna faucibus, elementum sagittis massa.
                      Quisque finibus nulla id molestie semper. Donec ut tortor ligula.
                      Fusce gravida tellus sed sollicitudin lacinia.Mauris a maximus magna.
                      Aliquam turpis mi, accumsan vel urna faucibus, elementum sagittis massa.
                  </p>
              </div>
          </div>
      </section>
      <section id="problem">
          <Accordion cate={name}/>
      </section>

  </main>
  )
}