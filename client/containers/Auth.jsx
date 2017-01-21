import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import makeFetch from 'fetch-ponyfill';

const { fetch } = makeFetch();

export default class Auth extends Component {
  state = {
    login: '',
    password: '',
  }

  handleLoginEnter = ({ target: { value } }) => {
    this.setState({ login: value });
  }

  handlePasswordEnter = ({ target: { value } }) => {
    this.setState({ password: value });
  }

  handleCredentialsSend = (event) => {
    event.preventDefault();

    const {
      login,
      password,
    } = this.state;

    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    })
      .then(res => res.json())
      .then(this.handleAuthResponse)
      .catch(err => console.error(`Something went wrong ${err}`));
  }

  handleAuthResponse = (response) => {
    const { token } = response;
    if (!token) {
      this.setState({ message: 'Login or/and password are incorrect' });
      return;
    }

    localStorage.setItem('token', token);
    browserHistory.push('');
  }

  render() {
    const {
      login,
      password,
      message,
    } = this.state;

    return (
      <div>
        <form>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            name="login"
            value={login}
            onChange={this.handleLoginEnter}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handlePasswordEnter}
          />

          <span>{ message }</span>

          <button
            onClick={this.handleCredentialsSend}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }
}
