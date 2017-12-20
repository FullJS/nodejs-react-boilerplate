
import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';


import Login from '../../screens/privilege/open/login/index';

import Header from '../../screens/privilege/open/components/header/index'
import Footer from '../../screens/privilege/open/components/footer/index'

const OpenRoute = (props) => {
  return (
    <Layout>
      <Header />
      <Route exact path="/login" component={Login} />
      <Footer />
    </Layout>
  );
}

export default OpenRoute;