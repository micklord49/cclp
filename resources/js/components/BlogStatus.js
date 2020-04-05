import React, { Component } from 'react';
import DraftIcon from '@material-ui/icons/Textsms';
import PublishedIcon from '@material-ui/icons/Chat';
import PublishingIcon from '@material-ui/icons/Print';


export default class BlogStatus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }


  render() 
  {
    if(this.props.status=="draft")     return(<DraftIcon />);
    if(this.props.status=="published")     return(<PublishedIcon />);
    return(<PublishingIcon />);
  }
}

