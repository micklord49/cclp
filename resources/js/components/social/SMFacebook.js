import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch';

import { IconContext } from "react-icons";
import { IoLogoFacebook } from 'react-icons/io';
import SaveIcon from '@material-ui/icons/Save';
import VpnKey from '@material-ui/icons/VpnKey';

import HelpText from '../HelpText';
import AlertSave from '../AlertSave';



export default class SMFacebook extends Component {
  constructor(props) {
      super(props);
      this.state = {
          facebook: '', 
          facebookKey: '', 
          facebookfeed: false,
          facebookKey: '', 

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
 
  componentDidMount(){
    if(typeof(this.props.owner) == "undefined") return;
    if(this.props.owner=='') return;

    console.log("Retreiving facebook")

    axios.get("/social/load/"+this.props.owner)
      .then(response => {
        console.log(response);
        this.setState({  
            facebook: response.data.facebook,
            facebookfeed: response.data.facebookfeed == 1,
            });
      })
      .catch(function (error) {
        this.setState({  
          facebook: "",
          facebookfeed: false, 
          facebookKey: "", 
          facebookSecret: "", 
        });

        console.log(error);
      })
  }


  handleSubmit(event) 
  {
    event.preventDefault();

    const sm = {
        type: 'FACEBOOK',
        owner: this.props.owner,
        facebook: this.state.facebook,
        facebookfeed: this.state.facebookfeed,
        facebookKey: this.state.facebookKey,
        facebookSecret: this.state.facebookSecret,
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
        borderRadius:4,
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
                fullWidth
                name="facebook"
                value={this.state.facebook} 
                onChange={(e)=>{this.handleChange(e);}} 
                helperText="This is your facebook username, not a link to your facebook page."
                label="Facebook Username" 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoLogoFacebook />
                    </InputAdornment>
                  ),
                }}

            />
        </Grid>
        <Grid item xs={12} style={upstyle}>
            <Grid container>
              <Grid item xs={12}>
                <p>If you would like, you can have your facebook feed appear on your home page.</p>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      name="facebookfeed"
                      checked={this.state.facebookfeed}
                      onChange={(e)=>{this.handleChange(e);}}
                      value="facebookfeed"
                      color="primary"
                    />
                  }
                  label="Show Facebook Feed"
                />

              </Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} style={upstyle}>
            <HelpText name='facebook.api' style="neuhelp"/>      
        </Grid>
        <Grid item xs={12}>
            <VpnKey />
            <TextField 
                id="sm-facebookKey" 
                name="facebookKey"
                fullWidth
                value={this.state.facebookKey} 
                onChange={(e)=>{this.handleChange(e);}} 
                label="Facebook Key" 
            />
        </Grid>
        <Grid item xs={12}>
            <IoLogoFacebook />
            <TextField 
                id="sm-facebookSecret" 
                fullWidth
                name="facebookSecret"
                value={this.state.facebookSecret} 
                onChange={(e)=>{this.handleChange(e);}} 
                label="Facebook Secret" 
            />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" type="submit">
            <SaveIcon />Save
          </Button>
        </Grid>
      </Grid>
      </IconContext.Provider>
      <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="facebook details"/>
    </form>  
    );
  }
}