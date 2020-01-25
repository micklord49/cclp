import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import HomeIcon from '@material-ui/icons/Home';
import GavelIcon from '@material-ui/icons/Gavel';
import FaceIcon from '@material-ui/icons/Face';
import MembershipIcon from '@material-ui/icons/CardMembership';
import CameraIcon from '@material-ui/icons/Camera';
import PersonIcon from '@material-ui/icons/Person';

import CouncillorInfo from './CouncillorInfo';
import BlogEditor from './BlogEditor';
import SocialMedia from './SocialMedia';
import UploadPicture from './UploadPicture'


const styles = theme => ({
  root: {
    backgroundColor: "#E0E5EC" ,
    flexGrow: 1,
  },

  tabpage: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,

  }


});


class CouncillorEdit extends Component {

  constructor(props) {
      super(props);
      this.state = { selectedtab: 0};
  }

  componentDidMount(){
    console.log("Editing Councillor:"+this.props.guid)
  }


  handleChange(event, value) {
    console.log("Selected Tab:"+value);
    this.setState({ selectedtab: value });
  };

  render() 
  {
    const { classes } = this.props;

    const tabStyle = {
      backgroundColor: "#A0A5AC" 
    };
  
    return(
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs 
          style={tabStyle} 
          value={this.state.selectedtab} 
          aria-label="simple tabs example" 
          onChange={(e,v) => { this.handleChange(e,v); }}>
          <Tab label="Blog" icon={<FaceIcon />}  />
          <Tab label="Councillor Information" icon={<CameraIcon />}  />
          <Tab label="Profile Image" icon={<CameraIcon />}  />
          <Tab label="Social Media" icon={<MembershipIcon />} />
        </Tabs>
      </AppBar>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 0}>
        <BlogEditor owner={this.props.guid} description="Your posts as a councillor"/>
      </div>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 1}>
        <CouncillorInfo guid={this.props.guid}/>
      </div>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 2}>
        <UploadPicture title="Upload Home page picture" helptext="profile.picture" owner={this.props.guid} />
      </div>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 3}>
        <SocialMedia owner={this.props.guid}/>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(CouncillorEdit);

