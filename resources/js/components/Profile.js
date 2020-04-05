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
import InfoIcon from '@material-ui/icons/Info';
import CameraIcon from '@material-ui/icons/Camera';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ShareIcon from '@material-ui/icons/Share';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import HelpIcon from '@material-ui/icons/Help';

import { push as Menu } from 'react-burger-menu'


import ProfileInfo from './ProfileInfo';
import Campaign from './Campaign';
import UploadPicture from './UploadPicture'
import SocialMedia from './social/SocialMedia';


const styles = theme => ({
  root: {
    backgroundColor: "#E0E5EC" ,
    flexGrow: 1,
    display: 'flex',

  },

  tabpage: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,

  },

  '.MuiTabs-fixed': {
      width: 50,
  }

});


class Profile extends Component {

  constructor(props) {
      super(props);
      this.state = { selectedtab: 0, selectedmaintab: 0};
  }

  componentDidMount(){
    console.log("Editing Councillor:"+this.props.guid)
  }


  handleChange(event, value) {
    console.log("Selected Tab:"+value);
    this.setState({ selectedtab: value });
  };

  handleMainChange(event, value) {
    console.log("Selected Tab:"+value);
    this.setState({ selectedmaintab: value });
  };


  render() 
  {
    const { classes } = this.props;

    const containerStyle = {
        paddingTop: 46 
      };

    const tabMainStyle = {
      backgroundColor: "#212121",
      color: "#ffffff" ,
      width: 50,
    };

    const tabStyle = {
        backgroundColor: "#A0A5AC" 
    };

    const tabpageStyle = {
    backgroundColor: "#E0E5EC" 
    };
    
    const styles = {
        bmMenuWrap: {
          position: 'fixed',
          height: '100%'
        },
        bmMenu: {
          background: '#212121',
          padding: '0 0 0',
          fontSize: '0.8em',
          textAlign: 'center'
        },

        bmItemList: {
          color: '#eeeeee',
          padding: '0.2em 0 0 0'
        },

      }
      
        
    return(
    <div id="outer-container" className={classes.root} style={containerStyle}>
        <Menu isOpen={ true } styles={ styles }
                outerContainerId={ "outer-container" }
                pageWrapId={ "page-wrap" }
                disableCloseOnEsc
                noTransition
                noOverlay
                disableOverlayClick
                customBurgerIcon={ false } 
                customCrossIcon={ false } 
                width={80}>
            <a onClick={()=>{this.setState({selectedmaintab:0}); }} id="about" className="menu-item">{<InfoIcon />}<br/>About</a>
            <a onClick={()=>{this.setState({selectedmaintab:1}); }} id="contact" className="menu-item">{<CameraIcon />}<br/>Images</a>
            <a onClick={()=>{this.setState({selectedmaintab:2}); }} className="menu-item">{<ShareIcon />}<br/>Social</a>
            <a onClick={()=>{this.setState({selectedmaintab:3}); }} className="menu-item">{<RecordVoiceOverIcon />}<br/>Campaigns</a>
            <a onClick={()=>{this.setState({selectedmaintab:4}); }} className="menu-item">{<HelpIcon />}<br/>Help</a>
        </Menu>
        <main id="page-wrap" style={{width: '100%', paddingRight:  50}}>
        
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 0}>
                <h4>Personal Information</h4>
                <ProfileInfo guid={this.props.guid}/>
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 1}>
                <h4>Images</h4>
                <UploadPicture title="Upload Home page picture" helptext="profile.picture" owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 2}>
                <h4>Social Media</h4>
                <SocialMedia  owner={this.props.guid}/>
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 3}>
                <h4>Campaigns</h4>
                <Campaign owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 4}>
                <h4>Help</h4>
            </div>

                
        </main>

    </div>
    );
  }
}

export default withStyles(styles)(Profile);

