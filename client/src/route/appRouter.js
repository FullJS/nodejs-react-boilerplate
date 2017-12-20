
import React, { Component } from 'react';
import { 
  BrowserRouter,
  Switch,
 } from 'react-router-dom';

import AdminRoute from './routes/adminRoute';
import OpenRoute from './routes/openRoute';
import UserRoute from './routes/userRoute'

class AppRouter extends Component {

  render() {
    return (
        <BrowserRouter >
          <Switch>
            <AdminRoute/>
            <OpenRoute />
            <UserRoute/>
          </Switch>
        </BrowserRouter>
    );
  }
}
export default AppRouter;