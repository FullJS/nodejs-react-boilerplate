import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

import { Link, withRouter } from 'react-router-dom';

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
				password: ''
			},
			samePassword: true
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

	handleChangePasswordVerrification = (event) => {
		const password = this.state.local.password;

		if (password !== event.target.value) {
			this.setState({ samePassword: false });
		} else {
			this.setState({ samePassword: false });
		}


	}

	handleSubmit = (e) => {
		e.preventDefault();
		api.create(this.state).then((r) => {
			console.log(r);
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
		});
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
			<div className='registration-container'>
				<Row >
					<Col md={24}>
						<h1>Register</h1>
						<Form onSubmit={this.handleSubmit} >
							<FormItem label="First Name" {...formItemLayout}>
								<Input
									type="text"
									onChange={this.handleChangeFirstName} />
							</FormItem>
							<FormItem label="Last Name" {...formItemLayout}>
								<Input
									type="text"
									onChange={this.handleChangeLastName} />
							</FormItem>
							<FormItem label="E-mail" {...formItemLayout}>
								<Input
									type="text"
									onChange={this.handleChangeEmail} />
							</FormItem>
							<FormItem label="Password"
								extra="At least 8 characters"
								{...formItemLayout}>
								<Input
									type="password"
									onChange={this.handleChangePassword} />
							</FormItem>
							<FormItem label="Confirm password" {...formItemLayout}>
								<Input
									type="password"
									onChange={this.handleChangePasswordVerrification} />
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit">
									Register
								</Button>
								Or
								<Link to="/login"> Log in using your existing account!</Link>
							</FormItem>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default withRouter(Register);