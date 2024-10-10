import '../css/member.css'
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import History from '../componeents/Member_hist'
import Info from '../componeents/Member_info'
import {logout} from "../signIn";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Member() {
  const Navigate = useNavigate();
  const location = useLocation();
  return (
      <main className="container-fluid">
        <Tab.Container id="list-group-tabs-example" defaultActiveKey={'#'+location.state}>
            <Row id="list_group">
              <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item action href="#information">
                   Information
                  </ListGroup.Item>
                  <ListGroup.Item action href="#history">
                    History
                  </ListGroup.Item>
                  <ListGroup.Item onClick={()=>{logout(); sessionStorage.clear(); console.log("Logout");Navigate("/")}}>
                    Logout
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="#information"><Info/></Tab.Pane>
                  <Tab.Pane eventKey="#history"><History/></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
      </main>

);
}

export default Member;