
import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/header/index'
import Footer from './components/footer/index'

import Home from './home/index';
import Login from './login/index';
import Register from './register/index';

import './index.css';

const OpenRoute = (props) => {
  return (
    <Layout className="page">
      <Header className="header"/>
      <Layout.Content className="content">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
      </Layout.Content>
      <Footer className="footer"/>
    </Layout>
  );
}

export default OpenRoute;