import React, { Component } from 'react';
import { Layout } from 'antd';

//import { Link } from 'react-router-dom';

import './index.css';

class Footer extends Component {

    render() {
        return (
            <Layout.Footer style={{ textAlign: 'center' }}>
                Boilerplate ©2017-2018 Created by Arthur Hoch and William Mehler
            </Layout.Footer>
        );
    }
}


export default Footer;