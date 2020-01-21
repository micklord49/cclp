import React, { Component } from 'react';
import MuiAlert from '@material-ui/lab/Alert';

export default class ProfileInfo extends Component {
  constructor(props) {
      super(props);
  }

  componentDidMount(){
  }

  render() 
  {
    return (
        <MuiAlert elevation={6} variant="filled" {...props} />
    );
  }
}