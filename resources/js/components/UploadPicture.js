import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import CropIcon from '@material-ui/icons/Crop';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import HelpText from './HelpText';
import AlertSave from './AlertSave';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; 


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

      this.cropper = React.createRef();

  }

  handleChangeAbout(e){
    this.setState({
      about: e.target.value
    })
  }
  
  componentDidMount(){
    this.loadImage();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.owner !== prevProps.owner) {
      this.loadImage();
    }
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
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  _crop(){
    // image in dataUrl
  }

  deleteimage(e)
  {
    event.preventDefault();
    axios.get("/image/" + this.props.owner + "/delete")
    .then(response => {
      this.cropper.current.replace(this.state.imagefile);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  rotateclockwise(e)
  {
    event.preventDefault();
    axios.get("/image/" + this.props.owner + "/rclock")
    .then(response => {
      this.cropper.current.replace(this.state.imagefile);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  rotateanticlockwise(e)
  {
    event.preventDefault();
    axios.get("/image/" + this.props.owner + "/aclock")
    .then(response => {
      this.cropper.current.replace(this.state.imagefile);
     })
    .catch(function (error) {
      console.log(error);
    })
  }

  cropimage(e)
  {
    var canvas = this.cropper.current.getCanvasData();
    var crop = this.cropper.current.getCropBoxData();

    var xratio = canvas.naturalWidth / canvas.width;
    var yratio = canvas.naturalHeight /canvas.height;

    var newwidth = crop.width * xratio;
    var newheight = crop.height * yratio;

    var xorigin = crop.left - canvas.left;
    var yorigin = crop.top - canvas.top;

    xorigin *= xratio;
    yorigin *= yratio;

    xorigin = Math.floor(xorigin);
    yorigin = Math.floor(yorigin);
    newwidth = Math.floor(newwidth);
    newheight = Math.floor(newheight);

    event.preventDefault();
    axios.get("/image/" + this.props.owner + "/" + xorigin + "/" + yorigin + "/" + newwidth + "/" + newheight + "/crop")
    .then(response => {
      this.cropper.current.replace(this.state.imagefile);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  uploadfile(event) {
    event.preventDefault();
    event.persist();

    this.setState({ selectedfile: event.target.files[0] });
    
    var formData = new FormData();
    var imagefile = document.getElementById('fileinp'+this.props.owner);
    formData.append("image", event.target.files[0]);
    
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
      })
      .catch((error) => {
        this.setState({ failmessage: error, openfail: true })
        this.loadImage();
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

    if(this.props.owner=='')
    {
      return(<div>Loading...</div>);
    }


    const inp = {
      display: 'none'
    }


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



    const upstyle = {
      marginLeft: 20,
      marginRight: 20,
      marginTop:20,
      paddingTop:20,
      paddingLeft:10,
      paddingRight:20,
    };

    var sz=6;
    if(this.props.vertical) sz=12;

    return (
      <div>
        <Grid container>
          <Grid item xs={sz} style={{height: 400}}>
            <Cropper
                    ref={this.cropper}
                    src={this.state.imagefile}
                    style={{height: '100%', width: '100%', objectFit: 'contain', backgroundColor: "#ffffff"}}
                    // Cropper.js options
                    aspectRatio={16 / 9}
                    guides={false}
                    crop={()=>{this._crop();}} 
            />
          </Grid>
          <Grid item xs={sz}>
            <Grid container>
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
                <IconButton
                    color="primary"
                    onClick={(e)=>this.rotateanticlockwise(e)}
                    >
                    <RotateLeftIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={(e)=>this.rotateclockwise(e)}
                    >
                      <RotateRightIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={(e)=>this.cropimage(e)}
                    >
                      <CropIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={(e)=>this.deleteimage(e)}
                    >
                      <DeleteIcon />
                  </IconButton>
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