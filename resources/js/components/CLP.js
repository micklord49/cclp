import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ControlPanelCLP from './ControlPanelCLP'

export default class Main extends Component {
  render() {
      return (
        <ControlPanelCLP />
      );
  }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
