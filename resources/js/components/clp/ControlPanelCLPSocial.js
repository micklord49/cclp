import React, { Component } from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

import { IconContext } from "react-icons";

import { IoLogoFacebook } from 'react-icons/io';
import { IoLogoInstagram } from 'react-icons/io';
import { IoLogoTwitter } from 'react-icons/io';
import { IoLogoYoutube } from 'react-icons/io';
import { IoLogoTumblr } from 'react-icons/io';

export default class ControlPanelCLPSocial extends Component {
  constructor(props) {
      super(props);
      this.state = {facebook: '', twitter: '', instagram: '', youtube: '', tumblr: ''};
      this.handleChangeFacebook = this.handleChangeFacebook.bind(this);
      this.handleChangeInstagram = this.handleChangeInstagram.bind(this);
      this.handleChangeTwitter = this.handleChangeTwitter.bind(this);
      this.handleChangeYouTube = this.handleChangeYouTube.bind(this);
      this.handleChangeTumblr = this.handleChangeTumblr.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFacebook(e){
    this.setState({
      facebook: e.target.value
    })
  }
  
  handleChangeTwitter(e){
    this.setState({
      twitter: e.target.value
    })
  }
  
  handleChangeInstagram(e){
    this.setState({
      instagram: e.target.value
    })
  }
  handleChangeYouTube(e){
    this.setState({
      youtube: e.target.value
    })
  }
  handleChangeTumblr(e){
    this.setState({
      tumblr: e.target.value
    })
  }
 
  componentDidMount(){
    axios.get("/clp/1/edit")
      .then(response => {
        this.setState({  facebook: response.data.facebook,
                         instagram: response.data.instagram, 
                         twitter: response.data.twitter, 
                         youtube: response.data.youtube,
                         tumblr: response.data.tumblr });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  handleSubmit(event) 
  {
    event.preventDefault();

    const clp = {
      type: 'SOCIAL',
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      tumblr: this.state.tumblr
    }

    let uri = '/clp/1';
    axios.patch(uri, clp).then((response) => {
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
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    return (
    <form style={neu} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
      <IconContext.Provider value={{ color: "skyblue", size: "3rem", style: { paddingRight: "1em", verticalAlign: 'middle' }, className: "global-class-name" }}>
      <Grid style={{paddingLeft: 10}} container spacing={2}>
        <Grid item xs={12}>
            <IoLogoFacebook />
            <TextField id="info-facebook" value={this.state.facebook} onChange={this.handleChangeFacebook} label="Facebook" />
        </Grid>
        <Grid item xs={12}>
            <IoLogoInstagram />
            <TextField id="info-instagram" value={this.state.instagram} label="Instagram" onChange={this.handleChangeInstagram} />
        </Grid>
        <Grid item xs={12}>
            <IoLogoTwitter />
            <TextField id="info-twitter" value={this.state.twitter} label="Twitter" onChange={this.handleChangeTwitter} />
        </Grid>
        <Grid item xs={12}>
            <IoLogoYoutube />
            <TextField id="info-youtube" value={this.state.youtube} label="YouTube" onChange={this.handleChangeYouTube} />
        </Grid>
        <Grid item xs={12}>
            <IoLogoTumblr />
            <TextField id="info-tumblr" value={this.state.tumblr} label="Tumblr" onChange={this.handleChangeTumblr} />
        </Grid>
        <Grid item xs={12}>
            <Button color="primary" type="submit">
                <SaveIcon />Save
            </Button>
        </Grid>
      </Grid>
      </IconContext.Provider>
    </form>  
    );
  }
}