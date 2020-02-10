import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import HelpText from './HelpText';
import AlertSave from './AlertSave';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 

const cropper = React.createRef(null);

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Dropzone from 'react-dropzone';
import { notchedOutline } from 'material-components-web';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class UploadPicture extends Component {
  constructor(props) {
      super(props);
      this.state = {
        imagefile: "", 
        canedit: false, 
        canchange: true, 
        selectedfile: null,

        opensuccess: false, 
        openfail: false, 
        failmessage: '', 
      };
      //this.handleChangeAbout = this.handleChangeAbout.bind(this);
      //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeAbout(e){
    this.setState({
      about: e.target.value
    })
  }
  
  componentDidMount(){
    this.loadImage();
  }

  loadImage()
  {
    if(this.props.owner=='')   return;
    axios.get("/image/"+this.props.owner+"/imagefile")
      .then(response => {
        this.setState({ imagefile: response.data.filename, 
                        canedit: response.data.canedit, 
                        canchange: response.data.canchange, 
                         });
        console.log('For owner:'+this.props.owner);
        console.log('Got file:'+this.state.imagefile);
      })
      .catch(function (error) {
        console.log(error);
      })
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
    var imagefile = document.getElementById('fileinp'+this.props.owner);
    formData.append("image", event.target.files[0]);
    
    console.log(formData);

    let uri = '/image/'+this.props.owner+"/changeimage";
    axios.post(uri, formData,{
      headers: 
        {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        this.setState({ opensuccess: true })
        this.loadImage();
        console.log('Geting file:'+this.state.imagefile);
      })
      .catch((error) => {
        this.setState({ failmessage: error, openfail: true })
        this.loadImage();
        console.log(error);
      });
  }

  handleClose(event, reason) 
  {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ opensuccess: false });
  };


  render() 
  {

    const inp = {
      display: 'none'
    }

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

    const neuhelp = {
      backgroundColor: "#E0E5EC" ,
      borderRadius:4,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:10,
      paddingBottom:16,
      paddingRight:20,
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

    const upstyle = {
      marginLeft: 20,
      marginRight: 20,
      marginTop:20,
      paddingTop:20,
      paddingLeft:10,
      paddingRight:20,
    };

    return (
      <div style={neu}>
        <Grid container>
          <Grid item xs={6} style={{height: 400}}>
            <Cropper
                    ref={cropper}
                    src={this.state.imagefile}
                    style={{height: '100%', width: '100%', objectFit: 'contain', backgroundColor: "#ffffff"}}
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
              <Grid item xs={12} style={upstyle}>
                <input
                  accept="image/*"
                  id={'fileinp'+this.props.owner}
                  type="file"
                  style={inp}
                  onChange={(event)=>{this.uploadfile(event);}}
                />
                <label htmlFor={'fileinp'+this.props.owner}>                
                  <Button
                    variant="outlined"
                    component="span"
                    color="secondary"
                    startIcon={<CloudUploadIcon />}
                    >
                    {this.props.title}
                  </Button>
                </label>                
              </Grid>
              <Grid item xs={12} style={upstyle}>
                <HelpText name={this.props.helptext} style="neuhelp"/>      
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <AlertSave opensuccess={this.state.opensuccess} openfail={this.state.openfail} failmessage={this.state.failmessage} datatype="picture"/>
      </div>);
  }
}