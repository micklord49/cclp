import React, { Component } from 'react';

import NoIcon from '@material-ui/icons/Block';
import ThumbsUpIcon from '@material-ui/icons/ThumbUp';
import ThumbsDownIcon from '@material-ui/icons/ThumbDown';
import TickIcon from '@material-ui/icons/Done';
import CrossIcon from '@material-ui/icons/Close';
import Sentiment1Icon from '@material-ui/icons/SentimentVerySatisfied';
import Sentiment2Icon from '@material-ui/icons/SentimentSatisfied';
import Sentiment3Icon from '@material-ui/icons/SentimentDissatisfied';
import Sentiment4Icon from '@material-ui/icons/SentimentVeryDissatisfied';


export default class VoteIcon extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }


  render() 
  {
    if(this.props.type==0)     return(<NoIcon />);
    if(this.props.type==1)     return(<ThumbsUpIcon />);
    if(this.props.type==2)     return(<ThumbsDownIcon />);
    if(this.props.type==3)     return(<TickIcon />);
    if(this.props.type==4)     return(<CrossIcon />);
    if(this.props.type==5)     return(<Sentiment1Icon />);
    if(this.props.type==6)     return(<Sentiment2Icon />);
    if(this.props.type==7)     return(<Sentiment3Icon />);
    if(this.props.type==8)     return(<Sentiment4Icon />);
    return(<NoIcon />);
  }
}

