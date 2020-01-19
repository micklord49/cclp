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

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 

const cropper = React.createRef(null);

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Dropzone from 'react-dropzone';


export default class ProfileInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {imagefile: "", canedit: false, canchange: true, selectedfile: null};
      //this.handleChangeAbout = this.handleChangeAbout.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeAbout(e){
    this.setState({
      about: e.target.value
    })
  }
  
  componentDidMount(){
    axios.get("/profile/"+this.props.guid+"/imagefile")
      .then(response => {
        this.setState({ imagefile: response.data.filename, 
                        canedit: response.data.canedit, 
                        canchange: response.data.canchange, 
                         });
        console.log('Geting file:'+this.state.imagefile);
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
      about: this.state.about,
      birthdate: this.state.birthdate,
      hidebirthdate: this.state.hidebirthdate?1:0,
      telephone: this.state.telephone,
      publicemail: this.state.publicemail
    }
    console.log("handleSubmit");
    console.log(event);

    let uri = '/profile/1';
    axios.patch(uri, user).then((response) => {
          //this.props.history.push('/display-item');
    });
  }

  _crop(){
    // image in dataUrl
    //console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  uploadfile(event) {
    event.preventDefault();
    event.persist();

    console.log(event);

    this.setState({ selectedfile: event.target.files[0] });
    
    var formData = new FormData();
    var imagefile = document.querySelector('#file');
    formData.append("image", event.target.files[0]);
    
    console.log(formData);

    let uri = '/profile/'+this.props.guid+"/changeimage";
    axios.post(uri, formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }}).then((response) => {
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
      paddingTop:10,
      paddingLeft:10,
      paddingRight:20,
      paddingBottom:20,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    const dandd = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: 20,
      marginRight: "auto",
      marginTop:10,
      paddingBottom:16,
      paddingTop:20,
      paddingLeft:10,
      paddingRight:20,
      paddingBottom:20,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    return (
      <div style={neu}>
        <Grid container>
          <Grid item xs={6}>
            <Cropper
                    ref={cropper}
                    src={this.state.imagefile}
                    style={{height: 400, width: '100%', backgroundColor: "#ffffff"}}
                    // Cropper.js options
                    aspectRatio={16 / 9}
                    guides={false}
                    crop={()=>this._crop()} 
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <form onSubmit={()=>{this.handleSubmit();}}>
                  <input type="file" name="image" onChange={(event)=>{this.uploadfile(event);}}/>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>);
  }
}