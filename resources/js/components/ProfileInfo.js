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


// ES module
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


export default class ProfileInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {email: '', name: '', intro: '', about: '', birthdate: '01/01/1970', hidebirthdate: true, telephone: '', publicemail: ''};
      this.handleChangeBirthdate = this.handleChangeBirthdate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(event);
  
    this.setState({
      [name]: value
    });
    console.log(this.state);

  }

  handleChangeAbout(value) {
    this.setState({ about: value })
  }


  
  handleChangeBirthdate(e){
    this.setState({
      birthdate: e.target.value
    })
  }

  componentDidMount(){
    axios.get("/profile/"+this.props.guid+"/edit")
      .then(response => {
        this.setState({ email: response.data.email, 
                        name: response.data.name, 
                        intro: response.data.intro, 
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
      intro: this.state.intro,
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

    const editstyle = {
      border: '1px solid gray',
      minHeight: 400,
      backgroundColor: '#ffffff',
      marginLeft: 0,
      marginRight: 0,
      paddingLeft:0,
      paddingRight:0,
    }


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
                    <TextField id="info-user" 
                              value={this.state.email} 
                              label="User Login (you cannot change this)" 
                              InputProps={{
                                  readOnly: true,
                              }} 
                              name="email"
                              onChange={(e)=>{this.handleChange(e);}} 
                              helperText="This is the email address you created your account with"/>
                </Grid>
                <Grid item xs={12}>
                  <TextField  id="info-name" 
                              value={this.state.name} 
                              name="name" 
                              label="Name" 
                              onChange={(e)=>{this.handleChange(e);}} 
                              helperText="This is your full name as you wish it to appear to other users."/>
                </Grid>
                <Grid item xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="info-birthdate"
                      label="Birthdate"
                      format="dd/MM/yyyy"
                      value={this.state.birthdate}
                      onChange={this.handleChangeBirthdate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.hidebirthdate}
                        name="hidebirthdate"
                        onChange={(e)=>{this.handleChange(e);}}
                        value="true"
                        color="primary"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      }
                    label="Hide your birthdate"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl >
                      <InputLabel htmlFor="info-telephone">Telephone Number</InputLabel>
                      <Input
                        id="info-telephone"
                        type='text'
                        value={this.state.telephone}
                        name="telephone"
                        onChange={(e)=>{this.handleChange(e);}}
                        endAdornment={<InputAdornment position="end"><PhoneIcon /></InputAdornment>}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl >
                      <InputLabel htmlFor="info-publicemail">Public Email</InputLabel>
                      <Input
                        id="info-publicemail"
                        type='text'
                        value={this.state.publicemail}
                        name="publicemail"
                        onChange={(e)=>{this.handleChange(e);}}
                        endAdornment={<InputAdornment position="end"><MailIcon /></InputAdornment>}
                      />
                    </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField id="info-intro" 
                  value={this.state.intro} 
                  label="Introduce Yourself" 
                  name="intro"
                  onChange={(e)=>{this.handleChange(e);}} 
                  fullWidth
                  multiline
                  placeholder="Introduce Yourself"
                  helperText="This is a short introduction to be shown on your card."/>

                </Grid>
                <Grid item xs={12}>
                  <h4>Tell the world about yourself</h4>
                  <div style={editstyle}>
                    <ReactQuill value={this.state.about}
                        onChange={(e)=>{this.handleChangeAbout(e);}} />
                  </div>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>  
      </div>    
    );
  }
}