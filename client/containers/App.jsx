import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
import Loading from './common/Loading';
import { initialize } from '../actions/general';
import '../assets/styles/main.css';
import '../assets/styles/bootstrap.css';

class App extends Component {
  componentWillMount() {
    this.props.initialize();
  }

  render() {
    const {
      isInitialized,
    } = this.props;

    if (!isInitialized) {
      return (
        <Loading />
      );
    }

    return (
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
          <Route
            path="auth"
            component={Auth}
          />
        </Route>
      </Router>
    );
  }
}

App.propTypes = {
  initialize: PropTypes.func.isRequired,
};

const mapStateToProps = ({ general }) => ({
  isInitialized: general.isInitialized,
});

const mapDispatchToProps = dispatch => ({
  initialize: initialize(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
