import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MainMenu extends Component {
  signOut = () => {
    localStorage.setItem('token', '');
  }

  render() {
    const token = localStorage.getItem('token');
    const signInOutText = token ? 'Sign Out' : 'Sign In';

    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link
              to="/"
            >
              <span
                className="nav-link"
              >
                Main
              </span>
            </Link>
          </li>
        </ul>
        <span className="nav-item pull-right">
          <Link
            to="/auth"
          >
            <span
              className="nav-link"
              onClick={this.signOut}
            >
              {signInOutText}
            </span>
          </Link>
        </span>
      </nav>
    );
  }
}
