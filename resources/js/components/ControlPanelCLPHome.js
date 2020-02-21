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
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/ContactMail';
import PhoneIcon from '@material-ui/icons/Phone';
import HelpText from './HelpText';
import CPLUsers from'./CPLUsers';
import TagList from './TagList';

import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6



export default class ControlPanelCLPHome extends Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '', 
        description: '', 
        dn: '', 
        phone: '', 
        email: '',
        newtag: '',

        adminusers: new Array(),
        tags: new Array(),

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

  handleChangeDescription(text){
    this.setState({
      description: text
    })
  }

  componentDidMount(){
    this.refresh();
  }

  refresh()
  {
    axios.get(`/clp/1/edit`)
      .then(response => {
        this.setState({ 
          name: response.data.name, 
          description: response.data.description, 
          dn: response.data.dn, 
          phone: response.data.phone, 
          email: response.data.email,
          adminusers: response.data.adminusers,
          tags: response.data.tags,
         });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  addUser(guid)
  {
    let uri = '/clp/'+guid+'/adduser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });

  }

  removeUser(guid)
  {
    let uri = '/clp/'+guid+'/removeuser';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });
  }

  removeTag(guid)
  {
    let uri = '/clp/'+guid+'/removetag';
    axios.get(uri, {}).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
        });
  }

  addTag(name)
  {
    if(this.state.newtag=="") return;
    const tag = {
      name: this.state.newtag,
    }
    this.setState({newtag:""});
    let uri = '/clp/1/addtag';
    axios.patch(uri, tag).then((response) => {
          //this.props.history.push('/display-item');
          this.refresh();
    });
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
      email: this.state.email,
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
      paddingRight:40,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    return (
      <div style={neu}>
        <HelpText name='clp.role' style="neu"/>      
        <form noValidate autoComplete="off" onSubmit={(e)=>{this.handleSubmit(e);}}>
          <Grid container style={{paddingLeft: 10}} spacing={2} >
            <Grid item xs={12}>
              <Button color="primary" type="submit">
                <SaveIcon />Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField 
                      id="clp-name" 
                      value={this.state.name} 
                      label="Name" 
                      name="name"
                      fullWidth
                      onChange={(e)=>{this.handleChange(e);}} 
                      helperText="This is normally the name of your constituency"/>
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                      id="clp-dn" 
                      value={this.state.dn} 
                      label="Domain Name" 
                      name="dn"
                      fullWidth
                      onChange={(e)=>{this.handleChange(e);}}  
                      helperText="(This will look like: www.myclp.org)"/>
                </Grid>
                <Grid item xs={12}>
                <FormControl >
                  <InputLabel htmlFor="clp-phone">Telephone Number</InputLabel>
                  <Input
                    id="clp-phone"
                    type='text'
                    value={this.state.phone}
                    name="phone"
                    onChange={(e)=>{this.handleChange(e);}}  
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
                    name="email"
                    onChange={(e)=>{this.handleChange(e);}}  
                    endAdornment={<InputAdornment position="end"><MailIcon /></InputAdornment>}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <p>Select the users who will be able to access the administration screen</p>
                <CPLUsers onremoveuser={(guid)=>{this.removeUser(guid)}} users={this.state.adminusers} addUser={(guid) => this.addUser(guid)}/>              
              </Grid>
              <Grid item xs={12}>
                <p>Create the tags your CLP will use</p>
                <FormControl >
                  <InputLabel htmlFor="clp-tag">New Tag</InputLabel>
                  <Input
                    id="newtag"
                    type='text'
                    value={this.state.newtag}
                    name="newtag"
                    onChange={(e)=>{this.handleChange(e);}} 
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="add new tag"
                          onClick={()=>{this.addTag()}}
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    }        
                  />
                </FormControl>
                <TagList tags={this.state.tags} onremovetag={(guid) => {this.onRemoveTag(guid);}} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <p>Describe your CLP</p>
            </Grid>
            <Grid item xs={12}>
              <div style={{backgroundColor:"#ffffff", minHeight:300}}>
                <ReactQuill value={this.state.description}
                            onChange={(e)=>{this.handleChangeDescription(e);}} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </form>  
  </div>
    );
  }
}