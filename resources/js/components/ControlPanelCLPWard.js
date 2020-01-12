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
      this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleChangeName(e){
    this.setState({
      name: e.target.value
    })
  }

  componentDidMount(){
    if(typeof(this.props.council) == "undefined") 
    {
      console.log("Not loading data - ward not defined yet")
      return;
    }
    this.refresh();
  }

  componentDidUpdate(prevProps) {
    console.log("Updating ward");
    if(typeof(this.props.council) == "undefined") 
    {
      return;
    }
    if(prevProps.council == this.props.council)
    {
      console.log("Not reloading - already set");
      return;
    }
    this.refresh();
  }
  

  refresh()
  {
    console.log("Loading data for council:"+this.props.council)

    axios.get("/councils/" + this.props.council + "/edit")
      .then(response => {
        this.setState({ name: response.data[0].name });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleSubmit(event) 
  {
    event.preventDefault();

    const council = {
      name: this.state.name,
    }

    let uri = '/council/'+this.props.council.guid;
    axios.patch(uri, council).then((response) => {
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
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    console.log("ControlPanelCLPWard - Render");
    console.log(this.state);

    return (
      <div>
          <Grid style={{paddingLeft: 10}} container spacing={3}>
            <Grid item xs={12}>
              <TextField id="ward-name" value={this.state.name} label="Name" onChange={this.handleChangeName} helperText="This is normally the full official name of the council"/>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary">
                <SaveIcon />Save
              </Button>
            </Grid>
          </Grid>
  </div>
    );
  }
}