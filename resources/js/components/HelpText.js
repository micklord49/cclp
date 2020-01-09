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
import HomeIcon from '@material-ui/icons/Home';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class HelpText extends Component {
  constructor(props) {
      super(props);
      this.state = {heading: '', text: '', morehead: '', moretext: ''};
  }

  handleChangeName(e){
    this.setState({
      name: e.target.value
    })
  }
  handleChangeAbout(e){
    this.setState({
      description: e.target.value
    })
  }
  handleChangeTelephone(e){
    this.setState({
      dn: e.target.value
    })
  }
 
  componentDidMount(){
    axios.get('/helptext/'+this.props.name)
      .then(response => {
        this.setState({ heading: response.data.heading, text: response.data.text });
      })
      .catch(function (error) {
        //console.log(error);
      })
      axios.get('/helptext/' + this.props.name + '.full')
      .then(response => {
        this.setState({ morehead: response.data.heading, moretext: response.data.text });
      })
      .catch(function (error) {
        //console.log(error);
      })
  }

  moretextcontrol()
  {
      let morehead = this.state.morehead;
      let moretext = this.state.moretext;

      if(typeof morehead == 'undefined')  morehead="More...";
      if(morehead.length == 0)  morehead="More...";

      if(typeof moretext == 'undefined')  return;
  
      if(moretext.length > 0)
        return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
            >
                {morehead}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div dangerouslySetInnerHTML={{__html: moretext}} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
        )
    else
    {
        return;
    }
  }

  render() 
  {
    const head = this.state.heading;
    const text = this.state.text;

    let morecontrol;

    morecontrol = this.moretextcontrol();

    return (
        <Paper>
            <h3>
            <div dangerouslySetInnerHTML={{__html: head}} />
            </h3>
            <div dangerouslySetInnerHTML={{__html: text}} />
            {morecontrol}
        </Paper>
    );
  }
}