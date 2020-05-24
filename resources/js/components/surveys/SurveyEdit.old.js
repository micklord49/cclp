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
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import SaveIcon from '@material-ui/icons/Save';



import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

import SurveyItems from './SurveyItems';


export default class SurveyInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        guid: props.guid, 
        owner: props.owner, 
        name: "", 
        description: "",
        active: false,
        showvotes: false,
      };
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const target = event.target;    
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value
    });
  }

  handleChangeBody(text){
    this.setState({
      body: text
    })
  }

  
  componentDidMount(){
    if(!this.state.guid == "")
    {
        this.refresh();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.guid !== prevProps.guid) 
    {
      this.refresh();
    }
  }

   refresh()
   {
    let uri = '/survey/'+this.props.guid+'/edit';
    axios.get(uri).then((response) => {
      this.setState({
        guid: response.data.guid, 
        owner: response.data.owner, 
        name: response.data.name, 
        description: response.data.description, 
        active: response.data.active == 1,
        showvotes: response.data.showvotes == 1,
      });
    });
   }


  async onSave() 
  {
    const post = {
      guid: this.state.guid,
      owner: this.state.owner,
      name: this.state.name,
      description: this.state.description,
      active: this.state.active,
      showvotes: this.state.showvotes,
    }

    let uri = '/survey/'+this.props.guid;
    await axios.patch(uri, post)
      .then((response) => {
      })
  }

  async saveStatus(newval) 
  {
    const post = {
      guid: this.state.guid,
      status: newval,
    }

    let uri = '/survey/'+this.props.guid;
    await axios.patch(uri, post)
      .then((response) => {
      })
  }

  render() 
  {
    if(this.props.owner=='')
    {
      return(<div>Loading...</div>);
    }
    if(this.props.guid=='')
    {
      return(<div></div>);
    }

    var events="";

    const form = {
      backgroundColor: "#ffffff" ,
      paddingTop: 10,
      marginTop: 10,
      borderTop: "thin ridge silver",
      borderRadius: 20,
    };

 

    return (
    <Grid container spacing={4} style={form}>
        <Grid item xs={12}>
              <Button color="primary" disabled={this.state.published} variant="contained" startIcon={<SaveIcon />} onClick={()=>{this.onSave();}}>
                Save
              </Button>
        </Grid>
        <Grid container item xs={6}>
            <Grid item xs={12}>
                <TextField 
                    value={this.state.name} 
                    label="Name" 
                    name="name"
                    fullWidth
                    onChange={(e)=>{this.handleChange(e);}} 
                    helperText="(Give your survey a meaningful name - keep it short)"
                    InputProps={{
                        readOnly: this.state.active,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="active"
                            checked={this.state.active == 1}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="active"
                            color="primary"
                            />
                        }
                        label="Active"
                        />
                </FormGroup>
            </Grid>
            <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                            name="showvotes"
                            checked={this.state.showvotes == 1}
                            onChange={(e)=>{this.handleChange(e);}}
                            value="showvotes"
                            color="primary"
                            />
                        }
                        label="Show vote tally after voting"
                        />
                </FormGroup>
            </Grid>
        </Grid>
        <Grid item xs={6}>
            <p>Description of your survey</p>
            <div style={{backgroundColor:"#ffffff", minHeight:200}}>
                <ReactQuill value={this.state.description} readOnly={this.state.active}
                            onChange={(e)=>{this.handleChangeBody(e);}} />
            </div>
        </Grid>
        <Grid item xs={12}>
              <Button color="primary" disabled={this.state.published} variant="contained" startIcon={<SaveIcon />} onClick={()=>{this.onSave();}}>
                Save
              </Button>
        </Grid>
        <Grid item xs={12}>
            <SurveyItems owner={this.state.guid}/>
        </Grid>
    </Grid>
  );
  }
}