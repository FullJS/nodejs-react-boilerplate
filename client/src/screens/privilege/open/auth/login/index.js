import React, { Component } from 'react';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert, AutoComplete, Card } from 'antd';

import { Link } from 'react-router-dom';

import styles from './index.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

const { TabPane } = Tabs;

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { email: '', senha: '' };

    this.state = {
      count: 0,
      type: 'account',
      status: '',
      submitting: false,
      emails: []
    }
  }

  handleSearch = (value) => {
    let emails;
    if (!value || value.indexOf('@') >= 0) {
      emails = [];
    } else {
      const emailList = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com'];
      emails = emailList.map(domain => `${value}@${domain}`);
    }
    this.setState({ emails });
  }

  render() {
    const { emails } = this.state;
    const children = emails.map((email) => {
      return <Option key={email}>{email}</Option>;
    });

    return (
      <Row >
        <Col md={12} className="login-container">
          <div className="login-form text-center">
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
{/*                 <AutoComplete
                  onSearch={this.handleSearch}
                  placeholder="E-mail"
                  addonAfter={<Icon type="setting" />}>
                  {children}
                </AutoComplete> */}
                <AutoComplete
                  size="large"
                  style={{ width: '100%' }}
                  onSearch={this.handleSearch}
                  dataSource={this.state.emails.map(domain => `aa@${domain}`)}
                  optionLabelProp="text"
                >
                  <Input
                    placeholder="E-mail"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </AutoComplete>
              </FormItem>
              <FormItem>
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password" placeholder="Password" />
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
        </Col>
      </Row>
    );
  }
}


export default Login;