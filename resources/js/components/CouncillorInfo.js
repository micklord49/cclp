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

import HelpText from './HelpText';

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

// ES module
import Editor from 'react-medium-editor';



export default class CouncillorInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {dn: '', active: false, campaign: false };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDn(e){
    this.setState({
      dn: e.target.value
    })
  }
  
  handleChangeActive(e){
    this.setState({
      active: e.target.checked
    })
  }

  handleChangeCampaign(e){
    this.setState({
      campaign: e.target.checked
    })
  }

  
  handleChangeAbout(text,medium){
    this.setState({
      about: text
    })
  }
  handleChangeTelephone(e){
    this.setState({
      telephone: e.target.value
    })
  }
  handleChangePublicEmail(e){
    this.setState({
      publicemail: e.target.value
    })
  }
 
  componentDidMount(){
    axios.get("/profile/"+this.props.guid+"/edit")
      .then(response => {
        this.setState({ email: response.data.email, 
                        name: response.data.name, 
                        about: response.data.about, 
                        birthdate: response.data.birthdate, 
                        hidebirthdate: response.data.birthdate==1, 
                        telephone: response.data.telephone, 
                        publicemail: response.data.publicemail });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  handleSubmit(event) 
  {
    event.preventDefault();

    const user = {
      type: 'INFO',
      name: this.state.name,
      about: this.state.about,
      birthdate: this.state.birthdate,
      hidebirthdate: this.state.hidebirthdate?1:0,
      telephone: this.state.telephone,
      publicemail: this.state.publicemail
    }

    let uri = '/profile/'+this.props.guid;
    axios.patch(uri, user).then((response) => {
          //this.props.history.push('/display-item');
    });
  }


  render() 
  {

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


    return (
      <div style={neu}>
    <form noValidate autoComplete="off" onSubmit={this.handleSubmit} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Button color="primary" type="submit">
                <SaveIcon />Save
            </Button>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12}>
                <TextField id="info-dn" value={this.state.dn} label="Domain Name" 
                onChange={(e)=>{this.handleChangeDn(e);}} 
                helperText="This is your personal domain name."/>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.active}
                    onChange={(e)=>{this.handleChangeActive(e);}}
                    value="true"
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  }
                label="Activate my councillor page"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.campaign}
                    onChange={(e)=>{this.handleChangeCampaign(e);}}
                    value="true"
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  }
                label="Campaign Mode"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={12} style={upstyle}>
                <HelpText name='councillor.text' style="neuhelp"/>      
              </Grid>
            <Grid item xs={12} style={upstyle}>
              <div style={{backgroundColor:"#ffffff", minHeight:500}}>
                <Editor 
                    id="info-about" 
                    text={this.state.about} 
                    onChange={(text,medium)=>{this.handleChangeAbout(text,medium)}} 
                    options={{ placeholder: false}}            />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>  
    </div>    );
  }
}