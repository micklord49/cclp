import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

//
//  Material UI Controls
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//
//  Icons
import { IoLogoFacebook } from 'react-icons/io';
import { IoLogoInstagram } from 'react-icons/io';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoYoutube } from 'react-icons/io';
import { IoLogoTumblr } from 'react-icons/io';

import SMFacebook from './SMFacebook';
import SMInstagram from './SMInstagram';
import SMTwitter from './SMTwitter';
import SMYouTube from './SMYouTube';
import SMTumblr from './SMTumblr';
//
//  CCLP Components

export default class SocialMedia extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        fb: true, 
        instagram: false, 
        twitter: false, 
        youtube: false, 
        tumblr: false 
      };
  }

  componentDidMount(){
  }

  selectForm(id)
  {
    this.setState({ fb: false, instagram: false, twitter: false, youtube: false, tumblr: false });
    switch(id)
    {
        case 'fb':
            this.setState({ fb: true });
            break;
        case 'instagram':
            this.setState({ instagram: true });
            break;
        case 'twitter':
            this.setState({ twitter: true });
            break;
        case 'youtube':
            this.setState({ youtube: true });
            break;
        case 'tumblr':
            this.setState({ tumblr: true });
            break;
    }
    console.log(this.state);
  }


  render() 
  {
    const neu = {
      backgroundColor: "#ffffff" ,
      marginRight: "auto",
      marginTop:10,
    };

    const form = {
      backgroundColor: "#ffffff" ,
      borderLeft: "thin ridge silver",
      borderRadius: 20,
    };

    return (
      <Grid container spacing={3} style={neu}>
        <Grid item xs={2}>
          <List component="nav" style={neu} aria-label="EC">
            <ListItem button onClick={() => this.selectForm("fb")}>
                <ListItemIcon><IoLogoFacebook /></ListItemIcon>
                <ListItemText primary="Facebook" />
            </ListItem>
            <ListItem button onClick={() => this.selectForm("instagram")}>
                <ListItemIcon><IoLogoInstagram /></ListItemIcon>
                <ListItemText primary="Instagram" />
            </ListItem>
            <ListItem button onClick={() => this.selectForm("twitter")}>
                <ListItemIcon><IoLogoTwitter /></ListItemIcon>
                <ListItemText primary="Twitter" />
            </ListItem>
            <ListItem button onClick={() => this.selectForm("youtube")}>
                <ListItemIcon><IoLogoYoutube /></ListItemIcon>
                <ListItemText primary="YouTube" />
            </ListItem>
            <ListItem button onClick={() => this.selectForm("tumblr")}>
                <ListItemIcon><IoLogoTumblr /></ListItemIcon>
                <ListItemText primary="Tumblr" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={10} style={form}>
            <div hidden={!this.state.fb}><SMFacebook owner={this.props.owner}/></div>
            <div hidden={!this.state.instagram}><SMInstagram owner={this.props.owner}/></div>
            <div hidden={!this.state.twitter}><SMTwitter owner={this.props.owner}/></div>
            <div hidden={!this.state.youtube}><SMYouTube owner={this.props.owner}/></div>
            <div hidden={!this.state.tumblr}><SMTumblr owner={this.props.owner}/></div>
        </Grid>
    </Grid>
    );
  }
}

