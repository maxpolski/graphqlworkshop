import React, { Component } from 'react';

import MainMenu from './MainMenu';

export default class Layout extends Component {
  render() {
    return (
      <div>
        <MainMenu />
        {this.props.children}
      </div>
    );
  }
}
