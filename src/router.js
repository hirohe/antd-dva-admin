import React, { PropTypes } from 'react';
import { Router } from 'dva/router';
import Cookies from 'cookies-js';

export default function({ history, app }) {

  const routes = [
    {
      path: '/home',
      name: 'home',
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./routes/IndexPage'))
        })
      }
    },
    {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        require.ensure([], require => {

          cb(null, require('./routes/LoginPage'));
        }, 'login')
      }
    }
  ];

  const indexRoute = {
    path: '/',
    indexRoute: {
      onEnter: (nextState, replace) => {
        if (!Cookies.get('uuid')) {
          replace('/login')
        } else {
          replace('/home')
        }
      }
    },
    childRoutes: routes
  };

  return (
    <Router history={history} routes={indexRoute} />
  );
};
