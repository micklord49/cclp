import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import SaveIcon from '@material-ui/icons/Save';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';

import AlertSave from '../AlertSave';
import CPLUsers from '../CPLUsers';
import HelpText from '../HelpText';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },

  promptarea: {
    paddingTop: 20,
    paddingBottom: 10,
    fontSize: "80%",
    color: "#808080",
  },
});


class BranchInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '', 
        dn: '', 
        intro: '', 
        about: '', 
        active: false, 
        campaign: false, 

        adminusers: null,

        usesubscriptionlist: true, 
        subscriptionlist: '', 
        subscriptionlists: [{value: '', display: '(Select your list)'}],

        useactionlist: true, 
        actionlist: '', 
        actionlists: [{value: '', display: '(Select your list)'}],


        opensuccess: false, 
        openfail: false, 
        failmessage: '',         

      };
      this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(event);
  
    this.setState({
      [name]: value
    });

    this.reloading = false;
    console.log(this.state);

  }

  handleChangeAbout(value) {
    this.setState({ about: value })
  }

  componentDidUpdate(){
    if(this.reloading)
    {
      this.reloading = false;
      return;
    }
    this.refresh();
  }
  
  componentDidMount(){
    this.refresh();
  }


  refresh()
  {    
    if(typeof(this.props.guid)=="undefined")  return;
    if(this.props.uid=='')  return;
    console.log("Retrieving branch");
    this.reloading=true;
    axios.get("/branch/"+this.props.guid+"/edit")
      .then(response => {
        this.setState({ dn: response.data.dn, 
                        intro: response.data.intro, 
                        about: response.data.about, 
                        name: response.data.name,
                        usesubscriptionlist: response.data.usesubscriptionlist,
                        subscriptionlist: response.data.subscriptionlist,
                        subscriptionlists: response.data.subscriptionlists,
                        useactionlist: response.data.useactionlist,
                        actionlist: response.data.actionlist,
                        actionlists: response.data.actionlists,
                        adminusers: response.data.adminusers,
                        chair: response.data.chair,
                        secretary: response.data.secretary,
                        rep: response.data.rep,
                      });
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  handleSubmit(event) 
  {
    event.preventDefault();

    const user = {
      type: 'INFO',
      dn: this.state.dn,
      intro: this.state.intro,
      about: this.state.about,
      name: this.state.name,
      usesubscriptionlist: this.state.usesubscriptionlist,
      subscriptionlist: this.state.subscriptionlist,
      useactionlist: this.state.useactionlist,
      actionlist: this.state.actionlist,
    }

    let uri = '/branch/'+this.props.guid;
    axios.patch(uri, user).then((response) => {
      this.setState({ opensuccess: true })
    })
    .catch(function (error) {
      this.setState({ failmessage: error, openfail: true })
      console.log(error);
      });

  }

  addUser(user)
  {
    axios.get('/branch/'+this.props.guid+'/'+ user +'/adduser', {})
        .then((response) => {
          this.refresh();
        });
  }

  addChair(user)
  {
    axios.get('/branch/'+this.props.guid+'/'+ user +'/addchair', {})
        .then((response) => {
          this.refresh();
        });
  }

  addSecretary(user)
  {
    axios.get('/branch/'+this.props.guid+'/'+ user +'/addsecretary', {})
        .then((response) => {
          this.refresh();
        });
  }

  addRep(user)
  {
    axios.get('/branch/'+this.props.guid+'/'+ user +'/addrep', {})
        .then((response) => {
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


  render() 
  {
    const { classes } = this.props;

    const neu = {
      backgroundColor: "#ffffff" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingBottom:16,
      paddingLeft:10,
      paddingRight: 20,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const neuhelp = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingBottom:16,
      paddingRight:20,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const upstyle = {
      marginLeft: 20,
      marginRight: 20,
      paddingLeft:10,
      paddingRight:20,
    };

    const editstyle = {
      border: '1px solid gray',
      minHeight: 400,
      backgroundColor: '#ffffff',
      marginLeft: 0,
      marginRight: 0,
      paddingLeft:0,
      paddingRight:0,
    }


    return (
      <div style={neu}>
    <form noValidate autoComplete="off" onSubmit={this.handleSubmit} >
      <Grid container spacing={4}>
        <Grid item xs={12}>
            <Button color="primary" variant="contained" type="submit">
                <SaveIcon />Save
            </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
          <Grid item xs={12}>
              <TextField id="branch-name" 
                        value={this.state.name} 
                        label="Name" 
                        name="name"
                        onChange={(e)=>{this.handleChange(e);}} 
                        helperText="This is the name of the branch"/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="info-intro" 
                value={this.state.intro} 
                label="Introduce your branch" 
                name="intro"
                onChange={(e)=>{this.handleChange(e);}} 
                fullWidth
                multiline
                placeholder="Introduce your branch"
                helperText="This is a short introduction to be shown on your card."/>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="actionlist-select-label">Include an Action List</InputLabel>
                  <Select
                    labelId="actionlist-select-label"
                    id="actionlist-select"
                    value={this.state.actionlist}
                    name="actionlist"
                    autoWidth
                    disabled={!this.state.useactionlist}
                    onChange={(e)=>{this.handleChange(e);}}
                    startAdornment={
                      <InputAdornment position="start">
                      <Switch
                            name="useactionlist"
                            checked={this.state.useactionlist == 1}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="useactionlist"
                            color="primary"
                          />
                      </InputAdornment>
                    }
                  >
                  {this.state.actionlists.map((list) => <MenuItem key={'k'+list.value} value={list.value}>{list.display}</MenuItem>)}
                </Select>

              </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="subscriptionlist-select-label">Use a news subscription list</InputLabel>
                  <Select
                    labelId="subscriptionlist-select-label"
                    id="subscriptionlist-select"
                    value={this.state.subscriptionlist}
                    name="subscriptionlist"
                    autoWidth
                    disabled={!this.state.usesubscriptionlist}
                    onChange={(e)=>{this.handleChange(e);}}
                    startAdornment={
                      <InputAdornment position="start">
                      <Switch
                            name="usesubscriptionlist"
                            checked={this.state.usesubscriptionlist == 1}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="usesubscriptionlist"
                            color="primary"
                          />
                      </InputAdornment>
                    }
                  >
                  {this.state.subscriptionlists.map((list) => <MenuItem key={'k'+list.value} value={list.value}>{list.display}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <p>You can also point your own internet domain name to this site it you like.</p>
            </Grid>
            <Grid item xs={12}>
                <TextField id="info-dn" 
                value={this.state.dn} 
                label="Domain Name" 
                name="dn"
                onChange={(e)=>{this.handleChange(e);}} 
                fullWidth
                helperText="This is your personal domain name."/>
            </Grid>
            <Grid item xs={12}>
              <h5>Branch Administrators</h5>
              <p>These are the people who can make changes to the branch web pages.</p>
            </Grid>              
            <Grid item xs={12}>
              <CPLUsers onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.state.adminusers} addUser={(guid) => this.addUser(guid)}/>
            </Grid>
            <Grid item xs={12}>
              <h5>Chair</h5>
              <p>Who is the Branch Chair - this can be more than one person in the event of a job share</p>
            </Grid>              
            <Grid item xs={12}>
              <CPLUsers onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.state.chair} addUser={(guid) => this.addChair(guid)}/>
            </Grid>
            <Grid item xs={12}>
              <h5>Secretary</h5>
              <p>Who is the Branch Secretary - this can be more than one person in the event of a job share</p>
            </Grid>              
            <Grid item xs={12}>
              <CPLUsers onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.state.secretary} addUser={(guid) => this.addSecretary(guid)}/>
            </Grid>
            <Grid item xs={12}>
              <h5>EC Representative</h5>
              <p>Who is the Branch representative to the CLP Executive Committee - this can be more than one person in the event of a job share</p>
            </Grid>              
            <Grid item xs={12}>
              <CPLUsers onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.state.rep} addUser={(guid) => this.addRep(guid)}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={12} style={upstyle}>
                <HelpText name='councillor.text' style="neuhelp"/>      
              </Grid>
            <Grid item xs={12} style={upstyle}>
              <div style={editstyle}>
              <ReactQuill value={this.state.about}
                  onChange={(e)=>{this.handleChangeAbout(e);}} />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
            <Button color="primary" variant="contained" type="submit">
                <SaveIcon />Save
            </Button>
        </Grid>
      </Grid>
    </form>  
    <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="details"/>
  </div>    );
  }
}

export default withStyles(styles)(BranchInfo)