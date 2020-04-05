import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import HomeIcon from '@material-ui/icons/Home';
import GavelIcon from '@material-ui/icons/Gavel';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import InfoIcon from '@material-ui/icons/Info';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CameraIcon from '@material-ui/icons/Camera';
import EventIcon from '@material-ui/icons/Event';
import EmailIcon from '@material-ui/icons/Email';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ShareIcon from '@material-ui/icons/Share';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import HelpIcon from '@material-ui/icons/Help';

import { push as Menu } from 'react-burger-menu'


import ControlPanelCLPHome from './ControlPanelCLPHome';
import ControlPanelCLPCouncils from './ControlPanelCLPCouncils';
import ControlPanelCLPBranches from './ControlPanelCLPBranches';
import ControlPanelCLPEC from './ControlPanelCLPEC';
import ControlPanelCLPCouncillors from './ControlPanelCLPCouncillors';
import BlogEditor from '../BlogEditor';
import Campaign from '../Campaign';
import Event from '../Event';
import Messages from '../Messages';
import UploadPicture from '../UploadPicture'
import SocialMedia from '../social/SocialMedia';


const styles = theme => ({
  root: {
    backgroundColor: "#ffffff" ,
    flexGrow: 1,
    display: 'flex',

  },

  tabpage: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 50,

  },

  '.MuiTabs-fixed': {
      width: 50,
  }

});


class ControlPanelCLP extends Component {

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
    backgroundColor: "#ffffff" 
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
            <a onClick={()=>{this.setState({selectedmaintab:0}); }} className="menu-item">{<AnnouncementIcon />}<br/>News</a>
            <a onClick={()=>{this.setState({selectedmaintab:1}); }} className="menu-item">{<EmailIcon />}<br/>Messages</a>
            <a onClick={()=>{this.setState({selectedmaintab:2}); }} className="menu-item">{<InfoIcon />}<br/>About</a>
            <a onClick={()=>{this.setState({selectedmaintab:3}); }} className="menu-item">{<CameraIcon />}<br/>Images</a>
            <a onClick={()=>{this.setState({selectedmaintab:4}); }} className="menu-item">{<ShareIcon />}<br/>Social</a>
            <a onClick={()=>{this.setState({selectedmaintab:5}); }} className="menu-item">{<SupervisorAccountIcon />}<br/>People</a>

            <a onClick={()=>{this.setState({selectedmaintab:6}); }} className="menu-item">{<GavelIcon />}<br/>Councils</a>
            <a onClick={()=>{this.setState({selectedmaintab:7}); }} className="menu-item">{<LocalFloristIcon />}<br/>Branches</a>

            <a onClick={()=>{this.setState({selectedmaintab:8}); }} className="menu-item">{<RecordVoiceOverIcon />}<br/>Campaigns</a>
            <a onClick={()=>{this.setState({selectedmaintab:9}); }} className="menu-item">{<EventIcon />}<br/>Events</a>
            <a onClick={()=>{this.setState({selectedmaintab:10}); }} className="menu-item">{<HelpIcon />}<br/>Help</a>
        </Menu>
        <main id="page-wrap" style={{width: '100%',bgColor: '#ffffff'}}>
        
          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 0}>
              <BlogEditor owner={this.props.guid} description="News Posts From The CLP"/>
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 1}>
              <Messages title="Messages for the CLP" owner={this.props.guid} description="Messages sent to the CLP"/>
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 2}>
              <ControlPanelCLPHome />
          </div>

            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 3}>
                <h4>Images of the CLP</h4>
                <UploadPicture title="Upload Home page picture" helptext="profile.picture" owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 4}>
                <h4>Social Media links for the CLP</h4>
                <SocialMedia  owner={this.props.guid}/>
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 5}>
                <h4>The People of the CLP</h4>
                <Tabs 
                  style={tabStyle} 
                  value={this.state.selectedtab} 
                  aria-label="simple tabs example" 
                  onChange={(e,v) => { this.handleChange(e,v); }}>
                  <Tab label="Executive Comittee" icon={<GavelIcon />} />
                  <Tab label="Counsellors" icon={<PeopleIcon />} />
                  <Tab label="Candidate"  icon={<PersonIcon />} />
              </Tabs>
              <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 0}>
                <ControlPanelCLPEC />
              </div>
              <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 1}>
                <ControlPanelCLPCouncillors />
              </div>
              <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedtab != 2}>
                  Candidate Details
              </div>

            </div>
            
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 6}>
                <h4>Councils</h4>
                <ControlPanelCLPCouncils />
            </div>

            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 7}>
                <h4>Branches</h4>
                <ControlPanelCLPBranches owner={this.props.guid} />
            </div>



            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 8}>
                <h4>Campaigns run by the CLP</h4>
                <Campaign owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 9}>
                <h4>Events organised by the CLP</h4>
                <Event owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 10}>
                <h4>Help</h4>
            </div>
                
        </main>

    </div>
    );
  }
}

export default withStyles(styles)(ControlPanelCLP);

