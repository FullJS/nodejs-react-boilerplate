import React, { Component } from 'react';
import { Layout, Menu } from 'antd';

import imgLogo from '../../../../images/logo.png'

import { withRouter, Link } from 'react-router-dom';
import './index.css'

class Header extends Component {

    render() {
        return (
            <Layout.Header>
                        <img 
                            className="header-logo-img" 
                            src={imgLogo} 
                            alt='logo'
                            onClick={() => {this.props.history.push('/home')}}
                        />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            style={{ lineHeight: '64px' }}>

                            <Menu.Item key="1">
                                <Link to="/login">Login</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/register">Register</Link>
                            </Menu.Item>
                        </Menu>
            </Layout.Header>
        );
    }
}

export default withRouter(Header);