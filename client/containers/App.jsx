import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

import Layout from './Layout';
import MainPage from './MainPage';
import PostView from './PostView';
import UserView from './UserView';
import Auth from './Auth';
import '../assets/styles/main.css';
import '../assets/styles/bootstrap.css';

export default () => (
  <Router
    history={browserHistory}
  >
    <Route
      path="/"
      component={Layout}
    >
      <IndexRoute
        component={MainPage}
      />
      <Route
        path="post/:postId"
        component={PostView}
      />
      <Route
        path="user(/:userId)"
        component={UserView}
      />
    </Route>
    <Route
      path="auth"
      component={Auth}
    />
  </Router>
);
