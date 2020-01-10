import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import HomeIcon from '@material-ui/icons/Home';
import UserList from './UserList';
import UserSearch from './UserSearch';


import { IconContext } from "react-icons";

import { IoLogoFacebook } from 'react-icons/io';
import { IoLogoInstagram } from 'react-icons/io';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoYoutube } from 'react-icons/io';
import { IoLogoTumblr } from 'react-icons/io';

export default class ControlPanelUserGroup extends Component {
  constructor(props) {
      super(props);
      this.state = {facebook: '', twitter: '', instagram: '', youtube: '', tumblr: ''};
      this.addUser = this.addUser.bind(this);
      this.onRemoveUser = this.onRemoveUser.bind(this);
  }

  componentDidMount(){
  }

  addUser(guid)
  {
    console.log("Firing ControlPanelUserGroup.addUser");
    this.props.addUser(guid);
  }

  onRemoveUser(guid)
  {
    console.log("Firing ControlPanelUserGroup.onremoveuser");
    this.props.onremoveuser(guid);
  }

  render() 
  {
    return (
        <div>
            <UserList users={this.props.users} onremoveuser={(guid) => {this.onRemoveUser(guid);}} ></UserList>
            <UserSearch addUser={(guid) => { this.addUser(guid)}} ></UserSearch>
        </div>
    );
  }
}


