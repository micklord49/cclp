import React, { Component } from 'react';

import VoteIcon from '@material-ui/icons/HowToVote';
import ContactIcon from '@material-ui/icons/Contacts';
import TextIcon from '@material-ui/icons/Notes';
import ScaleIcon from '@material-ui/icons/LinearScale';


export default class QuestionIcon extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }


  render() 
  {
    if(this.props.type==1)     return(<VoteIcon />);
    if(this.props.type==2)     return(<TextIcon />);
    if(this.props.type==3)     return(<ContactIcon />);
    return(<ScaleIcon />);
  }
}

