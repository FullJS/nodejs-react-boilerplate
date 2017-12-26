import React, { Component } from 'react';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert, AutoComplete, Card } from 'antd';

import { Link } from 'react-router-dom';

import styles from './index.css';

const FormItem = Form.Item;
const Option = AutoComplete.Option;

const { TabPane } = Tabs;

class Register extends Component {

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
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 14 },
		};


		return (
			<Row >
				<Col md={24} className="register-container">
					<div className="register-form text-center">
						<h1>Register</h1>
						<Form onSubmit={this.handleSubmit} className="register-form" layout="horizontal">
							<FormItem label="First Name" {...formItemLayout}>
								<Input
									type="text" />
							</FormItem>
							<FormItem label="Last Name" {...formItemLayout}>
								<Input
									type="text" />
							</FormItem>
							<FormItem label="E-mail" {...formItemLayout}>
								<Input
									type="text" />
							</FormItem>
							<FormItem label="Password"
								extra="At least 8 characters"
								{...formItemLayout}
							>
								<Input
									type="password" />
							</FormItem>
							<FormItem label="Confirm password" {...formItemLayout}>
								<Input
									type="password" />
							</FormItem>
							<FormItem>
								<Button type="primary" htmlType="submit" className="register-form-button">
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


export default Register;