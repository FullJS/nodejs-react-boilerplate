import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { withFormik } from 'formik'
import Yup from 'yup'
import * as MessageLog from '../../../../message-log/index'

import './index.css';
import api from './api'

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};

class RegisterForm extends Component {

  render() {
    const {
      errors,
      touched,
      handleSubmit,
      handleChange
    } = this.props;

    return (
      <Row >
        <Col md={24} className="register-container ">
          <div className="register-form text-center">
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
              <FormItem
                label="First Name"
                hasFeedback
                validateStatus={touched.firstName && errors.firstName ? 'error' : ''}
                help={touched.firstName && errors.firstName}
                {...formItemLayout}
              >
                <Input
                  name="firstName"
                  type="text"
                  id="error"
                  onChange={handleChange} />
              </FormItem>
              <FormItem
                label="Last Name"
                hasFeedback
                validateStatus={touched.lastName && errors.lastName ? 'error' : ''}
                help={touched.lastName && errors.lastName}
                {...formItemLayout}
              >
                <Input
                  name="lastName"
                  type="text"
                  onChange={handleChange} />
              </FormItem>
              <FormItem
                label="E-mail"
                hasFeedback
                validateStatus={touched.email && errors.email ? 'error' : ''}
                help={touched.email && errors.email}
                {...formItemLayout}
              >
                <Input
                  name="email"
                  type="text"
                  onChange={handleChange} />
              </FormItem>
              <FormItem label="Password"
                extra="At least 8 characters"
                hasFeedback
                validateStatus={touched.password && errors.password ? 'error' : ''}
                help={touched.password && errors.password}
                {...formItemLayout}
              >
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange} />
              </FormItem>
              <FormItem
                label="Confirm password"
                hasFeedback
                validateStatus={touched.passwordConfirm && errors.passwordConfirm ? 'error' : ''}
                help={touched.passwordConfirm && errors.passwordConfirm}
                {...formItemLayout}
              >
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={handleChange} />
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
    )
  }
};


const FormikRegister = withFormik({
  mapPropsToValues() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First name is required!'),
    lastName: Yup.string().required('Last name is required!'),
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string().min(8, 'Password must be 8 characters or longer').required('Password is required'),
    passwordConfirm: Yup.string().required('Password confirm is required').test('match',
      'Passwords do not match',
      function (passwordConfirm) {
        return passwordConfirm === this.parent.password;
      }),
  }),
  handleSubmit(values, { resetForm, setErrors }) {
    const params = {
      ...values,
      local: {
        email: values.email,
        password: values.password
      }
    }
    api.create(params).then((r) => {
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
      if (e.cod === 'ERROR_EMAIL_ALREADY_REGISTERED') {
        setErrors({ email: MessageLog.getServerMessageByCod(e.cod).MSG });
      }
    })
  }
})(RegisterForm)

export default connect()(withRouter(FormikRegister));