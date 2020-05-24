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



import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


export default class QuestionEditScale extends Component {
  constructor(props) {
      super(props);
      this.state = {
        min: 0, 
        max: 5, 
        options: this.props.options
      };
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;    
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value,
    });

    var o = this.state.steps + ";" +this.state.type + ";" + this.state.minlabel + ";" +this.state.maxlabel;
    this.setState({
        options: o,
    });

    this.FireOnChange();
  }

  componentDidMount(){
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    if (this.props.options !== prevProps.options) 
    {
        var o = this.props.options;
      this.refresh();
    }
  }

  FireOnChange()
  {
    var o = this.state.options;
    this.props.onChange(o);
  }


   refresh()
   {
    if(typeof this.props.options  === "undefined")  return;
    
    if(this.props.options=='')
    {
        this.setState({
          steps: 5,
          types: 1,
          minlabel: 'Poor',
          maxlabel: 'Excellent',
        });
       return;
    }
     var opts = this.props.options.split(";");
     if(opts.length >= 4)
     {
        this.setState({
          steps: o[0],
          types: o[1],
          minlabel: o[2],
          maxlabel: o[3],
        });
     }
     else
     {
        this.setState({
          steps: 5,
          types: 1,
          minlabel: 'Poor',
          maxlabel: 'Excellent',
        });
     }
     var o = this.state.steps + ";" +this.state.type + ";" + this.state.minlabel + ";" +this.state.maxlabel;
     this.setState({
         options: o,
     });
 
}



  render() 
  {

    return (
    <Grid container spacing={4}>
        <Grid container item xs={6} spacing={4}>
            <Grid item xs={12}>
                <TextField 
                    value={this.state.steps} 
                    label="Steps" 
                    name="steps"
                    fullWidth
                    onChange={(e)=>{this.handleChange(e);}} 
                    helperText="(How many stages are there in the scale)"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    value={this.state.minlabel} 
                    label="Minimum Label" 
                    name="minlabel"
                    fullWidth
                    onChange={(e)=>{this.handleChange(e);}} 
                    helperText="(What does the lowest value represent)"
                />
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    value={this.state.maxlabel} 
                    label="Maximum Label" 
                    name="maxlabel"
                    fullWidth
                    onChange={(e)=>{this.handleChange(e);}} 
                    helperText="(What does the highest value represent)"
                />
            </Grid>
        </Grid>
   </Grid>
  );
  }
}