import React from 'react';
import { Link } from 'react-router';

export default () => (
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
      <li className="nav-item">
        <Link
          to="/about"
        >
          <span
            className="nav-link"
          >
            About
          </span>
        </Link>
      </li>
    </ul>
  </nav>
);
