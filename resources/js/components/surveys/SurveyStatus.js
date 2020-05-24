import React, { Component } from 'react';
import DraftIcon from '@material-ui/icons/Textsms';
import PublishedIcon from '@material-ui/icons/Chat';
import PublishingIcon from '@material-ui/icons/Print';


export default class SurveyStatus extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }


  render() 
  {
    if(this.props.active)     return(<DraftIcon />);
    return(<PublishingIcon />);
  }
}

