import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Branch from './Branch'

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
        <Branch guid={this.props.guid} />
      );
  }
}

if (document.getElementById('root')) {
  if (document.getElementById('datapipe')) {
    const element = document.getElementById('datapipe')
    const props = Object.assign({}, element.dataset)

    // render element with props (using spread)

    ReactDOM.render(<Main {...props}/>, document.getElementById('root'));
  }
  else {
    ReactDOM.render(<h1>GUID PROPERTY MISSING</h1>, document.getElementById('root'));
  }
}
