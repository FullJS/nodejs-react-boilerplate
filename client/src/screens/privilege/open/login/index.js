import React, { Component } from 'react';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';

import { Link } from 'react-router-dom';

import styles from './index.css';

import Header from '../components/header/index'

const FormItem = Form.Item;
const { TabPane } = Tabs;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', senha: '' };

    this.state = {
      count: 0,
      type: 'account',
      status: '',
      submitting: false
    }
  }


  render() {


    return (
      <div className="container">
        <div className="login-form">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            </FormItem>
            <FormItem>
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            </FormItem>
            <FormItem>
              <Checkbox>Remember me</Checkbox>
              <a className="login-form-forgot" href="">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="">register now!</a>
            </FormItem>
          </Form>
        </div>

      </div>
    );
  }
}


export default Login;