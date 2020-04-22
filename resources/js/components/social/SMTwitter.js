import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';


import { IconContext } from "react-icons";
import { IoLogoTwitter } from 'react-icons/io';
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import VpnKey from '@material-ui/icons/VpnKey';

import HelpText from '../HelpText';
import AlertSave from '../AlertSave';



export default class SMTwitter extends Component {
  constructor(props) {
      super(props);
      this.state = {
          twitter: '', 
          twitterfeed: false, 
          twitterapikey: '', 
          twitterapisecret: '',
          twittertokenkey: '', 
          twittertokensecret: '',

          opensuccess: false, 
          openfail: false, 
          failmessage: '', 
        };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value
    });
  }
 
  onToggle(name){
    const value=!this.state[name];
    this.setState({
      [name]: value
    });
  }

  onMouseDownToggle() {
    event.preventDefault();
  };


  componentDidMount(){
    if(typeof(this.props.owner) == "undefined") return;
    if(this.props.owner=='') return;

    console.log("Retreiving twitter")

    axios.get("/social/load/"+this.props.owner)
      .then(response => {
        console.log("Twitter Load");
        console.log(response);
        this.setState({  
            twitter: response.data.twitter,
            twitterfeed: response.data.twitterfeed == 1,
            twitterapikey: response.data.twitterapikey,
            twitterapisecret: response.data.twitterapisecret,
            twittertokenkey: response.data.twittertokenkey,
            twittertokensecret: response.data.twittertokensecret,
            });
            console.log("Loaded...");
            console.log(this.state);
          })
      .catch(function (error) {
        this.setState({  
          twitter: "",
          twitterapikey: "", 
          twitterapisecret: "", 
          twittertokenkey: "", 
          twittertokensecret: "", 
        });

        console.log(error);
      })
  }


  handleSubmit(event) 
  {
    event.preventDefault();

    const sm = {
        type: 'TWITTER',
        owner: this.props.owner,
        twitter: this.state.twitter,
        twitterfeed: this.state.twitterfeed,
        twitterapikey: this.state.twitterapikey,
        twitterapisecret: this.state.twitterapisecret,
        twittertokenkey: this.state.twittertokenkey,
        twittertokensecret: this.state.twittertokensecret,

        showAPIKey: false,
        showAPISecret: false,
        showTokenKey: false,
        showTokenSecret: false,
    }

    let uri = '/social/save';
    axios.post(uri, sm)
    .then((response) => {
          //this.props.history.push('/display-item');
          this.setState({ opensuccess: true })
        })
    .catch(function (error) {
      this.setState({ failmessage: error, openfail: true })
      console.log(error);
      })

  }


  render() 
  {
    const neu = {
      backgroundColor: "#ffffff" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: 120,
      marginTop:10,
      marginBottom:30,
      paddingRight:20,
      paddingBottom:30,
      //boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const neuhelp = {
        //backgroundColor: "#E0E5EC" ,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop:10,
        paddingBottom:16,
        paddingRight:20,
        //boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
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
      <Grid style={{paddingLeft: 10}} container spacing={4}>          
        <Grid item xs={12}>
          <Button color="primary" variant="contained" type="submit">
            <SaveIcon />Save
          </Button>
        </Grid>
        <Grid item xs={12}>
            <TextField 
                id="sm-twitter" 
                fullWidth
                name="twitter"
                value={this.state.twitter} 
                onChange={(e)=>{this.handleChange(e);}} 
                label="Twitter Screen Name" 
                helperText="This is your twitter screen name, not a link to your twitter page."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoLogoTwitter />
                    </InputAdornment>
                  ),
                }}
        
            />
        </Grid>
        <Grid item xs={12} style={upstyle}>
            <Grid container>
              <Grid item xs={12}>
                <p>If you would like, you can have your twitter feed appear on your home page.</p>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="twitterfeed"
                      checked={this.state.twitterfeed}
                      onChange={(e)=>{this.handleChange(e);}}
                      value="twitterfeed"
                      color="primary"
                    />
                  }
                  label="Show Twitter Feed"
                />

              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} style={upstyle}>
            <HelpText name='twitter.api' style="neuhelp"/>      
        </Grid>
        <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="twitterapikey">Twitter API Key</InputLabel>
              <Input
                id="twitterapikey"
                name="twitterapikey"
                type={this.state.showAPIKey ? 'text' : 'password'}
                value={this.state.twitterapikey}
                onChange={(e)=>{this.handleChange(e);}} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>{this.onToggle('showAPIKey');}}
                      onMouseDown={()=>{this.onMouseDownToggle();}}
                    >
                      {this.state.showAPIKey ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="twitterapisecret">Twitter API Secret</InputLabel>
              <Input
                id="twitterapisecret"
                name="twitterapisecret"
                type={this.state.showAPISecret ? 'text' : 'password'}
                value={this.state.twitterapisecret}
                onChange={(e)=>{this.handleChange(e);}} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>{this.onToggle('showAPISecret');}}
                      onMouseDown={()=>{this.onMouseDownToggle();}}
                    >
                      {this.state.showAPISecret ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="twittertokenkey">Twitter Token</InputLabel>
              <Input
                id="twittertokenkey"
                name="twittertokenkey"
                type={this.state.showTokenKey ? 'text' : 'password'}
                value={this.state.twittertokenkey}
                onChange={(e)=>{this.handleChange(e);}} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>{this.onToggle('showTokenKey');}}
                      onMouseDown={()=>{this.onMouseDownToggle();}}
                    >
                      {this.state.showTokenKey ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
              <InputLabel htmlFor="twittertokensecret">Twitter Token Secret</InputLabel>
              <Input
                id="twittertokensecret"
                name="twittertokensecret"
                type={this.state.showTokenSecret ? 'text' : 'password'}
                value={this.state.twittertokensecret}
                onChange={(e)=>{this.handleChange(e);}} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={()=>{this.onToggle('showTokenSecret');}}
                      onMouseDown={()=>{this.onMouseDownToggle();}}
                    >
                      {this.state.showTokenSecret ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
        </Grid>
      </Grid>
      </IconContext.Provider>
      <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="twitter details"/>
    </form>  
    );
  }
}