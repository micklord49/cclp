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
import SaveIcon from '@material-ui/icons/Save';

import ControlPanelCLPWards from './ControlPanelCLPWards';


export default class ControlPanelCLPCouncil extends Component {
  constructor(props) {
      super(props);
      this.state = {name: ""};
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(e){
    this.setState({
      name: e.target.value
    })
  }

  componentDidMount(){
    if(typeof(this.props.council) == "undefined")   return;
    this.refresh();
  }

  componentDidUpdate(prevProps) 
  {
    if(typeof(this.props.council) == "undefined")   return;
    if(prevProps.council == this.props.council)     return;
    this.refresh();
  }
  

  refresh()
  {
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

    let uri = '/councils/'+this.props.council;
    axios.patch(uri, council).then((response) => {
          //this.props.history.push('/display-item');
          this.props.onChange();
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
      paddingRight: 10,
      boxShadow: "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px    rgba(255,255,255, 0.5)"
    };

    if(typeof(this.props.council) == "undefined") 
    {
      return(<div></div>);
    }

    return (
      <div>
        <form style={neu} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid style={{paddingLeft: 10}} container spacing={3}>
            <Grid item xs={12}>
              <TextField id="council-name" value={this.state.name} label="Name" onChange={this.handleChangeName} helperText="This is normally the full official name of the council"/>
            </Grid>
            <Grid item xs={12}>
              <Button color="primary" type="submit">
                <SaveIcon />Save
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ControlPanelCLPWards council={this.props.council}/>
            </Grid>
          </Grid>
        </form>  
  </div>
    );
  }
}