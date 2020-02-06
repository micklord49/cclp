import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import HomeIcon from '@material-ui/icons/Home';
import GavelIcon from '@material-ui/icons/Gavel';
import FaceIcon from '@material-ui/icons/Face';
import MembershipIcon from '@material-ui/icons/CardMembership';
import CameraIcon from '@material-ui/icons/Camera';
import PersonIcon from '@material-ui/icons/Person';

import ControlPanelCLPHome from './ControlPanelCLPHome';
import ControlPanelCLPCouncils from './ControlPanelCLPCouncils';
import ControlPanelCLPBranches from './ControlPanelCLPBranches';
import BlogEditor from './BlogEditor';
import Campaign from './Campaign';
import UploadPicture from './UploadPicture'
import SocialMedia from './SocialMedia';


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


class ControlPanelCLP extends Component {

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

    const tabpageStyle = {
    backgroundColor: "#E0E5EC" 
    };
    
  
    return(
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs 
          style={tabStyle} 
          value={this.state.selectedtab} 
          aria-label="simple tabs example" 
          onChange={(e,v) => { this.handleChange(e,v); }}>
          <Tab label="News" icon={<HomeIcon />} />
          <Tab label="Basic Information" icon={<HomeIcon />} />
          <Tab label="Home Page Image" icon={<HomeIcon />} />
          <Tab label="Social Media" icon={<HomeIcon />} />
          <Tab label="Councils" icon={<HomeIcon />} />
          <Tab label="Branches"  icon={<HomeIcon />} />
          <Tab label="My Campaigns"  icon={<HomeIcon />} />
        </Tabs>
      </AppBar>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 0}>
        <BlogEditor owner={this.props.guid} description="Your posts as the CLP"/>
      </div>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 1}>
        <ControlPanelCLPHome />
      </div>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 2}>
        <UploadPicture title="Upload Home page picture" helptext="profile.picture" owner={this.props.guid} />
      </div>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 3}>
        <SocialMedia  owner={this.props.guid}/>
      </div>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 4}>
        <ControlPanelCLPCouncils />
      </div>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 5}>
        <ControlPanelCLPBranches owner={this.props.guid} />
      </div>
      <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 6}>
        <Campaign owner={this.props.guid} />
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(ControlPanelCLP);

