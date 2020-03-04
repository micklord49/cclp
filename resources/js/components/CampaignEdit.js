import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

//
//  Material UI Controls
import { push as Menu } from 'react-burger-menu'

//
//  Icons
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import EventIcon from '@material-ui/icons/Event';
import CameraIcon from '@material-ui/icons/Camera';
import ShareIcon from '@material-ui/icons/Share';
import EmailIcon from '@material-ui/icons/Email';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';

//
//  CCLP Components
import CampaignInfo from './CampaignInfo';
import BlogEditor from './BlogEditor';
import Event from './Event';
import UploadPicture from './UploadPicture'
import SocialMedia from './SocialMedia';
import Messages from './Messages';


const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },

  menuItem: {
    bgColor: '#0a302f',
  },

  tabpage: {
    marginTop: 0,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,

  },

  '.MuiTabs-fixed': {
      width: 50,
  },


});

class CampaignEdit extends Component {
  constructor(props) {
      super(props);
      this.state = {

          selectedtab:0,
          selectedmaintab:0,
            
        };
      this.Reloading = false;
  }

  onTabChanged(event, value) {
    this.setState({ selectedtab: value });
  };

  render() 
  {
    if(typeof(this.props.guid)=='undefined')
    {
        return(<div></div>);
    }
    if(this.props.guid=='')
    {
        return(<div>Loading...</div>);
    }
    const { classes } = this.props;

    const containerStyle = {
        backgroundColor: "#798080" ,
        transform: 'translate3d(-20, 0, 0)',
        paddingTop: 0
      };

      const tabStyle = {
      //backgroundColor: "#A0A5AC" 
    };

    const menu = {
      //backgroundColor: "#E0E5EC" 
      fontSize: 12, 
      textAlign: 'center', 
      bgColor: '#0a302f', 
      color: '#ffffff',
    };
    
    return (
      <div id="outer-container-campaign" style={containerStyle}>
        <Menu isOpen={ true } styles={ styles }
                outerContainerId={ "outer-container-xcampaign" }
                pageWrapId={ "page-wrap-xcampaign" }
                disableCloseOnEsc
                noTransition
                noOverlay
                disableOverlayClick
                MenuListProps={{ style: { bgColor: '#0a302f', } }} 
                customBurgerIcon={ false } 
                customCrossIcon={ false } 
                width={80}>
            <a onClick={()=>{this.setState({selectedmaintab:0}); }} className="menu-item" style={menu}>{<AnnouncementIcon />}<br/>News</a>
            <a onClick={()=>{this.setState({selectedmaintab:1}); }} className="menu-item" style={menu}>{<EmailIcon />}<br/>Messages</a>
            <a onClick={()=>{this.setState({selectedmaintab:2}); }} className="menu-item" style={menu}>{<InfoIcon />}<br/>About</a>
            <a onClick={()=>{this.setState({selectedmaintab:3}); }} className="menu-item" style={menu}>{<CameraIcon />}<br/>Images</a>
            <a onClick={()=>{this.setState({selectedmaintab:4}); }} className="menu-item" style={menu}>{<ShareIcon />}<br/>Social</a>
            <a onClick={()=>{this.setState({selectedmaintab:5}); }} className="menu-item" style={menu}>{<EventIcon />}><br/>Events</a>
            <a onClick={()=>{this.setState({selectedmaintab:6}); }} className="menu-item" style={menu}>{<HelpIcon />}><br/>Help</a>
        </Menu>
        <main id="page-wrap-campaign" style={{width: '100%', paddingLeft: 50, bgColor: '#ffffff'}}>
        
          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 0}>
              <BlogEditor owner={this.props.guid} description="Your news posts as the campaign"/>
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 1}>
              <Messages title="Messages to you as a campaign" owner={this.props.guid} description="Messages sent to the CLP"/>
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 2}>
              <CampaignInfo guid={this.props.guid} onChange={() => this.campaignchanged()} />
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 3}>
              <UploadPicture title="Campaign Image" owner={this.props.guid} onChange={() => this.campaignchanged()} />
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 4}>
              <SocialMedia owner={this.props.guid} onChange={() => this.campaignchanged()} />
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 5}>
              <Event owner={this.props.guid} />
          </div>

          <div className={classes.tabpage} role="tabpanel" hidden={this.state.selectedmaintab != 6}>
              <h4>Help</h4>
          </div>

        </main>

    </div>
    );
  }
}

export default withStyles(styles)(CampaignEdit);