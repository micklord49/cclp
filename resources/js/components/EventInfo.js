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


class EventInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        title: '', 
        subtitle: '', 
        location: '', 
        start: '', 
        end: '', 

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
    console.log(this.state);

  }

  handleChangeBody(value) {
    this.setState({ about: value })
  }

  componentDidUpdate(prevProps) 
  {
    if(typeof(this.props.guid) == "undefined")   return;
    if(prevProps.guid == this.props.guid)     return;
    this.refresh();
  }
  
  componentDidMount(){
    this.refresh();
  }

  refresh()
  {
    console.log("Retrieving event");
    axios.get("/event/"+this.props.guid+"/edit")
      .then(response => {
        console.log(response);
        this.setState({ location: response.data.location, 
                        title: response.data.title, 
                        subtitle: response.data.subtitle, 
                        start: response.data.start,
                        end: response.data.end,
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
      location: this.state.location,
      title: this.state.title,
      subtitle: this.state.subtitle,
      start: this.state.start,
      end: this.state.end,
    }

    let uri = '/event/'+this.props.guid;
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
    const { classes } = this.props;

    const neu = {
      backgroundColor: "#E0E5EC" ,
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Button color="primary" type="submit">
                <SaveIcon />Save
            </Button>
        </Grid>
        <Grid item md={6} xs={12}>
          <Grid container>
            <Grid item xs={12}>
                <TextField id="info-title" 
                value={this.state.title} 
                label="Title" 
                name="title"
                onChange={(e)=>{this.handleChange(e);}} 
                fullWidth
                multiline
                placeholder="Title of your event"
                helperText="Try to keep this under 5 words"/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="info-subtitle" 
                value={this.state.subtitle} 
                label="Title" 
                name="subtitle"
                onChange={(e)=>{this.handleChange(e);}} 
                fullWidth
                multiline
                placeholder="Subtitle of your campaign"
                helperText="One sentence that expands on yoour title"/>
            </Grid>
            <Grid item xs={12}>
              <p>You can also point your own internet domain name to this site it you like.</p>
            </Grid>
            <Grid item xs={12}>
                <TextField id="info-start" 
                value={this.state.start} 
                label="Start Time" 
                name="start"
                onChange={(e)=>{this.handleChange(e);}} 
                fullWidth
                helperText="This is your personal domain name."/>
            </Grid>
            <Grid item xs={12}>
                <TextField id="info-end" 
                value={this.state.end} 
                label="End Time" 
                name="end"
                onChange={(e)=>{this.handleChange(e);}} 
                fullWidth
                helperText="This is your personal domain name."/>
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
              <ReactQuill value={this.state.location}
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

export default withStyles(styles)(EventInfo)