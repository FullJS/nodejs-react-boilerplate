import React, { Component } from 'react';
import { Layout } from 'antd';

//import { Link } from 'react-router-dom';
import './index.css'
class Header extends Component {

    render() {
        return (
            <Layout.Header>
                <h1 className="text-white">Header</h1>
            </Layout.Header>
        );
    }
}


export default Header;