import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './route/appRouter';
import StoreConfigure from './store/configure';

import './App.css';


const store = StoreConfigure();

const App = (
  <div>
    <Provider  store={store}>
      <AppRouter />
    </Provider>
  </div>
) 

ReactDOM.render(App, document.getElementById('root'));
