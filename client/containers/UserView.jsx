import React, { Component, PropTypes } from 'react';

import { getUser, getCurrentUser } from '../apiCalls/userDataCalls';
import Loading from './common/Loading';

export default class UserView extends Component {
  state = {
    userData: {},
    isFetching: true,
  }

  componentWillMount() {
    const {
      params: {
        userId,
      },
    } = this.props;

    if (userId) {
      getUser(userId)
        .then(userData =>
          this.setState({
            userData,
            isFetching: false,
          }));
      return;
    }

    const token = localStorage.getItem('token');

    getCurrentUser(token)
      .then(userData =>
        this.setState({
          userData,
          isFetching: false,
        }));
  }

  render() {
    const {
      userData,
      isFetching,
    } = this.state;

    if (isFetching) {
      return (
        <Loading />
      );
    }

    return (
      <div>
        Name: {userData.firstName}
      </div>
    );
  }
}

UserView.propTypes = {
  params: PropTypes.shape({
    userId: PropTypes.string,
  }).isRequired,
};
