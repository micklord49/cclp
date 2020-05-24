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





export default class QuestionEditContact extends Component {
  constructor(props) {
      super(props);
      this.state = {
        getaddress: false, 
        getresident: false, 
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

    var o = "";
    o += this.state.getaddress ? "1" : "0";
    o += ";";
    o += this.state.getresident ? "1" : "0";

    this.setState({
        options: o,
    });

    if(this.props.onChange)     this.props.onChange(o);
  }

  componentDidMount(){
  }

  componentDidUpdate(prevProps) {
    if (this.props.options !== prevProps.options) 
    {
        var o = this.props.options;
        this.setState({
            getaddress: o[0] == 1,
            getresident: o[1] == 1,
        });
      this.refresh();
    }
  }

   refresh()
   {
   }



  render() 
  {

    return (
    <Grid container spacing={4}>
        <Grid container item xs={6}>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="getaddress"
                            checked={this.state.getaddress == 1}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="getaddress"
                            color="primary"
                            />
                        }
                        label="Collect the contact's physical address."
                    />
                </FormGroup>

            </Grid>
            <Grid item xs={12}>
            <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="getresident"
                            checked={this.state.getresident == 1}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="getresident"
                            color="primary"
                            />
                        }
                        label="Collect an indicator if the contact is a resident."
                    />
                </FormGroup>

            </Grid>
        </Grid>
   </Grid>
  );
  }
}