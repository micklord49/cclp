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
  KeyboardDateTimePicker,
} from '@material-ui/pickers';

import HelpText from './HelpText';



export default class CPLContactStats extends Component {
  
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

  handleDateChange(name,value)
  {
    this.setState({
      [name]: value
    });
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

    console.log("Retrieving event");
    axios.get("/event/"+this.props.guid+"/edit")
      .then(response => {
        console.log(response);
        this.setState({ location: response.data.location, 
                        title: response.data.title, 
                        subtitle: response.data.subtitle, 
                        start: response.data.starttime,
                        end: response.data.endtime,
                      });
      })
      .catch(function (error) {
        console.log(error);
      });
  }




  render() 
  {

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

    return (
        <div style={neu}>
        </div>    
    );
  }
}

