import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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

import QuestionEditVote from './QuestionEditVote';
import QuestionEditContact from './QuestionEditContact';
import QuestionEditText from './QuestionEditText';
import QuestionEditScale from './QuestionEditScale';

import VoteIcon from '@material-ui/icons/HowToVote';
import ContactIcon from '@material-ui/icons/Contacts';
import TextIcon from '@material-ui/icons/Notes';
import ScaleIcon from '@material-ui/icons/LinearScale';

export default class QuestionEdit extends Component {
  constructor(props) {
      super(props);
      this.state = {
        guid: props.guid, 
        owner: props.owner, 
        name: "", 
        type: 0,
        options: "",
        order: 0,
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

  handleChangeOption(text){
    console.log("handleChangeOption");
    this.setState({
      options: text
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
    let uri = '/surveyitem/'+this.props.guid;
    axios.get(uri).then((response) => {
      this.setState({
        guid: response.data.guid, 
        owner: response.data.owner, 
        name: response.data.name, 
        type: response.data.type, 
        options: response.data.options ?? '', 
      });
    });
   }


  async onSave() 
  {
    const post = {
      guid: this.props.guid,
      owner: this.state.owner,
      name: this.state.name,
      type: this.state.type,
      options: this.state.options,
    }

    let uri = '/surveyitem/'+this.props.guid;
    await axios.patch(uri, post)
      .then((response) => {
        this.props.onSaved();
      })
  }

  async saveStatus(newval) 
  {
    const post = {
      guid: this.state.guid,
      status: newval,
    }

    let uri = '/surveyitem/'+this.props.guid;
    await axios.patch(uri, post)
      .then((response) => {
      })
  }

  setType(i)
  {
    this.setState({
      options: '',
      type:i
    });
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
    const form = {
        backgroundColor: "#ffffff" ,
        paddingTop: 10,
        marginTop: 10,
        borderTop: "thin ridge silver",
        borderRadius: 20,
      };
  
    var editor="";

    switch(this.state.type)
    {
        case 1: 
            editor = <QuestionEditVote options={this.state.options} onChange={(e)=>this.handleChangeOption(e)} />
            break;
        case 2: 
            editor = <QuestionEditText options={this.state.options} onChange={(e)=>this.handleChangeOption(e)} />
            break;
        case 3: 
            editor = <QuestionEditContact options={this.state.options} onChange={(e)=>this.handleChangeOption(e)} />
            break;
        case 4: 
            editor = <QuestionEditScale options={this.state.options} onChange={(e)=>this.handleChangeOption(e)} />
            break;
    }
    
    

    return (
    <Grid container spacing={4} style={form}>
        <Grid item xs={12}>
              <Button color="primary" disabled={this.state.published} variant="contained" startIcon={<SaveIcon />} onClick={()=>{this.onSave();}}>
                Save
              </Button>
        </Grid>
        <Grid item xs={12}>
            <TextField 
                value={this.state.name} 
                label="Question Text" 
                name="name"
                fullWidth
                onChange={(e)=>{this.handleChange(e);}} 
                helperText="(This is the text of your question)"
                InputProps={{
                    readOnly: this.props.active,
                }}
            />
        </Grid>
        <Grid item xs={12}>

            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button color={this.state.type==1 ? "secondary" : "primary"} onClick={(e)=>{this.setType(1);}} startIcon={<VoteIcon />}>Vote</Button>
                <Button color={this.state.type==2 ? "secondary" : "primary"} onClick={(e)=>{this.setType(2);}} startIcon={<TextIcon />}>Text</Button>
                <Button color={this.state.type==3 ? "secondary" : "primary"} onClick={(e)=>{this.setType(3);}} startIcon={<ContactIcon />}>Contact</Button>
                <Button color={this.state.type==4 ? "secondary" : "primary"} onClick={(e)=>{this.setType(4);}} startIcon={<ScaleIcon />}>Scale</Button>
            </ButtonGroup>

        </Grid>
        <Grid item xs={12}>
            {editor}
        </Grid>
        <Grid item xs={12}>
              <Button color="primary" disabled={this.state.published} variant="contained" startIcon={<SaveIcon />} onClick={()=>{this.onSave();}}>
                Save
              </Button>
        </Grid>
   </Grid>
  );
  }
}