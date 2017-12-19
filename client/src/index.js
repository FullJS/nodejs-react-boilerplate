import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Button from 'antd/lib/button';

import AppRouter from './route/AppRouter';

import './App.css';

const App = (

  <div className="App">
    <Button type="primary">Button</Button>
  </div>
);

/* const App = (
  <div>
    <Provider>
      <AppRouter />
    </Provider>
  </div>
) */

ReactDOM.render(App, document.getElementById('root'));
