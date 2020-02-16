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

import ControlPanelUserGroup from'./ControlPanelUserGroup';
import CPLUsers from'./CPLUsers';


export default class ControlPanelCLPBranchInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {clp:"", guid:"", name: "", intro: "", about: "", adminusers:null};
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value
    });
  }

  handleChangeAbout(text){
    this.setState({
      body: text
    })
  }

  addUser(user)
  {
    let uri = '/branch/'+this.props.guid+'/'+ user +'/adduser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          console.log("Firing ControlPanelCLPCouncillors.onChange event")
          this.refresh();
        });

  }

  removeUser(user)
  {
    let uri = '/branch/'+this.props.guid+'/'+user+'/removeuser';
    axios.get(uri, {}).then((response) => {      
          //this.props.history.push('/display-item');
          this.refresh();
        });
  }

  componentDidMount(){
    if(typeof(this.props.guid) == "undefined")   return;
    this.refresh();
  }

  componentDidUpdate(prevProps) 
  {
    if(typeof(this.props.guid) == "undefined")   return;
    if(prevProps.guid == this.props.guid)     return;
    this.refresh();
  }
  

  refresh()
  {
    axios.get("/branch/" + this.props.guid + "/edit")
      .then(response => {
        this.setState({ 
          guid: response.data.guid,
          name: response.data.name,
          adminusers: response.data.adminusers });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleSubmit(event) 
  {
    event.preventDefault();

    const branch = {
      type: "INFO",
      name: this.state.name,
    }

    let uri = '/branch/'+this.props.guid;
    axios.patch(uri, branch).then((response) => {
          //this.props.history.push('/display-item');
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
      paddingBottom:16,
      paddingRight: 10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    if(typeof(this.props.guid) == "undefined") 
    {
      return(<div></div>);
    }

    return (
      <div>
        <form style={neu} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid style={{paddingLeft: 10}} container spacing={3}>
            <Grid item xs={12}>
              <Button color="primary" type="submit">
                <SaveIcon />Save
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField id="branch-name" 
                        value={this.state.name} 
                        label="Name" 
                        name="name"
                        onChange={(e)=>{this.handleChange(e);}} 
                        helperText="This is the name of the branch"/>
            </Grid>
            <Grid item xs={12}>
              <h5>Branch Administrators</h5>
              <p>These are the people who can make changes to the branch web pages.</p>
            </Grid>              
            <Grid item xs={12}>
              <CPLUsers onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.state.adminusers} addUser={(guid) => this.addUser(guid)}/>
            </Grid>
          </Grid>
        </form>  
  </div>
    );
  }
}