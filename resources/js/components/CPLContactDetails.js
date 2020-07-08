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
import Chip from '@material-ui/core/Chip';


import SaveIcon from '@material-ui/icons/Save';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';

import TagList from './TagList';


import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

import HelpText from './HelpText';





export default class CPLContactDetails extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '', 
        email: '', 
        location: '', 
        start: '', 
        end: '', 

      };
  }


  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleDateChange(name,value)
  {
    this.setState({
      [name]: value
    });
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
    if(typeof(this.props.guid) == "undefined") return;
    if(this.props.guid=='') return;

    axios.get("/contacts/"+this.props.guid+"/edit")
      .then(response => {
        this.setState({ name: response.data.name, 
                        email: response.data.email, 
                        tags: response.data.tags, 
                        events: response.data.events,
                        firstcontact: response.data.created_at,
                      });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() 
  {

    if(typeof(this.props.guid) == "undefined" || this.props.guid=='') return(<p>Loading...</p>);


    const neu = {
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingBottom:16,
      paddingLeft:10,
      paddingRight: 20,
    };

    const neuhelp = {
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingBottom:16,
      paddingRight:20,
    };

    const upstyle = {
      marginLeft: 20,
      marginRight: 20,
      paddingLeft:10,
      paddingRight:20,
    };

    let events = "";

    if(this.state.events != null)
    {
        events = this.state.events.map(event => (
                <Chip
                    key={event.guid}
                    label={event.event}
                    color="secondary"
                    variant="outlined"
                    style={{margin: 4}}
                />
            ))
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField  
                        value={this.state.name} 
                        label="Name" 
                        fullWidth
                        disabled={true}
                        helperText="This is the name the person provided."
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField  
                        value={this.state.email} 
                        label="Email Address" 
                        fullWidth
                        disabled={true}
                        helperText="This is the email address the person provided."
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <h4>Tags</h4>
            </Grid>
            <Grid item xs={12}>
                <TagList tags={this.state.tags}/>
            </Grid>
            <Grid item xs={12}>
                <h4>Events</h4>
            </Grid>
            <Grid item xs={12}>
                {events}
            </Grid>

        </Grid>
    );
  }
}

