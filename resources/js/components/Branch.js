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

import InfoIcon from '@material-ui/icons/Info';
import CameraIcon from '@material-ui/icons/Camera';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ShareIcon from '@material-ui/icons/Share';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import EventIcon from '@material-ui/icons/Event';
import HelpIcon from '@material-ui/icons/Help';
import MembershipIcon from '@material-ui/icons/CardMembership';
import EmailIcon from '@material-ui/icons/Email';

import { push as Menu } from 'react-burger-menu'


import ControlPanelCLPBranchInfo from './clp/ControlPanelCLPBranchInfo';

import BranchInfo from './BranchInfo';
import BlogEditor from './BlogEditor';
import Campaign from './Campaign';
import UploadPicture from './UploadPicture'
import SocialMedia from './social/SocialMedia';
import Event from './Event';
import Messages from './Messages';

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


class Branch extends Component {

  constructor(props) {
      super(props);
      this.state = { selectedtab: 0, selectedmaintab: 0};
  }

  componentDidMount(){
  }


  handleChange(event, value) {
    this.setState({ selectedtab: value });
  };

  handleMainChange(event, value) {
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
            <a onClick={()=>{this.setState({selectedmaintab:0}); }} id="home" className="menu-item">{<AnnouncementIcon />}<br/>News</a>
            <a onClick={()=>{this.setState({selectedmaintab:1}); }} className="menu-item">{<EmailIcon />}<br/>Messages</a>
            <a onClick={()=>{this.setState({selectedmaintab:2}); }} id="about" className="menu-item">{<InfoIcon />}<br/>About</a>
            <a onClick={()=>{this.setState({selectedmaintab:3}); }} id="contact" className="menu-item">{<CameraIcon />}<br/>Images</a>
            <a onClick={()=>{this.setState({selectedmaintab:4}); }} className="menu-item">{<ShareIcon />}<br/>Social</a>
            <a onClick={()=>{this.setState({selectedmaintab:5}); }} className="menu-item">{<RecordVoiceOverIcon />}<br/>Campaigns</a>
            <a onClick={()=>{this.setState({selectedmaintab:6}); }} className="menu-item">{<EventIcon />}<br/>Events</a>
            <a onClick={()=>{this.setState({selectedmaintab:7}); }} className="menu-item">{<HelpIcon />}<br/>Help</a>
        </Menu>
        <main id="page-wrap" style={{width: '100%'}}>
        
          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 0}>
              <BlogEditor owner={this.props.guid} description="Your posts as the branch"/>
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 1}>
              <Messages owner={this.props.guid} description="Messages sent to the branch"/>
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 2}>
              <h4>Branch Information</h4>
              <Tabs 
                  style={tabStyle} 
                  value={this.state.selectedtab} 
                  aria-label="simple tabs example" 
                  onChange={(e,v) => { this.handleChange(e,v); }}>
                <Tab label="Basic Information" icon={<MembershipIcon />} />
                <Tab label="About" icon={<MembershipIcon />} />
              </Tabs>
              <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 0}>
                  <ControlPanelCLPBranchInfo guid={this.props.guid}/>
              </div>
              <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 1}>
                  <BranchInfo guid={this.props.guid}/>
              </div>
          </div>

            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 3}>
                <h4>Branch Images</h4>
                <UploadPicture title="Upload Home page picture" helptext="profile.picture" owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 4}>
                <h4>Social Media links for the branch</h4>
                <SocialMedia  owner={this.props.guid}/>
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 5}>
                <h4>Campaigns run by the branch</h4>
                <Campaign owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 6}>
                <h4>Events organised by the branch</h4>
                <Event owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 7}>
                <h4>Help</h4>
            </div>
                
        </main>

    </div>
    );
  }
}

export default withStyles(styles)(Branch);

