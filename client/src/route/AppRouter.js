
import React, { Component } from 'react';
import { 
  Route,
  BrowserRouter,
  Switch,
  Redirect
 } from 'react-router-dom';

import DefaultRouter from './defaultRouter';

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
{/*             <Route path="/home" component={requireAuthentication(FaceFarmLayout)} /> */}
            <DefaultRouter />
          </Switch>
        </BrowserRouter>
    );
  }
}
export default AppRouter;