
import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './components/header/index'
import Footer from './components/footer/index'

import Home from './home/index';
import Login from './auth/login/index';

import './index.css';

const OpenRoute = (props) => {
  return (
    <Layout>
      <Header />
      <Layout.Content className="content">
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Home} />
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export default OpenRoute;