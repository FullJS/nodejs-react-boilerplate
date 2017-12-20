
import React from 'react';
import { Route } from 'react-router-dom';

import Login from '../../screns/privilege/open/login/index';


const OpenRoute = (props) => {
  return (
    <div>
      <Route exact path="/login" component={Login} />
    </div>
  );
}

export default OpenRoute;