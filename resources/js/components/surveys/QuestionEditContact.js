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
        getgender: false, 
        getmember: false, 
        getresident: false, 
        getlgbt: false, 
        getbame: false, 
        getagerange: false, 
        gethomestatus: false, 
        getemploymentstatus: false, 
      };
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;    
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value,
    },() => {
      var o = this.state.getaddress?'1':'0';
      o = o.concat(';',this.state.getresident?'1':'0');
      o = o.concat(';',this.state.getgender?'1':'0');
      o = o.concat(';',this.state.getmember?'1':'0');
      o = o.concat(';',this.state.getlgbt?'1':'0');
      o = o.concat(';',this.state.getbame?'1':'0');
      o = o.concat(';',this.state.getagerange?'1':'0');
      o = o.concat(';',this.state.gethomestatus?'1':'0');
      o = o.concat(';',this.state.getemploymentstatus?'1':'0');
      this.props.onChange(o);
      });
  }

  componentDidMount(){
    this.refresh();
  }


  componentDidUpdate(prevProps) {
    if (this.props.options !== prevProps.options) 
    {
      this.refresh();
    }
  }

  FireOnChange()
  {
    var o = this.state.getaddress?'1':'0';
    o = o.concat(';',this.state.getresident?'1':'0');
    o = o.concat(';',this.state.getgender?'1':'0');
    o = o.concat(';',this.state.getmember?'1':'0');
    o = o.concat(';',this.state.getlgbt?'1':'0');
    o = o.concat(';',this.state.getbame?'1':'0');
    o = o.concat(';',this.state.getagerange?'1':'0');
    o = o.concat(';',this.state.gethomestatus?'1':'0');
    o = o.concat(';',this.state.getemploymentstatus?'1':'0');
    this.props.onChange(o);
  }


   refresh()
   {
       try {
        this.setState({ 
          getaddress: false,
          getresident: false,
          getgender: false,
          getmember: false,
          getlgbt: false,
          getbame: false,
          getagerange: false,
          gethomestatus: false,
          getemploymentstatus: false,
        });

        var opts = this.props.options.split(";");

        this.setState({ 
          getaddress: opts[0]==1,
          getresident: opts[1]==1,
          getgender: opts[2]==1,
          getmember: opts[3]==1,
          getlgbt: opts[4]==1,
          getbame: opts[5]==1,
          getagerange: opts[6]==1,
          gethomestatus: opts[7]==1,
          getemploymentstatus: opts[8]==1,
         });
        } catch (error) {
      }
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
                            checked={this.state.getaddress}
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
                            checked={this.state.getresident}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="getresident"
                            color="primary"
                            />
                        }
                        label="Collect an indicator if the contact is a resident."
                    />
                </FormGroup>

            </Grid>

            <Grid item xs={12}>
            <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="gethomestatus"
                            checked={this.state.gethomestatus}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="gethomestatus"
                            color="primary"
                            />
                        }
                        label="Collect the contacts housing status."
                    />
                </FormGroup>
            </Grid>

            <Grid item xs={12}>
            <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="getemploymentstatus"
                            checked={this.state.getemploymentstatus}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="getemploymentstatus"
                            color="primary"
                            />
                        }
                        label="Collect the contacts employment status."
                    />
                </FormGroup>
            </Grid>

            <Grid item xs={12}>
            <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="getgender"
                            checked={this.state.getgender}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="getgender"
                            color="primary"
                            />
                        }
                        label="Collect the gender of the contact."
                    />
                </FormGroup>
            </Grid>

            <Grid item xs={12}>
            <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="getagerange"
                            checked={this.state.getagerange}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="getagerange"
                            color="primary"
                            />
                        }
                        label="Collect the age range of the contact."
                    />
                </FormGroup>
            </Grid>

            <Grid item xs={12}>
            <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="getmember"
                            checked={this.state.getmember}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="getmember"
                            color="primary"
                            />
                        }
                        label="Collect an indicator if the contact is a Labour member."
                    />
                </FormGroup>

            </Grid>

            <Grid item xs={12}>
            <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="getlgbt"
                            checked={this.state.getlgbt}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="getlgbt"
                            color="primary"
                            />
                        }
                        label="Collect if the contact self idetifies as LGBTQ+."
                    />
                </FormGroup>

            </Grid>
            <Grid item xs={12}>
            <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="getbame"
                            checked={this.state.getbame}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="getbame"
                            color="primary"
                            />
                        }
                        label="Collect if the contact self idetifies as BAME."
                    />
                </FormGroup>

            </Grid>
        </Grid>
   </Grid>
  );
  }
}