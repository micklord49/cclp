import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CouncilEdit from './CouncilEdit'

export default class Main extends Component {
  render() {
      return (
        <CouncilEdit guid={this.props.guid}/>
      );
  }
}

if (document.getElementById('root')) {
  if (document.getElementById('datapipe')) {
    const element = document.getElementById('datapipe')
    const props = Object.assign({}, element.dataset)
    console.log(props);
    ReactDOM.render(<Main {...props}/>, document.getElementById('root'));
  }
  else {
    ReactDOM.render(<h1>GUID PROPERTY MISSING</h1>, document.getElementById('root'));
  }
}
