import React, { Component } from 'react';
import UnreadIcon from '@material-ui/icons/Mail';
import ReadIcon from '@material-ui/icons/Drafts';


export default class MessageStatus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }


  render() 
  {
    if(this.props.status=="read")     return(<ReadIcon />);
    return(<UnreadIcon />);
  }
}

