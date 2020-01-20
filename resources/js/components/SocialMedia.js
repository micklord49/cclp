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
//
//  CCLP Components

export default class SocialMedia extends Component {
  constructor(props) {
      super(props);
      this.state = {roles: new Array(), selectedrole: ''};
      //this.selectRole = this.selectRole.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  selectRole(r){
    for(let i=0;i<this.state.roles.length;i++)
    {
      if(this.state.roles[i].guid == r)  
      {
        this.setState({ selectedrole: this.state.roles[i] });
      }
    }
  }

  componentDidMount(){
    axios.get("/ec/1/edit")
    .then(response => {
      this.setState({  roles: response.data.roles });
      this.setState({  selectedrole: response.data.roles[0] });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  handleSubmit(event) 
  {
    event.preventDefault();

    const clp = {
      type: 'INFO',
      name: this.state.name,
      description: this.state.description,
      dn: this.state.dn,
      phone: this.state.phone,
      email: this.state.email
    }

    let uri = '/clp/1';
    axios.patch(uri, clp).then((response) => {
          //this.props.history.push('/display-item');
    });
  }


  rolechanged()
  {
    console.log("ControlPanelEC - role changes");
    axios.get("/ec/1/edit")
    .then(response => {
      this.setState({  roles: response.data.roles });
      this.selectRole(this.state.selectedrole.guid);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() 
  {
    let listitems = "";
    if(this.state.roles != null)
    {
      listitems = this.state.roles.map((item,key) =>
            <ListItem key={item.guid} button onClick={() => this.selectRole(item.guid)}>
              <ListItemIcon>
              {item.mandatory == 1 ? <StarIcon /> : <StarOutlineIcon />}
              </ListItemIcon>
              <ListItemText primary={item.description} />
            </ListItem>
      );
    }
    
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
            <ListItem button onClick={() => this.selectRole(item.guid)}>
                <ListItemIcon><IoLogoFacebook /></ListItemIcon>
                <ListItemText primary={Facebook} />
            </ListItem>
            <ListItem button onClick={() => this.selectRole(item.guid)}>
                <ListItemIcon><IoLogoTwitter /></ListItemIcon>
                <ListItemText primary={Twitter} />
            </ListItem>
            <ListItem button onClick={() => this.selectRole(item.guid)}>
                <ListItemIcon><IoLogoTwitter /></ListItemIcon>
                <ListItemText primary={Twitter} />
            </ListItem>
            <ListItem button onClick={() => this.selectRole(item.guid)}>
                <ListItemIcon><IoLogoInstagram /></ListItemIcon>
                <ListItemText primary={Instagram} />
            </ListItem>
            <ListItem button onClick={() => this.selectRole(item.guid)}>
                <ListItemIcon><IoLogoYoutube /></ListItemIcon>
                <ListItemText primary={YouTube} />
            </ListItem>
            <ListItem button onClick={() => this.selectRole(item.guid)}>
                <ListItemIcon><IoLogoTumblr /></ListItemIcon>
                <ListItemText primary={Tumblr} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
        </Grid>
    </Grid>
    );
  }
}

