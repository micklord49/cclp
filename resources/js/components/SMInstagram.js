import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import HomeIcon from '@material-ui/icons/Home';

import { IconContext } from "react-icons";

import { IoLogoFacebook } from 'react-icons/io';
import { IoLogoInstagram } from 'react-icons/io';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoYoutube } from 'react-icons/io';
import { IoLogoTumblr } from 'react-icons/io';

import HelpText from './HelpText';
import AlertSave from './AlertSave';


export default class SMFacebook extends Component {
  constructor(props) {
      super(props);
      this.state = {
          instagram: '', 
          instagramKey: '', 
          instagramSecret: '',
          opensuccess: false, 
          openfail: false, 
          failmessage: '', 
        };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeInstagram(e){
    this.setState({
      instagram: e.target.value
    })
  }
  handleChangeInstagramKey(e){
    this.setState({
        instagramKey: e.target.value
    })
  }

    handleChangeInstagramSecret(e){
        this.setState({
            instagramSecret: e.target.value
        })
    }
    
 
  componentDidMount(){
    axios.get("/profile/"+this.props.guid+"/getsocial")
      .then(response => {
        this.setState({  
            facebook: response.data.facebook,
            facebookKey: response.data.facebookKey, 
            facebookSecret: response.data.facebookSecret, 
            });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  handleSubmit(event) 
  {
    event.preventDefault();

    const sm = {
        type: 'FACEBOOK',
        facebook: this.state.facebook,
        facebookKey: this.state.facebookKey,
        facebookSecret: this.state.facebookSecret,
    }

    let uri = '/profile/'+this.props.guid+'/savesocial';
    axios.patch(uri, sm)
    .then((response) => {
          //this.props.history.push('/display-item');
    })
    .catch(function (error) {
        console.log(error);
      })

  }


  render() 
  {
    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      marginBottom:30,
      paddingBottom:30,
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
        marginTop:20,
        paddingTop:20,
        paddingLeft:10,
        paddingRight:20,
      };
  
  

    return (
    <form style={neu} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
      <IconContext.Provider value={{ color: "skyblue", size: "3rem", style: { paddingRight: "1em", verticalAlign: 'middle' }, className: "global-class-name" }}>
      <Grid style={{paddingLeft: 10}} container spacing={2}>          
        <Grid item xs={12}>
            <IoLogoFacebook />
            <TextField 
                id="info-instagram" 
                value={this.state.instagram} 
                onChange={(e)=>{this.handleChangeInstagram(e);}} 
                label="Instagram" 
            />
        </Grid>
        <Grid item xs={12} style={upstyle}>
            <HelpText name='instagram.api' style="neuhelp"/>      
        </Grid>
        <Grid item xs={12}>
            <IoLogoFacebook />
            <TextField 
                id="info-instagramKey" 
                value={this.state.instagramKey} 
                onChange={(e)=>{this.handleChangeInstagramKey(e);}} 
                label="API Key" 
            />
        </Grid>
        <Grid item xs={12}>
            <IoLogoFacebook />
            <TextField 
                id="info-instagramSecret" 
                value={this.state.instagramSecret} 
                onChange={(e)=>{this.handleChangeInstagramSecret(e);}} 
                label="Instagram Secret" 
            />
        </Grid>
      </Grid>
      </IconContext.Provider>
      <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} />
    </form>  
    );
  }
}