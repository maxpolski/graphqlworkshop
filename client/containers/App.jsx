import React, { Component, PropTypes } from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware,
} from 'react-router';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';

import mainPageQueries from '../relay/queries/mainPageQueries';
import Layout from './Layout';
import MainPage from './MainPage';
import PostView from './PostView';
import About from './About';
// import UserView from './UserView';
import Auth from './Auth';
// import Loading from './common/Loading';
import '../assets/styles/main.css';
import '../assets/styles/bootstrap.css';

const prepareParams = () => ({
  token: localStorage.getItem('token'),
});

const preparePostViewPageParams = (params) => {
  const { postId } = params;

  return {
    ...params,
    token: localStorage.getItem('token'),
    postId,
  };
};

export default () => (
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route
      path="/"
      component={Layout}
    >
      <IndexRoute
        queries={mainPageQueries}
        prepareParams={prepareParams}
        component={MainPage}
      />
      <Route
        path="post/:postId"
        queries={mainPageQueries}
        prepareParams={preparePostViewPageParams}
        component={PostView}
      />
      <Route
        path="about"
        component={About}
      />
      { /* <Route
        path="user(/:userId)"
        component={UserView}
      /> */}
      <Route
        path="auth"
        component={Auth}
      />
    </Route>
  </Router>
);
