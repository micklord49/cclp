import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Profile from './Profile'

export default class Main extends Component {
  render() {
      return (
        <Profile>

        </Profile>
      );
  }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
