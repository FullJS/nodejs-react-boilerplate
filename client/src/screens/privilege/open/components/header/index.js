import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

import { Link } from 'react-router-dom';
import './index.css'


class Header extends Component {

    render() {
        return (
            <Layout.Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}>

                    <Menu.Item key="1">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Layout.Header>
        );
    }
}


export default Header;