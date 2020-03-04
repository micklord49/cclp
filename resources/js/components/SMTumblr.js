import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { IconContext } from "react-icons";
import { IoLogoTumblr } from 'react-icons/io';
import SaveIcon from '@material-ui/icons/Save';
import VpnKey from '@material-ui/icons/VpnKey';

import HelpText from './HelpText';
import AlertSave from './AlertSave';



export default class SMTumblr extends Component {
  constructor(props) {
      super(props);
      this.state = {
          tumblr: '', 
          tumblrKey: '', 
          tumblrSecret: '',

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

    console.log("Retreiving tumblr")

    axios.get("/social/load/"+this.props.owner)
      .then(response => {
        console.log(response);
        this.setState({  
            tumblr: response.data.tumblr,
            });
      })
      .catch(function (error) {
        this.setState({  
          tumblr: "",
          tumblrKey: "", 
          tumblrSecret: "", 
        });

        console.log(error);
      })
  }


  handleSubmit(event) 
  {
    event.preventDefault();

    const sm = {
        type: 'TUMBLR',
        owner: this.props.owner,
        tumblr: this.state.tumblr,
        tumblrKey: this.state.tumblrKey,
        tumblrSecret: this.state.tumblrSecret,
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
            <IoLogoTumblr />
            <TextField 
                id="sm-tumblr" 
                fullWidth
                name="tumblr"
                value={this.state.tumblr} 
                onChange={(e)=>{this.handleChange(e);}} 
                label="Tumblr" 
            />
        </Grid>
        <Grid item xs={12} style={upstyle}>
            <HelpText name='tumblr.api' style="neuhelp"/>      
        </Grid>
        <Grid item xs={12}>
            <VpnKey />
            <TextField 
                id="sm-tumblrKey" 
                name="tumblrKey"
                fullWidth
                value={this.state.tumblrKey} 
                onChange={(e)=>{this.handleChange(e);}} 
                label="Tumblr Key" 
            />
        </Grid>
        <Grid item xs={12}>
            <IoLogoTumblr />
            <TextField 
                id="sm-tumblrSecret" 
                fullWidth
                name="tumblrSecret"
                value={this.state.tumblrSecret} 
                onChange={(e)=>{this.handleChange(e);}} 
                label="Tumblr Secret" 
            />
        </Grid>
      </Grid>
      </IconContext.Provider>
      <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="tumblr details"/>
    </form>  
    );
  }
}