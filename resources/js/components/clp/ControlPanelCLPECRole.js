import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarOutlineIcon from '@material-ui/icons/StarBorder';
import CPLUsers from '../CPLUsers';
import HelpText from '../HelpText';

export default class ControlPanelCLPECRole extends Component {
  constructor(props) {
      super(props);
      this.state = {role: new Object()};
  }

  componentDidMount(){
  }

  addUser(guid)
  {
    let uri = '/ec/'+this.props.role.guid+'/'+guid+'/adduser';
    axios.get(uri, {}).then((response) => {
          this.props.onChange();
        });
  }

  removeUser(guid)
  {
    let uri = '/ec/'+this.props.role.guid+'/'+guid+'/removeuser';
    axios.get(uri, {}).then((response) => {
          this.props.onChange();
        });
  }

  render() 
  {
    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingLeft: 10,
      paddingTop: 10,
      paddingBottom: 10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h5 style={neu}>{this.props.role.description}</h5>
          </Grid>
          <Grid item xs={12}>
            <CPLUsers onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.props.role.users} addUser={(guid) => this.addUser(guid)}/>
          </Grid>
          <Grid item xs={12}>
            <HelpText name={this.props.role.help}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

