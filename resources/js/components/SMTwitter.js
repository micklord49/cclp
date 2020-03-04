import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { IconContext } from "react-icons";
import { IoLogoTwitter } from 'react-icons/io';
import SaveIcon from '@material-ui/icons/Save';
import VpnKey from '@material-ui/icons/VpnKey';

import HelpText from './HelpText';
import AlertSave from './AlertSave';



export default class SMTwitter extends Component {
  constructor(props) {
      super(props);
      this.state = {
          twitter: '', 
          twitterKey: '', 
          twitterSecret: '',

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

    console.log("Retreiving twitter")

    axios.get("/social/load/"+this.props.owner)
      .then(response => {
        console.log(response);
        this.setState({  
            twitter: response.data.twitter,
            });
      })
      .catch(function (error) {
        this.setState({  
          twitter: "",
          twitterKey: "", 
          twitterSecret: "", 
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
        twitterKey: this.state.twitterKey,
        twitterSecret: this.state.twitterSecret,
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
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: 120,
      marginTop:10,
      marginBottom:30,
      paddingRight:50,
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
      <Grid style={{paddingLeft: 10}} container spacing={2}>          
        <Grid item xs={12}>
          <Button color="primary" type="submit">
            <SaveIcon />Save
          </Button>
        </Grid>
        <Grid item xs={12}>
            <IoLogoTwitter />
            <TextField 
                id="sm-twitter" 
                fullWidth
                name="twitter"
                value={this.state.twitter} 
                onChange={(e)=>{this.handleChange(e);}} 
                label="Twitter" 
            />
        </Grid>
        <Grid item xs={12} style={upstyle}>
            <HelpText name='twitter.api' style="neuhelp"/>      
        </Grid>
        <Grid item xs={12}>
            <VpnKey />
            <TextField 
                id="sm-twitterKey" 
                name="twitterKey"
                fullWidth
                value={this.state.twitterKey} 
                onChange={(e)=>{this.handleChange(e);}} 
                label="Twitter Key" 
            />
        </Grid>
        <Grid item xs={12}>
            <IoLogoTwitter />
            <TextField 
                id="sm-twitterSecret" 
                fullWidth
                name="twitterSecret"
                value={this.state.twitterSecret} 
                onChange={(e)=>{this.handleChange(e);}} 
                label="Twitter Secret" 
            />
        </Grid>
      </Grid>
      </IconContext.Provider>
      <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="twitter details"/>
    </form>  
    );
  }
}