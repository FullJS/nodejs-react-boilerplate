import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './AppRoute';
import StoreConfigure from './store/configure';

import { Layout } from 'antd';

import './App.css';

const store = StoreConfigure();



const App = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
)

ReactDOM.render(App, document.getElementById('root'));
