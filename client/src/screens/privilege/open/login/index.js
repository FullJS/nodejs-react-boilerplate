import React, { Component } from 'react';
import { Form, Input, Button, Icon, Row, Col, Checkbox } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import Yup from 'yup'

import api from './api'

import './index.css';

const FormItem = Form.Item;

class LoginForm extends Component {

  render() {
    const {
      errors,
      touched,
      handleSubmit,
      handleChange
    } = this.props;

    return (
      <Row >
        <Col md={24} className="login-container ">
          <div className="login-form text-center">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
              <FormItem
                hasFeedback
                validateStatus={touched.email && errors.email ? 'error' : ''}
                help={touched.email && errors.email}
              >
                <Input
                  name="email"
                  type="text" placeholder="Email"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onChange={handleChange}
                />
              </FormItem>
              <FormItem
                hasFeedback
                validateStatus={touched.password && errors.password ? 'error' : ''}
                help={touched.password && errors.password}
              >
                <Input
                  name="password"
                  onChange={handleChange}
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password" placeholder="Password" />
              </FormItem>
              <FormItem>
                <Checkbox>Remember me</Checkbox>
                <a className="login-form-forgot" href="">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                    </Button>
                Or <Link to="/register"> register now!</Link>
              </FormItem>
            </Form>
          </div>
        </Col>
      </Row>
    )
  }
}

const FormikLogin = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required!'),
    password: Yup.string().required('Password is required!').min(8, 'Password is too short'),
  }),
  handleSubmit(values, { resetForm, setErrors }) {
    console.log('Submiting')
    api.login({
      credentials: {
        email: values.email,
        password: values.password
      }
    }).then((r) => {
      console.log('r', r);
    }).catch((e) => {
      console.log('e', e);
    })
  }
})(LoginForm)

export default connect()(withRouter(FormikLogin));