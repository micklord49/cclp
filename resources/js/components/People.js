import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ControlPanelPeople from './ControlPanelPeople'

export default class Main extends Component {
  render() {
      return (
        <ControlPanelPeople />
      );
  }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
