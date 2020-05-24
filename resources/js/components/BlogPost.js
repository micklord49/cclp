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
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import UnpublishIcon from '@material-ui/icons/Stop';
import StopPublishIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

import { IoLogoFacebook } from 'react-icons/io';
import { IoLogoInstagram } from 'react-icons/io';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoYoutube } from 'react-icons/io';
import { IoLogoTumblr } from 'react-icons/io';


import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

import UploadPicture from './UploadPicture';

export default class BlogPost extends Component {
  constructor(props) {
      super(props);
      this.state = {
        guid: props.guid, 
        owner: props.owner, 
        title: "", 
        subtitle: "",
        body: "",

        useactionlist: false,
        actionlist: "",
        lists: [{value: '', display: '(Select your list)'}],

        showcampaign: false,
        campaign: "",
        campaigns: [{value: '', display: '(Select your campaign)'}],


        showsurvey: false,
        survey: "",
        surveys: [{value: '', display: '(Select your survey)'}],


        published: false,
        publishnow: true,
        publishfrom: Date.now(),

        tofacebook: true,
        totwitter: true,
      };
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;    
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    console.log(event);
    console.log(name+':'+value+'<--');
    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  handleChangeBody(text){
    this.setState({
      body: text
    })
  }

  
  componentDidMount(){
    if(!this.state.guid == "")
    {
        this.refresh();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.guid !== prevProps.guid) 
    {
      this.refresh();
    }
  }

   refresh()
   {
    let uri = '/blog/'+this.props.guid+'/edit';
    axios.get(uri).then((response) => {
      this.setState({
        guid: response.data.guid, 
        owner: response.data.owner, 
        title: response.data.title, 
        subtitle: response.data.subtitle, 
        body: response.data.body,

        useactionlist: response.data.useactionlist,
        actionlist: response.data.actionlist || '',
        lists: response.data.lists,

        showcampaign: response.data.showcampaign,
        campaign: response.data.campaign ?? '',
        campaigns: response.data.campaigns,

        showsurvey: response.data.showsurvey,
        survey: response.data.survey ?? '',
        surveys: response.data.surveys,

        status: response.data.status,
        priority: response.data.priority,
        published: response.data.published,
        publishfrom: response.data.publishfrom,
        publishnow: response.data.publishnow,
        totwitter: response.data.totwitter,
        tofacebook: response.data.tofacebook,
        events: response.data.events,
      });
    });
   }


  async onSave() 
  {
    const post = {
      guid: this.state.guid,
      owner: this.state.owner,
      title: this.state.title,
      subtitle: this.state.subtitle,
      body: this.state.body,

      useactionlist: this.state.useactionlist,
      actionlist: this.state.actionlist,

      showcampaign: this.state.showcampaign,
      campaign: this.state.campaign,

      showsurvey: this.state.showsurvey,
      survey: this.state.survey,

      priority: this.state.priority,
      totwitter: this.state.totwitter,
      tofacebook: this.state.tofacebook,
      publishfrom: this.state.publishfrom,
      publishnow: this.state.publishnow,
    }

    let uri = '/blog/'+this.props.guid;
    await axios.patch(uri, post)
      .then((response) => {
      })
  }

  async saveStatus(newval) 
  {
    const post = {
      guid: this.state.guid,
      status: newval,
    }

    let uri = '/blog/'+this.props.guid;
    await axios.patch(uri, post)
      .then((response) => {
      })
  }

  render() 
  {
    if(this.props.owner=='')
    {
      return(<div>Loading...</div>);
    }
    if(this.props.guid=='')
    {
      return(<div></div>);
    }

    var events="";

    if(this.state.events != null)
    {
      events = this.state.events.map((item,key) =>
        <ListItem key={item.guid}>
          <ListItemIcon>
          {(item.publishto || '') == 'twitter' &&
                  <IoLogoTwitter />
          }
          {(item.publishto || '') == 'facebook' &&
                  <IoLogoFacebook />
          }
          </ListItemIcon>
          <ListItemText primary={item.executeat} />
          {item.executed == 0 &&
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
            }
        </ListItem>
      );
  
    }



    const form = {
      backgroundColor: "#ffffff" ,
      paddingTop: 10,
      marginTop: 10,
      borderTop: "thin ridge silver",
      borderRadius: 20,
    };

    var pub = <Button color="primary" variant="contained" startIcon={<PublishIcon />} style={{align:'right'}} color="inherit" onClick={()=>{this.saveStatus("publishing");}}>
                Publish
              </Button>;
 
    if(this.state.status=="publishing")
    {
      pub = <Button color="secondary" variant="contained" startIcon={<StopPublishIcon />} style={{align:'right'}} color="inherit" onClick={()=>{this.saveStatus("draft");}}>
                  Stop Publishing
                </Button>;
    }
    else if(this.state.status=="published")
    {
      pub = <Button color="secondary" variant="contained" startIcon={<UnpublishIcon />} style={{align:'right'}} color="inherit" onClick={()=>{this.saveStatus("draft");}}>
                  Unpublish
                </Button>;
    }

    var actionlist = ""               ;
    if(this.state.lists.count>-0)
    {
      actionlist = 
      <Grid item xs={12}>
      <FormControlLabel
        control={
          <Switch
            name="useactionlist"
            checked={this.state.useactionlist == 1}
            onChange={(e)=>{this.handleChange(e);}}
            value="useactionlist"
            color="primary"
          />
        }
        label="Include subscription list"
      />
    <FormControl fullWidth>
      <InputLabel id="actionlist-select-label">Action List</InputLabel>
      <Select
        labelId="actionlist-select-label"
        id="actionlist-select"
        value={this.state.actionlist}
        name="actionlist"
        autoWidth
        onChange={(e)=>{this.handleChange(e);}}
      >
        {this.state.lists.map((list) => <MenuItem key={'k'+list.value} value={list.value}>{list.display}</MenuItem>)}
      </Select>
    </FormControl>
    </Grid>;
      }


    return (
      <Grid container spacing={4} style={form}>
        <Grid container item xs={12}>
          <Grid item xs={1}>
              <Button color="primary" disabled={this.state.published} variant="contained" startIcon={<SaveIcon />} onClick={()=>{this.onSave();}}>
                Save
              </Button>
            </Grid>
            <Grid item xs={11} style={{textAlign:'right'}}>
              {pub}
          </Grid>
        </Grid>
        <Grid item xs={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextField 
                    id="blog-title" value={this.state.title} 
                    label="Title" 
                    name="title"
                    fullWidth
                    onChange={(e)=>{this.handleChange(e);}} 
                    helperText="(Describe the subject of your post - keep it short)"
                    InputProps={{
                      readOnly: this.state.published,
                    }}
                          />
            </Grid>
              <Grid item xs={12}>
                  <TextField 
                      id="blog-subtitle" value={this.state.subtitle} 
                      label="Subtitle" 
                      name="subtitle"
                      fullWidth                      
                      onChange={(e)=>{this.handleChange(e);}} 
                      helperText="(Subtitle for your post - expand on the subject)"
                      InputProps={{
                        readOnly: this.state.published,
                      }}
                    />
              </Grid>
              <Grid item xs={12}>
                <p>Body of your post</p>
                <div style={{backgroundColor:"#ffffff", minHeight:300}}>
                  <ReactQuill value={this.state.body} readOnly={this.state.published}
                              onChange={(e)=>{this.handleChangeBody(e);}} />
                </div>
              </Grid>

              <Grid item xs={12}>

                <FormControl fullWidth>
                  <InputLabel id="campaign-select-label">Include a link to a Campaign</InputLabel>
                  <Select
                    labelId="campaign-select-label"
                    id="campaign-select"
                    value={this.state.campaign}
                    name="campaign"
                    autoWidth
                    disabled={!this.state.showcampaign}
                    onChange={(e)=>{this.handleChange(e);}}
                    startAdornment={
                      <InputAdornment position="start">
                      <Switch
                            name="showcampaign"
                            checked={this.state.showcampaign == 1}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="showcampaign"
                            color="primary"
                          />
                      </InputAdornment>
                    }
                  >
                    {this.state.campaigns.map((list) => <MenuItem key={'k'+list.value} value={list.value}>{list.display}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>



              <Grid item xs={12}>

                <FormControl fullWidth>
                  <InputLabel id="survey-select-label">Include a Survey</InputLabel>
                  <Select
                    labelId="survey-select-label"
                    id="survey-select"
                    value={this.state.survey}
                    name="survey"
                    autoWidth
                    disabled={!this.state.showsurvey}
                    onChange={(e)=>{this.handleChange(e);}}
                    startAdornment={
                      <InputAdornment position="start">
                      <Switch
                            name="showsurvey"
                            checked={this.state.showsurvey == 1}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="showsurvey"
                            color="primary"
                          />
                      </InputAdornment>
                    }
                  >
                    {this.state.surveys.map((list) => <MenuItem key={'kc'+list.value} value={list.value}>{list.display}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>



              {actionlist}



              <Grid container spacing={2}>
                <Grid container item xs={6}>
                  <Grid item xs={12}>
                    <FormControl component="fieldset" variant="outlined">
                      <FormLabel component="legend">Publishing Options</FormLabel>
                      <FormControlLabel
                        control={
                          <Switch
                            name="publishnow"
                            checked={this.state.publishnow == 1}
                            onChange={(e)=>{this.handleChange(e);}}
                            disabled={this.state.published}
                            value={this.state.publishnow}
                            color="primary"
                          />
                        }
                        label="Publish Immediatly"
                      />
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDateTimePicker
                            margin="normal"
                            label="Publish From"
                            format="dd/MMM/yyyy hh:mm"
                            disabled={this.state.publishimmediatly || this.state.published}
                            value={this.state.publishfrom} 
                            name="publishfrom"
                            onChange={(e)=>{this.handleChange(e);}}
                            KeyboardButtonProps={{
                              'aria-label': 'Publish from date',
                            }}
                          />
                      </MuiPickersUtilsProvider>
                    </FormControl>
                  </Grid>
                    <Grid item xs={12} >

                    </Grid>
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Social Media Integration</FormLabel>
                          <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        name="tofacebook"
                                        checked={this.state.tofacebook == 1}
                                        onChange={(e)=>{this.handleChange(e);}}
                                        disabled={this.state.published}
                                        value="tofacebook"
                                        color="primary"
                                      />
                                    }
                                    label="Publish to Facebook"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        name="totwitter"
                                        checked={this.state.totwitter == 1}
                                        onChange={(e)=>{this.handleChange(e);}}
                                        disabled={this.state.published}
                                        value="totwitter"
                                        color="primary"
                                      />
                                    }
                                    label="Publish to Twitter"
                                  />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                </Grid>
                <Grid container item xs={6}>

                  <Grid item xs={12}>
                    <FormControl component="fieldset" variant="outlined">
                      <FormLabel component="legend">Priority</FormLabel>
                      <RadioGroup aria-label="priority" name="priority" disabled={this.state.published} onChange={(e)=>{this.handleChange(e);}}>
                        <FormControlLabel value="5" disabled={this.state.published} control={<Radio  color="primary" />} label="Normal" />
                        <FormControlLabel value="9" disabled={this.state.published} control={<Radio />} label="High" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                  <FormControl component="fieldset" variant="outlined">
                      <FormLabel component="legend">Publishing Events</FormLabel>
                      <List >
                        {events}
                      </List>
                    </FormControl>
                  </Grid>

                </Grid>
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>          
          <Grid container>
            <Grid item xs={12}>
              <UploadPicture vertical title="Upload news picture" helptext="blog.picture" owner={this.state.guid} />
            </Grid>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
          <Grid item xs={1}>
              <Button color="primary" disabled={this.state.published} variant="contained" startIcon={<SaveIcon />} onClick={()=>{this.onSave();}}>
                Save
              </Button>
            </Grid>
            <Grid item xs={11} style={{textAlign:'right'}}>
              {pub}
          </Grid>
        </Grid>
   </Grid>
  );
  }
}