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
  }


  render() 
  {
    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    return (
      <Grid container spacing={3}>
        <Grid item xs={3}>
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
        <Grid item xs={9}>
            <SMFacebook owner={this.props.owner} id="FacebookSheet"/>
        </Grid>
    </Grid>
    );
  }
}

