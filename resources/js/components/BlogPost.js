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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';


import SaveIcon from '@material-ui/icons/Save';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


export default class BlogPost extends Component {
  constructor(props) {
      super(props);
      this.state = {
        guid: props.guid, 
        owner: props.owner, 
        title: "", 
        subtitle: "",
        body: "",

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
      body: text
    })
  }

  
  componentDidMount(){
    if(this.state.guid == "")
    {
        console.log("Creating new blog for owner:"+this.props.guid)
    }
    else
    {
        console.log("Editing blog :"+this.props.guid)
        let uri = '/blog/'+this.props.guid;
        axios.get(uri).then((response) => {
          this.setState({
            guid: response.data.guid, 
            owner: response.data.owner, 
            title: response.data.title, 
            subtitle: response.data.subtitle, 
            body: response.data.body
          });
        });
    }
  }


  async save() 
  {
    const post = {
      guid: this.state.guid,
      owner: this.state.owner,
      title: this.state.title,
      subtitle: this.state.subtitle,
      body: this.state.body,
    }

    let uri = '/blog/'+this.props.guid;
    await axios.patch(uri, post)
      .then((response) => {
      })
    console.log("Saving post");
  }

  
  render() 
  {
    if(this.props.owner=='')
    {
      return(<div>Loading...</div>);
    }

    return (
      <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField 
                        id="blog-title" value={this.state.title} 
                        label="Title" 
                        name="title"
                        fullWidth
                        onChange={(e)=>{this.handleChange(e);}} 
                        helperText="(Describe the subject of your post - keep it short)"
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
                    />
                </Grid>
                <Grid item xs={12}>
                  <p>Body of your post</p>
                </Grid>
                <Grid item xs={12}>
                    <div style={{backgroundColor:"#ffffff", minHeight:300}}>
                    <ReactQuill value={this.state.body}
                                onChange={(e)=>{this.handleChangeBody(e);}} />
                    </div>
                </Grid>
            </Grid>
      </div>
    );
  }
}