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

import Layout from './Layout';
import MainPage from './MainPage';
// import PostView from './PostView';
// import UserView from './UserView';
// import Auth from './Auth';
// import Loading from './common/Loading';
import '../assets/styles/main.css';
import '../assets/styles/bootstrap.css';

class App extends Component {
  render() {
    return (
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
            component={MainPage}
          />
          { /* <Route
            path="post/:postId"
            component={PostView}
          />
          <Route
            path="user(/:userId)"
            component={UserView}
          />
          <Route
            path="auth"
            component={Auth}
          /> */}
        </Route>
      </Router>
    );
  }
}

// App.propTypes = {

// };

export default App;
