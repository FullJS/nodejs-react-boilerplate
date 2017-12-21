import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './AppRoute';
import StoreConfigure from './store/configure';

import './App.css';

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'


const store = StoreConfigure();

const App = (
  <div className="App">
    <Provider  store={store}>
      <AppRouter />
    </Provider>
  </div>
) 

ReactDOM.render(App, document.getElementById('root'));
