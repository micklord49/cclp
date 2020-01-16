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


export default class ControlPanelCLPHome extends Component {
  constructor(props) {
      super(props);
      this.state = {name: '', description: '', dn: '', phone: '', email: ''};
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeDescription = this.handleChangeDescription.bind(this);
      this.handleChangeDn = this.handleChangeDn.bind(this);
      this.handleChangePhone = this.handleChangePhone.bind(this);
      this.handleChangeEmail = this.handleChangeEmail.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(e){
    this.setState({
      name: e.target.value
    })
  }
  handleChangeDescription(e){
    this.setState({
      description: e.target.value
    })
  }
  handleChangeDn(e){
    this.setState({
      dn: e.target.value
    })
  }
  handleChangePhone(e){
    this.setState({
      phone: e.target.value
    })
  }
  handleChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  componentDidMount(){
    axios.get(`/clp/1/edit`)
      .then(response => {
        this.setState({ name: response.data.name, description: response.data.description, dn: response.data.dn, phone: response.data.phone, email: response.data.email });
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  handleSubmit(event) 
  {
    event.preventDefault();

    const clp = {
      type: 'INFO',
      name: this.state.name,
      description: this.state.description,
      dn: this.state.dn,
      phone: this.state.phone,
      email: this.state.email
    }

    let uri = '/clp/1';
    axios.patch(uri, clp).then((response) => {
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
      paddingRight:20,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    return (
      <div style={neu}>
        <HelpText name='clp.role' style="neu"/>      
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid style={{paddingLeft: 10}} container spacing={3}>
            <Grid item xs={12}>
              <TextField id="clp-name" value={this.state.name} label="Name" onChange={this.handleChangeName} helperText="This is normally the name of your constituency"/>
            </Grid>
            <Grid item xs={12}>
              <TextField id="clp-description" value={this.state.description} label="Description" onChange={this.handleChangeDescription} fullWidth multiline rows="4" rowsMax="6"/>
            </Grid>
            <Grid item xs={12}>
              <TextField id="clp-dn" value={this.state.dn} label="Domain Name" onChange={this.handleChangeDn} />
            </Grid>
            <Grid item xs={12}>
            <FormControl >
                <InputLabel htmlFor="clp-phone">Telephone Number</InputLabel>
                <Input
                  id="clp-phone"
                  type='text'
                  value={this.state.phone}
                  onChange={this.handleChangePhone}
                  endAdornment={<InputAdornment position="end"><PhoneIcon /></InputAdornment>}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl >
                <InputLabel htmlFor="clp-email">Email</InputLabel>
                <Input
                  id="clp-email"
                  type='text'
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                  endAdornment={<InputAdornment position="end"><MailIcon /></InputAdornment>}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" type="submit">
                <SaveIcon />Save
              </Button>
            </Grid>

          </Grid>
        </form>  
  </div>
    );
  }
}