import React, { Component } from 'react';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import PetitionIcon from '@material-ui/icons/PlaylistAddCheck';
import OpenLetterIcon from '@material-ui/icons/PostAdd';


export default class ListType extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
  }


  render() 
  {
    if(this.props.type=="1")     return(<SubscriptionIcon />);
    if(this.props.type=="2")     return(<PetitionIcon />);
    return(<OpenLetterIcon />);
  }
}

