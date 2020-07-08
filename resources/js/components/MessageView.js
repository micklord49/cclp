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

import TagControl from './TagControl';

import SaveIcon from '@material-ui/icons/Save';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';



export default class MessageView extends Component {
  constructor(props) {
      super(props);
      this.state = {
        guid: props.guid, 
        subject: "", 
        from: "", 
        to: "",
        message: "",

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
    if(this.props.guid == "")
    {
      return;
    }
    else
    {
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
    let uri = '/message/'+this.props.guid;
    axios.get(uri).then((response) => {
      this.setState({
        guid: response.data.guid, 
        from: response.data.from, 
        fromguid: response.data.fromguid, 
        fromtags: response.data.fromtags,
        to: response.data.to, 
        subject: response.data.subject, 
        message: response.data.message,

      });
    });
  }

  addTag(guid)
  {
    let uri = '/contacts/'+this.state.fromguid+"/"+guid+'/addtag';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });

  }

  removeTag(guid)
  {
    let uri = '/contacts/'+this.state.fromguid+"/"+guid+'/removetag';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });
  }

  
  render() 
  {
    if(this.props.guid=='')
    {
      return(<div>Loading...</div>);
    }

    const neu = {
      //backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: 10,
      marginRight: 10,
      marginTop:10,
      paddingBottom:16,
      paddingLeft:10,
      paddingRight: 20,
      // boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const dlg = {
      //backgroundColor: "#E0E5EC" ,
      paddingLeft:20,
      paddingRight: 20,
      paddingTop:20,
      paddingBottom: 20,
      borderTop: "thin ridge silver",
      borderRadius: 20,
    };

    return (
      <div style={dlg}>
            <Grid container spacing={2} style={neu}>
                <Grid item xs={12}>
                  <TextField  label="From" 
                              variant="outlined" 
                              fullWidth
                              InputProps={{
                                readOnly: true,
                              }}
                              value={this.state.from} />
                </Grid>
                <Grid item xs={12}>
                  <TextField  label="Subject" 
                              variant="outlined" 
                              fullWidth
                              InputProps={{
                                readOnly: true,
                              }}
                              value={this.state.subject} />
                </Grid>
                <Grid item xs={12}>
                  <TextField  label="Subject" 
                              variant="outlined" 
                              fullWidth
                              InputProps={{
                                readOnly: true,
                              }}
                              multiline
                              rows="6"
                              value={this.state.message} />
                </Grid>
                <Grid item xs={12}>
                    <TagControl owner={this.props.guid} tags={this.state.fromtags} addTag={(guid) => this.addTag(guid)} onremovetag={(guid)=>{this.removeTag(guid)}} />
                </Grid>
            </Grid>
      </div>
    );
  }
}