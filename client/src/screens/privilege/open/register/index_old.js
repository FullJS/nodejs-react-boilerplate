import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import './index.css';
import api from './api'

const FormItem = Form.Item;
class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      local: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      samePassword: true,
      errors: {}
    };
  }

  handleChangeFirstName = (event) => {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName = (event) => {
    this.setState({ lastName: event.target.value });
  }

  handleChangeEmail = (event) => {
    const local = this.state.local;
    local.email = event.target.value;

    this.setState({
      local,
    });
  }

  handleChangePassword = (event) => {
    const local = this.state.local;
    local.password = event.target.value;

    this.setState({
      local,
    });
  }

  handleChangeConfirmPassword = (event) => {
    const local = this.state.local;
    local.confirmPassword = event.target.value;

    this.setState({
      local,
    });
  }

  // removeError = (key) => {
  //   if (this.state.errors[key]) {
  //     newState.errors = {
  //       ...this.state.errors,
  //       firstName: undefined
  //     }
  //   }
  // this.setState(newState);
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.local.confirmPassword !== this.state.local.password) {
      console.log('The passwords must be equals')
    }
    if (this.state.local.confirmPassword.length < 8 || this.state.local.password < 8) {
      console.log('The passwords must be at least 8 characters')
    }
    api.create(this.state).then((r) => {
      console.log('responseeeeeeeeeeeeeeeeeeeeeeeee', r);

			/* sessionApi.authenticate(this.state).then((jsonLogin) => {
				if (jsonLogin && jsonLogin.token) {
					console.log(jsonLogin.token);
					let decoded = jwtDecode(jsonLogin.token);
					this.props.dispatch(actionCreators.loginUserSuccess(jsonLogin.token));
					this.props.history.push('/home');
				} else {
					console.error('Erro ao criar conta!');
				}
			}).catch((e) => {
				console.error(e);
				this.props.dispatch({ type: 'ADD_MESSAGE', cod: 'ERROR_TOKEN_INVALIDO' })
			}); */
    }).catch((e) => {
      console.log('e', e)
      if (e.hasOwnProperty('errors')) {
        this.setState({ errors: e.errors });
      }
      console.log('this.state', this.state)
    })
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
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };

    return (
      <Row >
        <Col md={24} className="register-container ">
          <div className="register-form text-center">
            <h1>Register</h1>
            <Form onSubmit={this.handleSubmit} className="register-form">
              <FormItem
                label="First Name"
                {...formItemLayout}
                validateStatus={this.state.errors.firstName !== undefined ? "error" : ""}
              >
                <Input
                  type="text"
                  onChange={this.handleChangeFirstName} />
              </FormItem>
              <FormItem
                label="Last Name"
                {...formItemLayout}
                validateStatus={this.state.errors.lastName !== undefined ? "error" : ""}
              >
                <Input
                  type="text"
                  onChange={this.handleChangeLastName} />
              </FormItem>
              <FormItem
                label="E-mail"
                {...formItemLayout}
                validateStatus={this.state.errors['local.email'] !== undefined ? "error" : ""}
              >
                <Input
                  type="text"
                  onChange={this.handleChangeEmail} />
              </FormItem>
              <FormItem label="Password"
                extra="At least 8 characters"
                {...formItemLayout}
                validateStatus={this.state.errors['local.password'] !== undefined ? "error" : ""}
              >
                <Input
                  type="password"
                  onChange={this.handleChangePassword} />
              </FormItem>
              <FormItem
                label="Confirm password"
                {...formItemLayout}
              // validateStatus="error"
              >
                <Input
                  type="password"
                  onChange={this.handleChangeConfirmPassword} />
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">
                  Register
								</Button>
                Or
								<Link to="/login"> Log in using your existing account!</Link>
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    );
  }
}

export default connect()(withRouter(Register));