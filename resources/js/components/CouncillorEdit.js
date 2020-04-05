import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { push as Menu } from 'react-burger-menu'

import InfoIcon from '@material-ui/icons/Info';
import CameraIcon from '@material-ui/icons/Camera';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import ShareIcon from '@material-ui/icons/Share';
import EventIcon from '@material-ui/icons/Event';
import EmailIcon from '@material-ui/icons/Email';
import ListsIcon from '@material-ui/icons/FormatListBulleted';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import HelpIcon from '@material-ui/icons/Help';

import CouncillorInfo from './CouncillorInfo';
import BlogEditor from './BlogEditor';
import Messages from './Messages';
import Campaign from './Campaign';
import Event from './Event';
import ListsEditor from './contacts/ListsEditor';
import UploadPicture from './UploadPicture'
import SocialMedia from './social/SocialMedia';

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
    marginRight: 20,

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
    console.log("Editing Councillor:"+this.props.guid)
  }

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
            <a onClick={()=>{this.setState({selectedmaintab:0}); }} className="menu-item">{<AnnouncementIcon />}<br/>News</a>
            <a onClick={()=>{this.setState({selectedmaintab:1}); }} className="menu-item">{<EmailIcon />}<br/>Messages</a>
            <a onClick={()=>{this.setState({selectedmaintab:2}); }} className="menu-item">{<InfoIcon />}<br/>About</a>
            <a onClick={()=>{this.setState({selectedmaintab:3}); }} className="menu-item">{<CameraIcon />}<br/>Images</a>
            <a onClick={()=>{this.setState({selectedmaintab:4}); }} className="menu-item">{<ShareIcon />}<br/>Social</a>
            <a onClick={()=>{this.setState({selectedmaintab:5}); }} className="menu-item">{<RecordVoiceOverIcon />}<br/>Campaigns</a>
            <a onClick={()=>{this.setState({selectedmaintab:6}); }} className="menu-item">{<EventIcon />}<br/>Events</a>
            <a onClick={()=>{this.setState({selectedmaintab:7}); }} className="menu-item">{<ListsIcon />}<br/>Lists</a>
            <a onClick={()=>{this.setState({selectedmaintab:8}); }} className="menu-item">{<HelpIcon />}<br/>Help</a>
        </Menu>
        <main id="page-wrap" style={{width: '100%', paddingRight:50}}>
        
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 0}>
                <BlogEditor owner={this.props.guid} description="Your posts as a councillor"/>
            </div>

            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 1}>
              <Messages title="Messages for you as a councillor" owner={this.props.guid} description="Messages sent to the CLP"/>
            </div>

            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 2}>
                <h4>My Information as a Councillor</h4>
                <CouncillorInfo guid={this.props.guid}/>
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 3}>
                <h4>Images of me as a councillor</h4>
                <UploadPicture title="Upload Home page picture" helptext="profile.picture" owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 4}>
                <h4>My Social Media links as a councillor</h4>
                <SocialMedia  owner={this.props.guid}/>
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 5}>
                <h4>The campaigns I run as a councillor</h4>
                <Campaign owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 6}>
                <h4>The events I organise as a councillor</h4>
                <Event owner={this.props.guid} />
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 7}>
                <ListsEditor owner={this.props.guid} description="The contact lists I use as a councillor"/>
            </div>
            <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 8}>
                <h4>Help</h4>
            </div>

                
        </main>

    </div>
    );
  }
}

export default withStyles(styles)(ControlPanelCLP);

