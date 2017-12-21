import React, { Component } from 'react';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert, AutoComplete, Card } from 'antd';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import styles from './index.css';


const { TabPane } = Tabs;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Row >
        <Col md={12}>col-12</Col>
        <Col md={12} >
          <h1>Home Page</h1>
        </Col>
      </Row>
    );
  }
}


export default Login;