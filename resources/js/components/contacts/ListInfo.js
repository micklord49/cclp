import React, { Component } from 'react';
import axios from 'axios';


import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
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

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

import ListContacts from './ListContacts';

export default class ListInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        guid: props.guid, 
        owner: props.owner, 
        title: "", 
        subtitle: "",
        description: "",
        type: "1",
        requestaddress: false,
        requireaddress: false,

        published: false,
        publishimmediatly: true,
        publishfrom: Date.now(),

        tofacebook: true,
        totwitter: true,
      };
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value
    });
  }

  handleChangeBody(text){
    this.setState({
      description: text
    })
  }

  
  componentDidMount(){
    if(this.state.guid == "")
    {
        console.log("Creating new list for owner:"+this.props.guid)
    }
    else
    {
        console.log("Editing list :"+this.props.guid)
        this.refresh();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.guid !== prevProps.guid) {
      this.refresh();
    }
   }

   refresh()
   {
    let uri = '/list/'+this.props.guid+'/edit';
    axios.get(uri).then((response) => {
      this.setState({
        guid: response.data.guid, 
        owner: response.data.owner, 
        type: response.data.type, 
        title: response.data.title, 
        subtitle: response.data.subtitle, 
        description: response.data.description,
        requestaddress: response.data.requestaddress,
        requireaddress: response.data.requireaddress,
      });
    });
   }


  async onSave() 
  {
    const post = {
      guid: this.state.guid,
      owner: this.state.owner,
      type: this.state.type,
      title: this.state.title,
      subtitle: this.state.subtitle,
      description: this.state.description,
      requestaddress: this.state.requestaddress,
      requireaddress: this.state.requireaddress,
    }

    let uri = '/list/'+this.props.guid;
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

    const form = {
      backgroundColor: "#ffffff" ,
      paddingTop: 10,
      marginTop: 10,
      borderTop: "thin ridge silver",
      borderRadius: 20,
    };

    return (
      <Grid container spacing={4} style={form}>
        <Grid container item xs={12}>
          <Grid item xs={1}>
              <Button color="primary" disabled={this.state.published} variant="contained" startIcon={<SaveIcon />} color="inherit" onClick={()=>{this.onSave();}}>
                Save
              </Button>
            </Grid>
        </Grid>
        <Grid item xs={6}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <FormControl component="fieldset" variant="outlined">
                      <FormLabel component="legend">List Type</FormLabel>
                      <RadioGroup aria-label="type" name="type" value={this.state.type}  onChange={(e)=>{this.handleChange(e);}}>
                        <FormControlLabel value="1" control={<Radio  color="primary" />} label="Subscription" />
                        <FormControlLabel value="2" control={<Radio />} label="Petition" />
                        <FormControlLabel value="3" control={<Radio />} label="Open Letter" />
                      </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                <TextField 
                    id="list-title" value={this.state.title} 
                    label="Title" 
                    name="title"
                    fullWidth
                    onChange={(e)=>{this.handleChange(e);}} 
                    helperText="(Describe the subject of your list - keep it short)"
                />
            </Grid>
              <Grid item xs={12}>
                  <TextField 
                      id="list-subtitle" value={this.state.subtitle} 
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
                <p>Description of your list</p>
                <div style={{backgroundColor:"#ffffff", minHeight:300}}>
                  <ReactQuill value={this.state.description} 
                              onChange={(e)=>{this.handleChangeBody(e);}} />
                </div>
              </Grid>
              <Grid container spacing={2}>
                <Grid container item xs={6}>
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Physical Address</FormLabel>
                          <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        name="requestaddress"
                                        checked={this.state.requestaddress == 1}
                                        onChange={(e)=>{this.handleChange(e);}}
                                        value="requestaddress"
                                        color="primary"
                                      />
                                    }
                                    label="Request Address"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        name="requireaddress"
                                        checked={this.state.requireaddress == 1}
                                        onChange={(e)=>{this.handleChange(e);}}
                                        disabled={this.state.published}
                                        value="requireaddress"
                                        color="primary"
                                      />
                                    }
                                    label="Make Address Mandatory"
                                  />
                        </FormGroup>
                      </FormControl>
                    </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>          
          <Grid container>
            <Grid item xs={12}>
              <ListContacts owner={this.props.guid} />
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  }
}