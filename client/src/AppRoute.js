
import React, { Component } from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
  withRouter,
  Redirect,
  browserHistory
} from 'react-router-dom';

import AdminRoute from './screens/privilege/admin/route';
import OpenRoute from './screens/privilege/open/route';
import UserRoute from './screens/privilege/user/route';

class AppRouter extends Component {

  render() {
    return (
      <BrowserRouter >
        <Switch>
          <Route exact path="/" component={() => (
            <Redirect to={{
              pathname: '/home',
              state: { from: this.props.location }
            }} />
          )} />
          <OpenRoute />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default AppRouter;