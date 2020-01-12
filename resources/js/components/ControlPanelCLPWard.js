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
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/ContactMail';
import PhoneIcon from '@material-ui/icons/Phone';
import HelpText from './HelpText';


export default class ControlPanelCLPWard extends Component {
  constructor(props) {
      super(props);
      this.state = {name: ""};
  }

  handleChangeName(e){
    this.setState({
      name: e.target.value
    })
  }

  componentDidMount(){
    if(typeof(this.props.ward) == "undefined") 
    {
      return;
    }
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    if(typeof(this.props.ward) == "undefined") 
    {
      return;
    }
    if(prevProps.ward == this.props.ward)
    {
      return;
    }
    this.refresh();
  }
  

  refresh()
  {
    if(this.props.ward=='')
    {
      return;
    }

    axios.get("/wards/" + this.props.ward + "/edit")
      .then(response => {
        this.setState({ name: response.data[0].name });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onSave(event) 
  {
    event.preventDefault();

    const ward = {
      name: this.state.name,
    }

    let uri = '/wards/'+this.props.ward;
    axios.patch(uri, ward).then((response) => {
          //this.props.history.push('/display-item');
    });
  }


  render() 
  {

    if(typeof(this.props.ward) == "undefined") 
    {
      return(<div></div>);
    }

    const neu = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingBottom:16,
      paddingRight:16,
      marginRight:16,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    return (
      <div style={neu}>
          <Grid style={{paddingLeft: 10}} container spacing={3}>
            <Grid item xs={12}>
              <TextField id="ward-name" value={this.state.name} label="Name" onChange={(e) => this.handleChangeName(e)} helperText="This is normally the full official name of the council"/>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" onClick={(e)=>this.onSave(e)}>
                <SaveIcon />Save
              </Button>
            </Grid>
          </Grid>
      </div>
    );
  }
}