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


import SurveyEdit from './SurveyEdit';
import SurveyResult from './SurveyResult';

export default class SurveyInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        guid: props.guid, 
        owner: props.owner, 
        name: "", 
        body: "",
        active: false,

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
    let uri = '/survey/'+this.props.guid+'/edit';
    axios.get(uri).then((response) => {
      this.setState({
        guid: response.data.guid, 
        owner: response.data.owner, 
        name: response.data.name, 
        description: response.data.description, 
        active: response.data.active == 1,
      });
    });
   }



  render() 
  {
    if(this.props.owner=='')
    {
      return(<div>Please select a survey.</div>);
    }

    if(this.state.active)
    {
      return(<SurveyResult owner={this.state.owner} guid={this.state.guid}/>);
    }
    else
    {
      return(<SurveyEdit owner={this.state.owner} guid={this.state.guid} />);
    }
 }
}