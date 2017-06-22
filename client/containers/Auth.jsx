import React, { Component } from 'react';
import Relay, { createContainer } from 'react-relay';
import { browserHistory } from 'react-router';

export default class Auth extends Component {
  state = {
    login: '',
    password: '',
  }

  constructor(props) {
    super();
    
  }

  handleLoginEnter = ({ target: { value } }) => {
    this.setState({ login: value });
  }

  handlePasswordEnter = ({ target: { value } }) => {
    this.setState({ password: value });
  }

  // handleCredentialsSend = (event) => {
  //   event.preventDefault();

  //   const {
  //     login,
  //     password,
  //   } = this.state;

  //   fetch('/api/auth', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ login, password }),
  //   })
  //     .then(res => res.json())
  //     .then(this.handleAuthResponse)
  //     .catch(err => console.error(`Something went wrong ${err}`));
  // }

  // handleAuthResponse = (response) => {
  //   const { token } = response;
  //   if (!token) {
  //     this.setState({ message: 'Login or/and password are incorrect' });
  //     return;
  //   }

  //   localStorage.setItem('token', token);
  //   browserHistory.push('');
  // }

  render() {
    const {
      login,
      password,
      message,
    } = this.state;

    return (
      <form className="auth-page__auth-form">
        <div className="form-group">
          <label htmlFor="login">Login:</label>
          <input
            className="form-control"
            type="text"
            name="login"
            value={login}
            onChange={this.handleLoginEnter}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={this.handlePasswordEnter}
          />
        </div>

        <span>{ message }</span>

        <button
          onClick={this.handleCredentialsSend}
        >
          Sign In
        </button>
      </form>
    );
  }
}

// export default createContainer(Auth, {
//   initialVariables: {
//     login: '',
//     password: '',
//   },
//   fragment: {
//     me: () => Relay.QL`
//       fragment on Viewer {
//         me {
//           firstName,
//           lastName,
//         }
//       }
//     `,
//   },
// });
