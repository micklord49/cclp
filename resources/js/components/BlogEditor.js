import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';

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

require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');

// ES module
import Editor from 'react-medium-editor';



export default class BlogEditor extends Component {
  constructor(props) {
      super(props);
      this.state = {title: "", body: ""};
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeTitle(e){
    this.setState({
      title: e.target.value
    })
  }
  
  handleChangeBody(text,medium){
    this.setState({
      body: text
    })
  }
  
  componentDidMount(){
    console.log("Editing blog for owner:"+this.props.guid)
  }


  handleSubmit(event) 
  {
    event.preventDefault();

    const user = {
      type: 'INFO',
      name: this.state.name,
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                  id="blog-title" value={this.state.email} 
                  label="Title" 
                  onChange={(e)=>{this.handleChangeName(e);}} 
                  helperText="(Describe the subject of your post)"
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{backgroundColor:"#ffffff", minHeight:300}}>
                <Editor 
                    id="info-about" 
                    text={this.state.about} 
                    onChange={(text,medium)=>{this.handleChangeAbout(text,medium)}} 
                    options={{ placeholder: false}}            />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <h5>Your posts as a councillor</h5>
          <MaterialTable
            columns={[
              {
                field: 'edit',
                Title: 'Edit',
                render: rowData => 
                          <IconButton color="primary" onClick={() => {this.addUser(rowData.guid)}}>
                            <AddIcon />
                          </IconButton>
              },
              { title: 'Title', field: 'title' },
              { title: 'Published On', field: 'publishedOn' },
            ]}
            data={query =>
              new Promise((resolve, reject) => {
                let url = '/blog/' + query.pageSize + "/" + (query.page + 1) + "/" + this.props.guid + "/ownersearch" 
                fetch(url)
                  .then(response => response.json())
                  .then(result => {
                    resolve({
                      data: result.data,
                      page: result.page - 1,
                      totalCount: result.count,
                    })
                  })
              })
    
                  }
            title="Blog Posts" 
          />
        </Grid>
      </Grid>
    </form>  
    </div>    );
  }
}