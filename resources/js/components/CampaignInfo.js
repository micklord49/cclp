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

import AlertSave from './AlertSave';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import HelpText from './HelpText';
import CPLUsers from'./CPLUsers';
import TagControl from'./TagControl';

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

const useStyles = makeStyles({
  // style rule
  foo: props => ({
    backgroundColor: props.backgroundColor,
  }),
  bar: {
    // CSS property
    color: props => props.color,
  },
});


class CampaignInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        title: '', 
        subtitle: '', 
        body: '', 
        dn: '', 

        adminusers: new Array(),
        tags: new Array(),

        opensuccess: false, 
        openfail: false, 
        failmessage: '',         

      };
      this.Reloading = false;
    }


  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(event);
  
    this.setState({
      [name]: value
    });
    console.log(this.state);

  }

  handleChangeBody(value) {
    this.setState({ about: value })
  }

  componentDidUpdate(prevProps) 
  {
    if(typeof(this.props.guid) == "undefined")   return;
    if(prevProps.guid == this.props.guid)     return;

    if(this.Reloading)  this.Reloading = false;
    else                this.refresh();
  }
  
  componentDidMount(){
    this.refresh();
  }

  addUser(guid)
  {
    let uri = '/campaign/'+this.props.guid+"/"+guid+'/adduser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });

  }

  addTag(guid)
  {
    let uri = '/campaign/'+this.props.guid+"/"+guid+'/addtag';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });

  }

  removeTag(guid)
  {
    let uri = '/campaign/'+this.props.guid+"/"+guid+'/removetag';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });
  }


  removeUser(guid)
  {
    let uri = '/campaign/'+this.props.guid+"/"+guid+'/removeuser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });
  }

  refresh()
  {
    if(this.props.guid=='') return;
    console.log("Retrieving campaign");

    this.Reloading = true;

    axios.get("/campaign/"+this.props.guid+"/edit")
      .then(response => {
        console.log(response);
        r_dn = response.data.dn || "";
        r_title = response.data.title || "";
        r_subtitle = response.data.subtitle || "";
        r_body = response.data.body || "";
        this.setState({ dn: r_dn, 
                        title: r_title, 
                        subtitle: r_subtitle, 
                        body: r_body,
                        adminusers: response.data.adminusers,
                        tags: response.data.tags
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
      title: this.state.title,
      subtitle: this.state.subtitle,
      body: this.state.body,
    }

    let uri = '/campaign/'+this.props.guid;
    axios.patch(uri, user).then((response) => {
      this.setState({ opensuccess: true })
    })
    .catch(function (error) {
      this.setState({ failmessage: error, openfail: true })
      console.log(error);
      });

  }


  render() 
  {
    if(this.props.owner=="")
    {
      return(<p>Loading...</p>);
    }
    const { classes } = this.props;

    const neuhelp = {
      //backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingBottom:16,
      paddingRight:20,
      //boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
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
    };

    const container = {
      border: '1px solid gray',
      minHeight: 400,
      backgroundColor: '#ffffff',
      marginLeft: 20,
      marginRight: 20,
      paddingLeft:0,
      paddingRight:20,
    };

    return (
      <div style={container}>
    <form noValidate autoComplete="off" onSubmit={()=>this.handleSubmit()} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Button color="primary" type="submit">
                <SaveIcon />Save
            </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
                <TextField id="campaign-title" 
                value={this.state.title} 
                label="Title" 
                name="title"
                onChange={(e)=>{this.handleChange(e);}} 
                fullWidth
                multiline
                placeholder="Title of your campaign"
                helperText="Try to keep this under 5 words"/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="campaign-subtitle" 
                value={this.state.subtitle} 
                label="Subtitle" 
                name="subtitle"
                onChange={(e)=>{this.handleChange(e);}} 
                fullWidth
                multiline
                placeholder="Subtitle of your campaign"
                helperText="One sentence that expands on yoour title"/>
            </Grid>
            <Grid item xs={12}>
              <p>Add tags to categorise this campaign</p>
              <TagControl onremovetag={(guid)=>{this.removeTag(guid)}} tags={this.state.tags} addTag={(guid) => this.addTag(guid)}/>              
            </Grid>
            <Grid item xs={12}>
              <p>Select the users who will be able to access the administration screen</p>
              <CPLUsers onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.state.adminusers} addUser={(guid) => this.addUser(guid)}/>              
            </Grid>
            <Grid item xs={12}>
                <p>You can also point your own internet domain name to this campaign it you like.</p>
                <TextField id="campaign-dn" 
                value={this.state.dn} 
                label="Domain Name" 
                name="dn"
                onChange={(e)=>{this.handleChange(e);}} 
                fullWidth
                helperText="This is your personal domain name just for this campaign."/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={12} style={upstyle}>
                <HelpText name='campaign.text' style="neuhelp"/>      
              </Grid>
            <Grid item xs={12} style={upstyle}>
              <div style={editstyle}>
                <ReactQuill value={this.state.body}
                    onChange={(e)=>{this.handleChangeBody(e);}} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>  
    <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="details"/>
  </div>    );
  }
}

export default withStyles(styles)(CampaignInfo)